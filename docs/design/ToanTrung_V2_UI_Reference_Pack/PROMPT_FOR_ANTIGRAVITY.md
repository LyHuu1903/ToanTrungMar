# PROMPT CHO ANTIGRAVITY: DUNG BO ANH MẪU TOÀN TRUNG V2

Tôi đặt bộ ảnh thiết kế tại `docs/design/ToanTrung_V2_UI_Reference_Pack/` (hoặc đường dẫn thư mục tương ứng). Đây là nguồn thiết kế tham chiếu chính, KHÔNG phải source code bắt buộc sao chép.

Hãy đọc `README.md` trong bộ ảnh. Trước khi làm một trang, mở đúng ảnh tham chiếu tương ứng; ưu tiên `01-login-chot-mau.png`, `01-dashboard-mang-mau.png` và các ảnh trong `03-system/`. Giữ logo và màu Toàn Trung, phong cách dashboard sáng với 4 mảng màu nhấn nhẹ; có responsive mobile.

Chỉ xây dựng giao diện nền: Login, Dashboard, Thông báo, Hồ sơ, Quản lý tài khoản, Thương hiệu, Cài đặt. Năm module `/leads`, `/tracking`, `/ads`, `/reports`, `/design` để trắng theo `01-module-trong.png`; năm nhóm khác sẽ tự triển khai FE-BE-DB.

Không import bất kỳ data demo nào vào production, không giả lập xác thực thành công, không tuyên bố giao diện mẫu là backend thực. Kiểm tra việc hiển thị bằng chạy app trên trình duyệt và so sánh với ảnh, sau đó ghi những trang đã hoàn tất và test thực chạy vào PROJECT_MEMORY.md.
