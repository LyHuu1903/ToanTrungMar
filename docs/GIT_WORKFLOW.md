# Quy trình Git và phối hợp nhóm

Đây là quy ước bàn giao, chưa cấu hình protected branch, GitHub rules, CI hoặc CODEOWNERS. Tên branch nhóm giữ nguyên [MODULE_MAP](MODULE_MAP.md).

## Trình tự làm một task

1. Đọc task và kiểm tra Git status; lưu/giữ thay đổi đang có. Xác định đúng repo/remote và nhánh do trưởng nhóm giao.
2. Đồng bộ main theo quy trình repo hiện có trước khi bắt đầu; không đổi/reset nhánh của người khác. Nếu đang có thay đổi chưa commit thì không tự ghi đè để đồng bộ.
3. Phát triển trong vùng module và phần chung bắt buộc đã khai báo. Trong cùng nhóm, phân chia task/file để tránh nhiều người đẩy chồng một nhánh cùng lúc.
4. Chạy kiểm tra phù hợp, đọc diff, cập nhật contract/tài liệu và handoff module. Scope local không thấy file đã commit; dùng thêm diff base/head khi review PR theo SCOPE_CHECK.
5. Khi được giao commit/push, chỉ đưa file đúng task. Mở PR nhỏ theo [mẫu PR](../.github/pull_request_template.md), có reviewer phù hợp.
6. Tích hợp theo thứ tự phụ thuộc contract/schema; xử lý conflict bằng cách hiểu cả hai thay đổi. Chạy lại kiểm tra bị ảnh hưởng sau khi hợp nhất.

Nếu cần nhánh task riêng trong một nhóm, trưởng nhóm có thể dùng `task/m01-<ticket>` và PR vào nhánh tích hợp được chỉ định; chưa tự thay quy ước branch chính. Không tạo nhánh con `feature/lead-management/<ticket>` khi branch `feature/lead-management` đã tồn tại vì tên ref có thể xung đột thư mục.

## Review phần dùng chung

| Thay đổi | Cần phối hợp |
| --- | --- |
| Contract public/DTO | Owner module và các nhóm tiêu thụ |
| Schema/migration/FK | Owner bảng và người điều phối DB |
| Auth/quyền/DTO ẩn danh | Người phụ trách Core và BA khi đổi nghiệp vụ |
| Layout/menu/UI chung | Người phụ trách FE chung, nhóm bị ảnh hưởng |
| Dependency/lockfile/CI/infra | Người duy trì phần chung |

Không khóa mọi file chung đến mức task rõ cũng dừng xin lại; khai báo ảnh hưởng, sửa tối thiểu, review đúng người. Reviewer chưa được chỉ định thì trưởng dự án phân công, không đoán từ họ tên.

## Migration và conflict

Giữ một migration history. Mỗi PR DB phải lấy schema chung mới nhất, mô tả chuyển đổi và chạy trên DB dev/test khi được triển khai; không sửa migration đã áp dụng. Khi hai PR cùng đổi schema, người điều phối quyết định thứ tự và kiểm tra schema hợp nhất trước khi sinh/chạy phần tiếp theo.

Không upload đè cả folder thay cho merge, đẩy trực tiếp main khi quy trình yêu cầu PR, force push, reset người khác, hoặc chọn toàn bộ ours/theirs để né conflict. Không đưa .env, token, DB dump, file khách hàng và dữ liệu thật lên Git.

Chỉ cấu hình CODEOWNERS sau khi có GitHub username thật. Branch protection và CI là việc cấu hình riêng; tài liệu không tự tạo cơ chế chặn merge.

Task riêng từng nhóm theo [TASK_TEMPLATE](tasks/TASK_TEMPLATE.md); handoff/context theo [AI_HANDOFF](AI_HANDOFF.md). Checker đường dẫn là hỗ trợ cục bộ, chưa phải GitHub enforcement; xem [SCOPE_CHECK](SCOPE_CHECK.md) trước khi cấu hình CI.
