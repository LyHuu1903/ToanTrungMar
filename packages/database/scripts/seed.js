'use strict';
const crypto = require('node:crypto');
if (!process.env.DATABASE_URL && process.env.NODE_ENV !== 'production') {
  process.env.DATABASE_URL = 'file:./dev.db';
}
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

const BA_ROLES = [
  { roleCode: 'SALES', roleName: 'Nhân viên Kinh doanh', description: 'Tiếp nhận, chăm sóc Lead và cập nhật Pipeline báo giá cá nhân' },
  { roleCode: 'MKT_STAFF', roleName: 'Nhân viên Marketing', description: 'Xem Lead ẩn danh, AI Marketing SEO, Tracking đa kênh' },
  { roleCode: 'DESIGNER', roleName: 'Designer', description: 'Xem Lead 3D/2D, tài liệu hiện trạng và sử dụng AI thiết kế' },
  { roleCode: 'ADS', roleName: 'Nhân viên Ads', description: 'Xem Lead ẩn danh, chỉnh sửa Nguồn/Chiến dịch, tối ưu Google Ads' },
  { roleCode: 'MKT_LEAD', roleName: 'Trưởng phòng Marketing', description: 'Quản lý hoạt động Marketing, xem Lead toàn công ty và báo cáo phòng' },
  { roleCode: 'SALES_LEAD', roleName: 'Trưởng phòng Sales', description: 'Quản lý đội ngũ Kinh doanh, điều phối Lead và theo dõi Pipeline' },
  { roleCode: 'BOD', roleName: 'Giám đốc', description: 'Xem toàn bộ hoạt động kinh doanh, tracking và báo cáo hiệu suất tổng thể' },
  { roleCode: 'ADMIN', roleName: 'Quản trị viên', description: 'Quản trị hệ thống, tài khoản nhân sự, phân quyền và cấu hình thương hiệu' },
];

async function main() {
  for (const r of BA_ROLES) {
    await prisma.role.upsert({
      where: { roleCode: r.roleCode },
      update: { roleName: r.roleName, description: r.description },
      create: r,
    });
  }

  const defaultSettings = [
    { key: 'organizationName', value: 'Toàn Trung' },
    { key: 'workspaceName', value: 'Không gian làm việc' },
    { key: 'loginHeadline', value: 'Đăng nhập' },
    { key: 'loginSubheadline', value: 'Chào mừng bạn quay trở lại hệ thống nội bộ Toàn Trung' },
    { key: 'footerText', value: '© 2026 Toàn Trung · Hệ thống quản lý nội bộ dành cho nhân sự công ty' },
    { key: 'logoAltText', value: 'Logo Công ty Toàn Trung' },
    { key: 'heroAltText', value: 'Không gian trưng bày giải pháp màn hình LED Toàn Trung' },
    { key: 'heroCoverPosition', value: 'center' },
  ];

  for (const s of defaultSettings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    const seedPassword = process.env.SEED_DEV_PASSWORD || 'ToanTrung@2026';
    const passwordHash = hashPassword(seedPassword);

    const adminRole = await prisma.role.findUnique({ where: { roleCode: 'ADMIN' } });
    const salesRole = await prisma.role.findUnique({ where: { roleCode: 'SALES' } });
    const mktRole = await prisma.role.findUnique({ where: { roleCode: 'MKT_STAFF' } });
    const designerRole = await prisma.role.findUnique({ where: { roleCode: 'DESIGNER' } });

    const devAccounts = [
      {
        email: 'admin@toantrung.vn',
        fullName: 'Nguyễn Quản Trị',
        phone: '0903111222',
        department: 'admin',
        roleId: adminRole.id,
      },
      {
        email: 'sales@toantrung.vn',
        fullName: 'Trần Kinh Doanh',
        phone: '0903222333',
        department: 'sales',
        roleId: salesRole.id,
      },
      {
        email: 'marketing@toantrung.vn',
        fullName: 'Lê Truyền Thông',
        phone: '0903333444',
        department: 'marketing',
        roleId: mktRole.id,
      },
      {
        email: 'designer@toantrung.vn',
        fullName: 'Phạm Thiết Kế',
        phone: '0903444555',
        department: 'marketing',
        roleId: designerRole.id,
      },
    ];

    for (const acc of devAccounts) {
      const user = await prisma.user.upsert({
        where: { email: acc.email },
        update: {
          fullName: acc.fullName,
          roleId: acc.roleId,
          department: acc.department,
          passwordHash,
          isActive: true,
        },
        create: {
          ...acc,
          passwordHash,
          isActive: true,
        },
      });

      const count = await prisma.notification.count({ where: { userId: user.id } });
      if (count === 0) {
        await prisma.notification.createMany({
          data: [
            {
              userId: user.id,
              title: 'Hệ thống Toàn Trung V2 đã sẵn sàng',
              summary: 'Khung quản trị nhân sự, bảo mật phiên đăng nhập và cấu hình thương hiệu đã được kích hoạt.',
              category: 'Hệ thống',
              actionLabel: 'Mở Tổng quan',
              actionUrl: '/dashboard',
              requiredPermission: 'DASHBOARD_VIEW',
              isRead: false,
            },
            {
              userId: user.id,
              title: 'Cập nhật phân quyền theo ma trận BA 8 vai trò',
              summary: 'Tài khoản của bạn đã được gán quyền truy cập đúng theo ma trận chức năng BA đã phê duyệt.',
              category: 'Bảo mật',
              actionLabel: 'Xem hồ sơ tài khoản',
              actionUrl: '/profile',
              requiredPermission: null,
              isRead: false,
            },
            {
              userId: user.id,
              title: '5 module nghiệp vụ đang chờ các nhóm bàn giao',
              summary: 'Các phân hệ Lead, Tracking, Ads, Báo cáo và AI Thiết kế được giữ trống cho 5 nhóm phát triển độc lập.',
              category: 'Cập nhật',
              actionLabel: 'Xem Quản lý Lead',
              actionUrl: '/leads',
              requiredPermission: 'LEAD_VIEW_OWN',
              isRead: true,
              readAt: new Date(),
            },
          ],
        });
      } else {
        await prisma.notification.updateMany({
          where: { userId: user.id, title: 'Hệ thống Toàn Trung V2 đã sẵn sàng', actionUrl: null },
          data: { actionLabel: 'Mở Tổng quan', actionUrl: '/dashboard', requiredPermission: 'DASHBOARD_VIEW' },
        });
        await prisma.notification.updateMany({
          where: { userId: user.id, title: 'Cập nhật phân quyền theo ma trận BA 8 vai trò', actionUrl: null },
          data: { actionLabel: 'Xem hồ sơ tài khoản', actionUrl: '/profile', requiredPermission: null },
        });
        await prisma.notification.updateMany({
          where: { userId: user.id, title: '5 module nghiệp vụ đang chờ các nhóm bàn giao', actionUrl: null },
          data: { actionLabel: 'Xem Quản lý Lead', actionUrl: '/leads', requiredPermission: 'LEAD_VIEW_OWN' },
        });
      }
    }

    console.log(`Đã khởi tạo 8 vai trò BA và ${devAccounts.length} tài khoản phát triển cục bộ.`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

