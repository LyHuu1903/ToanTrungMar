# PROJECT MEMORY — TOÀN TRUNG V2 (INTERNAL MARKETING & SALES PLATFORM)

Cập nhật lần cuối: `2026-11-05`

## 1. Trạng thái hiện tại theo Phase & Các nâng cấp mới nhất

| Hạng mục | Trạng thái | Ghi chú xác minh |
| --- | --- | --- |
| **1. Gỡ nhãn “Không gian làm việc”** | Hoàn tất | Đã gỡ khỏi thanh Breadcrumb trên cùng (`WorkspaceShell.tsx`), thanh bên và toàn bộ nhãn phụ (eyebrow) phía trên tiêu đề các trang (`/dashboard`, `/notifications`, `/profile`, `/admin/users`, `/settings`, và `BlankModuleState.tsx`). Chỉ giữ lại tên trang hiện tại. |
| **2. Quản lý Banner Dashboard trong Cài đặt thương hiệu** | Hoàn tất | Đặt trong `/settings` (chỉ `ADMIN` mới được sửa/lưu, kiểm tra quyền ở cả UI và API). Chia rõ 2 tab **Nội dung** và **Hình ảnh**, cho phép thêm/sửa/xóa tiêu đề, mô tả, ẩn/hiện nút hành động, sửa nhãn/link nút, thay hoặc gỡ ảnh banner, xem trước trực tiếp bản nháp, nút **Hủy** / **Lưu thay đổi**. Trang `/dashboard` chỉ hiển thị banner đã lưu, không có nút sửa trực tiếp. |
| **3. Nâng cấp trang Thông báo (`/notifications`)** | Hoàn tất | Phân cấp rõ tiêu đề, mô tả ngắn, thời gian và nút hành động mở tác vụ liên quan (`actionLabel`, `actionUrl` kiểm tra quyền BA). Dùng icon theo danh mục, làm nổi bật thông báo chưa đọc bằng viền xanh trái + nền xanh nhạt + chấm xanh + chữ đậm; màu cam chỉ dùng khi danh mục thực sự là cảnh báo. Bộ lọc **Tất cả** / **Chưa đọc** / **Đã đọc** tính số lượng thực tế. |
| **4. Bổ sung Xóa tài khoản (`DELETE /api/v1/users`)** | Hoàn tất | Giữ nguyên nút **Khóa / Mở khóa** và thêm nút **Xóa tài khoản** tách biệt (nhãn đỏ + icon thùng rác) kèm hộp thoại xác nhận hiển thị rõ tài khoản được chọn. Thực hiện **soft-delete** (`deletedAt`), ẩn khỏi danh sách nhân sự, thu hồi ngay mọi phiên đăng nhập (`UserSession`), chặn đăng nhập lại, bảo toàn lịch sử `AuditLog` và dữ liệu liên quan, chặn Admin tự xóa chính mình hoặc xóa Admin hoạt động cuối cùng. |
| **5. Hình nền toàn trang Đăng nhập, Logo góc trên trái & Tinh gọn Cài đặt thương hiệu** | Hoàn tất | (1) Trang `/login` áp dụng hình nền phủ toàn màn hình (`full-viewport`) kèm lớp phủ dễ đọc, loại bỏ dải ảnh hẹp trên đầu thẻ và khoảng trắng lớn phía sau; đặt duy nhất 1 logo ở góc trên bên trái màn hình, bỏ logo trùng trong thẻ và các dòng chữ tên công ty/chân trang dư thừa. (2) Mục **Logo hiển thị** trong `/settings` được tinh gọn chỉ còn xem trước logo hiện tại, tải lên/thay thế, khôi phục mặc định, Hủy và Lưu thay đổi (giữ nguyên dữ liệu metadata tổ chức trong DB). (3) Khung xem trước bên cạnh trình cắt/kéo/zoom ảnh nền hiển thị **toàn bộ trang đăng nhập** (nền toàn trang, logo góc trái trên, biểu mẫu ở giữa) ở cả chế độ **Máy tính** và **Điện thoại**. (4) Đã gỡ bỏ hoàn toàn nút thu gọn/mở rộng thanh bên trên Desktop tại `WorkspaceShell.tsx`, giữ thanh bên mở cố định trên Desktop và bảo toàn menu ngăn kéo trên Mobile. |
| **6. Cải tiến Hồ sơ tài khoản (`/profile`)** | Hoàn tất | Cho phép tải lên, thay thế, gỡ và xem trước **Ảnh đại diện (Avatar)** trước khi lưu; cập nhật **Họ và tên**, **Số điện thoại**; hiển thị chỉ đọc **Email công việc**, **Phòng ban**, **Vai trò**; khu vực **Đổi mật khẩu** riêng biệt. Cập nhật đồng bộ Avatar và tên lên thanh Header/Sidebar. Chặn tuyệt đối việc tự ý đổi `roleCode`, `department` hoặc `userId` qua API cá nhân (`403 FORBIDDEN_PROFILE_FIELD`). |

## 2. Kết quả kiểm thử đã chạy thực tế (2026-11-05)

1. **`npm run check:docs`**: PASS (57 tệp Markdown, 254 liên kết nội bộ inline, 16 tệp JSON, 5 tệp task mẫu).
2. **`npm run test:core`**: PASS 5/5 (`scrypt` password hashing, ma trận 8 vai trò / 12 quyền BA, bộ lọc ảnh nhị phân chặn SVG/script, tính toán khung cắt ảnh trang đăng nhập, và bộ chặn leo thang đặc quyền trên API hồ sơ cá nhân).
3. **`npm run typecheck`**: PASS 0 lỗi trên cả 4 workspaces (`@toantrung/contracts`, `@toantrung/database`, `@toantrung/api`, `@toantrung/web`).
4. **Kiểm thử tích hợp HTTP trực tiếp trên máy chủ Next.js (`http://127.0.0.1:3000`)**:
   - Chặn người dùng không phải Admin (`SALES`) gọi API ghi Cài đặt thương hiệu (`403 FORBIDDEN`).
   - Lưu và đọc bền vững cấu hình **Banner Dashboard** + thông số cắt/phóng đại ảnh **Login Hero** (`200 OK`).
   - API `/api/v1/notifications` trả về danh sách thông báo theo phạm vi người dùng kèm liên kết hành động hợp lệ theo quyền.
   - Chặn leo thang đặc quyền (`roleCode`/`department`) trên `PATCH /api/v1/profile` (`403`), tải lên ảnh đại diện PNG hợp lệ và gỡ ảnh đại diện (`200 OK`).
   - Chặn Admin tự xóa chính mình (`400 CANNOT_DELETE_SELF`), chặn nhân viên thường xóa tài khoản (`403`), kiểm thử khóa/mở khóa và xóa mềm (`DELETE /api/v1/users`) trên tài khoản kiểm thử cô lập (`isolated.delete.test@toantrung.vn`), thu hồi phiên ngay lập tức (`401`) và chặn đăng nhập lại (`401`).
   - Xác nhận nhãn trang trí `KHÔNG GIAN LÀM VIỆC` đã được loại bỏ khỏi tất cả các trang.
