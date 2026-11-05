# Kiểm tra phạm vi sửa đổi

`check-scope.js` kiểm tra tên đường dẫn thuộc module/task. Nó không kiểm tra nội dung code, quyền BA, import boundary, secret, SQL hay độ đúng của nghiệp vụ. Không phải sandbox, không tự chặn GitHub merge; CI/branch protection/reviewer vẫn cần cấu hình riêng.

## Chọn phạm vi rõ ràng

```bash
npm run check:scope -- --module 02-tracking-sync
npm run check:scope -- --task docs/tasks/m02/task.local.json
```

Chỉ chọn một trong `--module` hoặc `--task`. Không đọc ACTIVE_TASK toàn cục, không tự trộn đường dẫn Nhóm 1. `--module` chỉ bao gồm route/module/contracts/model tương lai/test/docs/task/handoff đúng nhóm. Model đúng nhóm được nhận diện nhưng thay đổi DB vẫn cần quyết định/reviewer phù hợp.

Task schemaVersion 1 phải `ready` hoặc `completed` để kiểm tra; completed chỉ phục vụ kiểm tra lại kết quả, không cấp việc mới. `allowedSharedPaths` là những đường dẫn chung cụ thể từ task, không có cờ mở tất cả Core. Sai JSON, module lạ, đường dẫn `..`, selector mâu thuẫn hoặc thiếu Git thì exit 2; không lấy mtime làm bằng chứng thay đổi.

## Local và PR là hai tập file khác nhau

Mặc định kiểm tra **unstaged + staged + untracked** trong repo Git hiện tại; không thấy những thay đổi đã commit. Để kiểm tra PR:

```bash
npm run check:scope -- --module 02-tracking-sync --base origin/main --head HEAD
```

Lệnh dùng merge-base với base để xét phần thay đổi của head. Cần ref thực tế đã có trên máy; script không fetch mạng. Rename xét cả đường dẫn cũ/mới bằng diff không nhận diện rename. Chế độ PR không bao gồm phần chưa commit; chạy local riêng nếu cần.

Với task JSON đã được review ở base:

```bash
npm run check:scope -- --task docs/tasks/m02/M02-123.json --policy-ref origin/main --base origin/main --head HEAD
```

File task phải có tại `origin/main`. `--policy-ref` lấy nội dung task từ commit đó, tránh dùng task tự nới trong working tree. Lệnh trên là ví dụ, gói này chưa có M02-123 hay remote. Nếu task mới chưa tồn tại ở base, reviewer cần thống nhất nguồn policy tin cậy rồi mới áp dụng; không bỏ guard để làm xanh.

**Giới hạn tin cậy:** chạy script/policy do chính nhánh đang được kiểm tra sửa vẫn có thể bị thay đổi. CI thật cần lấy checker và policy từ nguồn đã review, xét cả diff công cụ/quy tắc, không chỉ thêm một lệnh từ nhánh PR. Tài liệu này không cấu hình CI đó.

## Kiểm tra thủ công khi chưa có Git

```bash
npm run check:scope -- --module 01-leads --files apps/api/src/modules/01-leads/example.ts
```

Chỉ kiểm tra danh sách truyền vào, kể cả path chưa tồn tại. Không chứng minh toàn bộ diff và không thay kiểm tra Git trước PR. Script không tạo file example.ts.

## Kết quả và xử lý

| Exit | Ý nghĩa |
| --- | --- |
| 0 | Các đường dẫn trong tập đã xét nằm trong phạm vi; có thể tập rỗng |
| 1 | Có đường dẫn ngoài phạm vi |
| 2 | Lỗi input/config/Git; không có kết luận pass |

Khi có vi phạm, đọc diff để phân biệt thay đổi có sẵn và thay đổi của task. Giữ nguyên công việc người khác; báo phần cần phối hợp. Không tự revert/xóa và không sửa policy để hợp thức hóa lỗi. Shared change đã nằm trong yêu cầu chỉ cần khai báo chính xác và review theo ownership, không hỏi lại hình thức.
