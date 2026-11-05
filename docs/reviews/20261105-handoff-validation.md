# Kiểm tra bản bàn giao folder

Ngày 05/11/2026. Đây là bản khung/tài liệu/công cụ được tạo từ ToanTrungMar.rar người dùng bàn giao. **PASS cho kiểm tra tooling, tài liệu và cấu trúc**; không phải nghiệm thu ứng dụng.

## Môi trường và bằng chứng

Node.js v24.22.1; npm 11.9.0; Git 2.52.0. Không cài dependency, gọi DB/provider hay thay đổi repo bên ngoài. Gói bàn giao không chứa .git và chưa có remote. Git commit chỉ được tạo trong repo tạm biệt lập của test công cụ.

| Kiểm tra thực chạy | Kết quả | Giới hạn |
| --- | --- | --- |
| npm run test:tooling | PASS — 38 tests, 0 fail, exit 0 | Công cụ; không test ứng dụng |
| npm run check:docs | PASS — 52 Markdown, 248 link inline nội bộ, 11 JSON, 5 task; exit 0 | UTF-8, fence, link/anchor và JSON/task; không truy cập link web |
| Tạo context bằng --module và --task cho cả 5 nhóm | PASS — 10/10; exit 0 | Task mẫu vẫn template, không cấp việc mới |
| Kiểm tra --files đúng module cho cả 5 nhóm | PASS — 5/5; exit 0 | Chỉ danh sách thủ công; không là diff của repo thực |
| So sánh byte 41 file nghiệp vụ/nguồn | PASS — không đổi | Bao gồm quyền, 5 hồ sơ module, tài liệu DB và 25 asset |
| Hash RAR đầu vào | PASS — nguyên trạng | Không sửa bản gốc |

38 test gồm 20 ca scope, 15 ca context và 3 ca docs. Các ca scope dùng Git thật trong fixture để kiểm tra unstaged/staged/untracked, rename hai phía và diff đã commit; ngoài ra kiểm tra module lạ, traversal, task sai, template và policy-ref. Context kiểm tra chọn đúng module, không đọc source/tài liệu chi tiết, ngân sách byte, độ mới/hash, liên kết sau khi trích và chặn symlink đầu vào/đầu ra ngoài repo.

## Dung lượng context đã đo

| Module | Chỉ định hướng module, byte | Có task mẫu, byte |
| --- | --- | --- |
| 01-leads | 11459 | 12167 |
| 02-tracking-sync | 11547 | 12271 |
| 03-keywords-ads | 11485 | 12207 |
| 04-reports | 11467 | 12179 |
| 05-ai-design | 11478 | 12194 |

Mỗi gói một module dưới ngân sách mặc định 18.000 byte. Đây là số byte UTF-8, không phải token và không chứng minh một tỷ lệ tiết kiệm token. Task thật hoặc nhiều module có thể dài hơn; script báo lỗi khi vượt ngân sách, không tự cắt quy tắc. Packet tạm đã được dùng để kiểm tra và không được đưa vào ZIP; cần tạo lại theo task hiện tại.

## Những thay đổi so với folder nhận vào

- Thêm AI_START_HERE.md, AI_CONTEXT.md, docs/AI_HANDOFF.md và 5 handoff ngắn; AGENTS.md được rút gọn, liên kết tài liệu sâu khi cần.
- Thêm 5 TASK.example.json riêng từng nhóm, trạng thái template; bỏ việc dùng một ACTIVE_TASK toàn cục.
- Sửa check-scope: không lẫn path M01, không cắt ký tự đầu tên file; thu thập NUL-safe, xét rename hai phía, thêm base/head và policy-ref, lỗi input/Git phải báo lỗi. Không dùng mtime, không mở toàn Core và không yêu cầu tự xóa/revert file.
- Thêm prepare-context, check-docs, 38 test có ý nghĩa và 4 package scripts; không thêm package ngoài hoặc command build/dev giả.
- Thêm .gitignore, .env.example không chứa giá trị bí mật; thêm folder giữ chỗ notifications/profile theo kiến trúc.
- Bỏ 6 .gitkeep thừa ở docs/runbooks, docs/sources, docs/tasks, infra/deploy, infra/local, scripts; giữ placeholder cần để Git lưu folder trống.

| File cũ | Vị trí mới / lý do |
| --- | --- |
| HUONG_DAN_DAT_FILE.md | docs/archive/bootstrap/HUONG_DAN_DAT_FILE_20261105.md — hồ sơ lần đặt tài liệu ban đầu |
| docs/tasks/ACTIVE_TASK.json | docs/archive/bootstrap/ACTIVE_TASK.original.json — chỉ lưu lịch sử, script không đọc |
| docs/tasks/BOOTSTRAP_DOCS_ONLY.md | docs/tasks/completed/BOOTSTRAP_DOCS_ONLY.md — bootstrap folder/tài liệu đã xong |
| docs/DOCS_VALIDATION.md | docs/reviews/20261105-initial-docs-validation.md — số liệu của gói Markdown cũ |

Link nội bộ đã được đổi theo vị trí mới. Bản nguồn BA, ma trận quyền, phạm vi nghiệp vụ, ERD và các quyết định chưa chốt được giữ lại; không xóa chỉ để giảm lượng context. Công cụ chọn phần cần đọc, tách lịch sử ra khỏi luồng làm việc hàng ngày.

## Chưa triển khai hoặc chưa xác minh

Ứng dụng web/API/auth/session, schema/client/migration, test nghiệp vụ/API/E2E, import-boundary/cycle check, provider live, dependency app/lockfile, CI/branch protection, Git push, deploy, tải lớn và backup/restore: **NOT_RUN / chưa triển khai**. Scope checker không thay sandbox, reviewer hoặc kiểm tra quyền/logic. Cần chốt DB provider, Prisma major và các mục BA còn mở trước đúng task liên quan.
