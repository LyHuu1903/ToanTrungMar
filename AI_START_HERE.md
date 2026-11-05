# Bắt đầu và bàn giao cho AI

Đặt file này tại root, giữ cấu trúc của gói khi giải nén. Mở **thư mục có `package.json`**. Đây là khung để các nhóm đưa code vào, chưa phải website chạy được.

## Đọc ít nhưng đúng

AI cần biết task cụ thể, quy tắc chung, bối cảnh ngắn và handoff của module. Nếu môi trường đã nạp `AGENTS.md` thì không mở lại riêng. Không yêu cầu đọc hết docs/source/ảnh để bắt đầu.

| Khi nào | Mở thêm |
| --- | --- |
| Task thường của module | Source/caller trực tiếp; mục nghiệp vụ liên quan trong `docs/modules/<module>.md` |
| Đụng quyền, ẩn danh, file hoặc export | `docs/PERMISSIONS.md`; auth/session đọc thêm `docs/AUTH_AND_ACCESS.md` |
| Đụng DTO/public API hoặc phụ thuộc nhóm khác | `docs/API_CONTRACTS.md`, public entry/caller liên quan |
| Đụng DB/migration | `docs/database/README.md`, ownership và mục ERD liên quan; `docs/DATA_SAFETY.md` khi thay dữ liệu |
| Đụng layout/thương hiệu | `docs/UI_GUIDELINES.md` và asset cần dùng |
| Thiếu/mâu thuẫn nghiệp vụ | Mục tương ứng `docs/decisions/OPEN_QUESTIONS.md`, rồi nguồn BA nếu cần |

## Tạo gói ngữ cảnh

Có Node.js và npm là dùng được các công cụ này; chưa cần `npm install`. Chạy tại root:

```bash
npm run context:task -- --module 01-leads --out .ai-context/m01.md
```

Lệnh trên chỉ định hướng nhóm, chưa cấp task sửa code. Với việc cụ thể, copy `docs/tasks/m01/TASK.example.json` thành `docs/tasks/m01/task.local.json`, điền mục tiêu/tiêu chí từ yêu cầu người dùng, chuyển sang `ready`. AI có thể điền từ yêu cầu đã đủ, không bắt người dùng lặp lại. Dùng file riêng mỗi task/nhóm; không có ACTIVE_TASK toàn dự án.

```bash
npm run context:task -- --task docs/tasks/m01/task.local.json --out .ai-context/task.md
```

Gửi gói vừa tạo cùng yêu cầu cụ thể cho AI khác. Gói chứa quy tắc ngắn, bối cảnh, task và handoff đúng module; tài liệu chi tiết chỉ được liệt kê để mở khi cần. Giới hạn mặc định 18.000 byte, không âm thầm cắt quy tắc; byte không tương đương số token. Gói có thời gian/hash/HEAD để nhận biết bối cảnh cũ. Xem [cách bàn giao](docs/AI_HANDOFF.md).

## Prompt dùng ngay

```text
Đọc AI_START_HERE.md và làm task sau: <nội dung công việc>.
Nhóm/module: <01-leads hoặc module được giao>.
Lập task từ yêu cầu này, tạo gói context gọn và chỉ mở source/tài liệu liên quan.
Giữ nguyên quyền BA, sửa đúng phạm vi; sau khi kiểm tra hãy cập nhật handoff module.
Chỉ sửa cục bộ, không tự push hoặc deploy.
```

Nếu đã có task JSON và gói context mới tạo, gửi trực tiếp chúng; không bắt AI lặp lại bước khảo sát toàn repo.

## Khi xong task

Cập nhật `docs/handoffs/<module>.md`: hiện trạng, file/contract thay đổi, kiểm tra thực chạy, phần chưa xác minh và bước tiếp theo. Giữ tối đa khoảng một trang ngắn; chi tiết/lịch sử để ở task/PR. Không ghi PASS cho lệnh chưa chạy. Tạo lại gói context cho lần chuyển AI tiếp theo.

5 mẫu task nằm ở `docs/tasks/m01/`…`m05/`; 5 handoff nằm ở `docs/handoffs/`. Dùng [COMMANDS](docs/COMMANDS.md) để kiểm tra và [SCOPE_CHECK](docs/SCOPE_CHECK.md) để hiểu giới hạn công cụ. Tài liệu lưu trữ trong `docs/archive/` và task đã xong không thuộc luồng đọc mặc định.
