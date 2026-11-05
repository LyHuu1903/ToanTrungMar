# Đăng nhập, phiên và credential — thiết kế kỹ thuật đích

Trạng thái: tài liệu triển khai dự kiến, chưa audit code của repo đích và chưa có auth chạy được. Nghiệp vụ quyền lấy nguyên từ [PERMISSIONS](PERMISSIONS.md); không dùng tài liệu này thay ma trận BA.

## Thành phần và luồng dự kiến

| Thành phần | Trách nhiệm |
| --- | --- |
| FE login/session | Gửi thông tin qua HTTPS; hiển thị trạng thái; không giữ secret provider |
| API auth | Kiểm tra đầu vào, credential và tài khoản hoạt động; cấp phiên theo cơ chế được chốt |
| users/roles | ERD đã có email, password_hash, is_active, role_id và roles |
| Session/policy | Xác thực mỗi request, kiểm tra quyền BA và scope; logout/thu hồi phiên theo thiết kế được chọn |
| Serializer | Áp dữ liệu Lead ẩn danh cho Marketing/Ads theo UC01 |

Đăng nhập: FE gửi credential → API kiểm tra password_hash/tài khoản → tạo phiên → FE nhận trạng thái. Request nghiệp vụ: xác thực phiên → kiểm tra account/action/scope → use case → repository → output theo quyền. Không để proxy hoặc menu làm nguồn quyền duy nhất.

## Cách xử lý credential và token khi triển khai

- ERD lưu password_hash, không lưu/ghi log mật khẩu gốc. Chọn thư viện hash/cơ chế xác thực tương thích stack đã khóa; chưa cố định thuật toán/package/version trong tài liệu này.
- Chưa chốt session lưu server hay token ký. Ghi quyết định tại [Q11](decisions/OPEN_QUESTIONS.md#q11) trước khi thiết kế bảng/session/TTL/rotation; không mô tả JWT, refresh token hoặc bảng sessions là đã tồn tại.
- Với thiết kế cookie phiên, dùng HttpOnly/Secure/SameSite và kiểm soát CSRF/origin phù hợp; expiration/revocation phải được kiểm tra. Không mặc định đưa bearer token vào localStorage.
- Google/AI/storage credential chỉ ở backend/worker và cấu hình bí mật theo môi trường. Quyền cấu hình thuộc ma trận BA; không đưa key vào UI, NEXT_PUBLIC_*, Git, fixture, response lỗi hoặc log.
- Không in credential khi kiểm tra môi trường; báo có/thiếu cấu hình bằng tên trạng thái. Việc có biến môi trường không chứng minh tài khoản provider đã truy cập thành công.

## Phần cần xác minh bằng code/test sau này

Đăng nhập sai, account khóa, session hết hạn/thu hồi, logout, direct URL, request dùng ID ngoài scope, DTO ẩn danh, export/file/job dùng cùng quyền. Danh tính webhook/service khác user đăng nhập cần cơ chế riêng theo nguồn thực tế; chưa tự gán mọi Lead tự động cho một user Admin giả.
