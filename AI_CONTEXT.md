# Bối cảnh ngắn của dự án

Cập nhật: 05/11/2026. Đây là **khung thư mục + tài liệu + công cụ bàn giao AI**; các module nghiệp vụ còn trống. Chưa có ứng dụng chạy, schema/migration, auth/session thực, provider, CI hay hạ tầng deploy.

## Kiến trúc và phân công

Một npm monorepo: `apps/web` (FE), `apps/api` (BE modular monolith), `packages/database` (DB chung), `packages/contracts` (DTO/schema thuần). Mỗi nhóm phát triển đầy đủ các lớp của module, không tách thành 5 dự án độc lập.

| Module | Nhóm / phụ trách | Branch |
| --- | --- | --- |
| 01-leads | 1 / Lâm Thành Nam | feature/lead-management |
| 02-tracking-sync | 2 / Cát Cần Sỹ | feature/tracking-integration |
| 03-keywords-ads | 3 / Nguyễn Anh Quân | feature/ads-keywords |
| 04-reports | 4 / Nguyễn Hoàng Minh Khôi | feature/reports-dashboard |
| 05-ai-design | 5 / Lý Tăng Hữu | feature/ai-design |

Đích đã trao đổi: Next.js/React/TypeScript/Tailwind, Route Handlers, Prisma. Chưa cài dependency/khóa major. PostgreSQL là đề xuất trước; ERD BA dùng kiểu MySQL. Không tự chốt provider hay tạo model từ suy đoán. Manifest hiện chỉ khai báo workspace và công cụ nội bộ không phụ thuộc package ngoài.

## Nguồn nghiệp vụ

8 vai trò: SALES, MKT_STAFF, DESIGNER, ADS, MKT_LEAD, SALES_LEAD, BOD, ADMIN. Giữ nguyên ma trận BA và chi tiết ẩn danh UC01; không suy quyền từ chức danh. Không có tài khoản khách hàng. M01 gồm Lead + Pipeline; M02 tracking; M03 Ads/từ khóa và đề xuất SEO; M04 báo cáo; M05 thiết kế giai đoạn 2; Core đăng nhập/người dùng/phân quyền/thông báo dùng chung.

DFD không cho gửi thông tin khách vào AI. ERD gốc có 9 bảng; các khoảng trống UC/DFD vẫn là quyết định mở. Không tự thêm giá bán hoặc tính doanh thu từ Lead chốt. Không đồng nhất những giới hạn này với chi phí Ads/AI đã có trong BA.

## Tìm sâu khi cần

Nghiệp vụ: `docs/modules/`; quyền: `docs/PERMISSIONS.md`; auth: `docs/AUTH_AND_ACCESS.md`; DB: `docs/database/`; contract: `docs/API_CONTRACTS.md`; kiến trúc: `docs/ARCHITECTURE.md`; việc chưa chốt: `docs/decisions/OPEN_QUESTIONS.md`; ảnh/PDF chứng cứ: `docs/sources/`.

Handoff chỉ phản ánh trạng thái của module, không thay nguồn BA hoặc code thật. Chỉ đọc phần liên quan task. Lệnh dùng được ghi tại `docs/COMMANDS.md`; không có lệnh dev/build app ở giai đoạn này.
