# Bàn giao AI với ngữ cảnh có giới hạn

Mục tiêu là giúp AI tiếp theo biết đúng việc và trạng thái hiện tại mà không đọc toàn dự án. Đây là chọn lọc nội dung; không phải bảo đảm AI biết những thay đổi chưa được ghi lại hoặc cam kết một tỷ lệ tiết kiệm token.

## Ba lớp thông tin

| Lớp | Nội dung | Cách dùng |
| --- | --- | --- |
| Chung, ngắn | AGENTS.md, AI_CONTEXT.md | Nạp một lần đầu phiên hoặc từ gói context |
| Theo task | Task JSON, handoff của module | Nạp ngay khi bắt đầu; kiểm tra độ mới |
| Khi cần | Source/caller, hồ sơ module, quyền, DB, nguồn BA | Tìm bằng rg và mở mục liên quan |

Không tự quét ảnh/PDF, archive, lockfile, toàn bộ các module hoặc lịch sử Git dài. Nếu source/contract liên quan thay đổi, phải đọc phần đó; tiết kiệm token không là lý do bỏ kiểm tra nghiệp vụ/quyền.

## Chuẩn bị task

1. Mỗi nhóm copy `docs/tasks/m0x/TASK.example.json` sang file của task. `.local.json` chỉ dùng cục bộ; task cần review/PR dùng `<ID>.json` và commit khi được giao.
2. Điền mục tiêu, module, tiêu chí nghiệm thu; chỉ đặt `ready` khi đã có việc thực tế từ người dùng. `template` và `blocked` không phải lệnh sửa source. Không tự bật task `completed` để tiếp tục phát triển.
3. `allowedSharedPaths` mặc định rỗng. Thêm chính xác file/phần chung bắt buộc từ task, có lý do ở `notes`; đuôi `/` cho phép cả thư mục nên ưu tiên file cụ thể. Không dùng nó mở module khác hoặc mở cả root.
4. `readWhenNeeded` là danh sách tài liệu chỉ mở khi liên quan, không phải danh sách nạp bắt buộc. Task liên module liệt kê rõ các module trong `modules`; đừng gom cả 5 chỉ vì tiện.

Task Core độc lập chọn các module thực sự bị ảnh hưởng (ít nhất một module để công cụ nhận diện luồng), rồi khai báo từng đường dẫn chung; không coi điều đó là giao toàn bộ nghiệp vụ của module.

## Gói mang sang AI khác

```bash
npm run context:task -- --task docs/tasks/m01/task.local.json --out .ai-context/task.md
```

Generator chỉ đọc AGENTS, AI_CONTEXT, task và handoff module; ghi metadata Git bằng lệnh đọc. Không đọc nội dung source/BA/ảnh. Ngân sách mặc định 18.000 byte; `--max-bytes` nhận 2.000–30.000 byte. Thiếu file, file quá lớn hoặc vượt tổng ngân sách thì báo lỗi; không tự bỏ luật để cho đủ.

Gói có thời gian UTC, Git HEAD/nhánh, số đường dẫn thay đổi và 20 tên đầu tiên, hash các file ngữ cảnh đã nạp. Hash không bao phủ code, không chứng minh context còn mới nếu code bẩn thay đổi. AI tiếp nhận kiểm tra lại Git status/diff và file thật; tái tạo gói khi task, handoff hoặc HEAD thay đổi. Nếu chưa có Git, gói ghi chưa khởi tạo; không giả định clean.

`.ai-context/` bị ignore và không đi trong gói ZIP bàn giao này để tránh đưa bản cũ cho người khác. Khi gửi context ra ngoài, kiểm tra tên đường dẫn và nội dung task/handoff không chứa dữ liệu khách/secret. Không chạy generator chỉ để gửi cả repo.

## Cập nhật cuối task

Mỗi module chỉ có một handoff hiện tại. Giữ các mục: ngày/HEAD nếu có; trạng thái; file/contract đã đổi; bằng chứng lệnh thực chạy; blocker; việc tiếp theo. Mục tiêu dưới 4.500 byte, không copy toàn bộ BA hoặc chép lịch sử chat. Nếu hai task đồng thời, ghi chi tiết mỗi task trong file riêng; người tích hợp cập nhật handoff sau merge, không ghi đè kết quả chưa hợp nhất.

`AI_CONTEXT.md` chỉ đổi khi kiến trúc, stack hoặc hiện trạng chung thay đổi; đây là file dùng chung. Task cục bộ không cần sửa file này. Không ghi rằng toàn hệ thống hoàn thành khi mới xong một module. Xem [QUALITY](QUALITY.md) và [SCOPE_CHECK](SCOPE_CHECK.md).
