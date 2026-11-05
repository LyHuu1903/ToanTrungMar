# Toàn Trung — Marketing và Kinh doanh

Bản bàn giao 05/11/2026: **khung thư mục đầy đủ cho 5 nhóm**, tài liệu BA và công cụ kiểm tra/bàn giao AI. Các module còn trống; chưa triển khai website, DB, auth, provider, CI hoặc deploy.

Bắt đầu tại [AI_START_HERE.md](AI_START_HERE.md). AI chỉ cần task + [quy tắc](AGENTS.md) + [bối cảnh ngắn](AI_CONTEXT.md) + handoff module, rồi mở source/tài liệu liên quan khi cần.

## Các vùng chính

| Thư mục | Trách nhiệm |
| --- | --- |
| apps/web | FE, route mỏng, Core UI/session và 5 module |
| apps/api | BE, auth/quyền, 5 module và worker khi có job |
| packages/database | Một nguồn model và một migration history chung |
| packages/contracts | DTO/schema thuần dùng chung FE–BE |
| docs/modules | Nghiệp vụ, đầu vào/đầu ra và nghiệm thu của từng nhóm |
| docs/handoffs | Trạng thái ngắn, phần đã làm và việc tiếp theo của module |
| docs/tasks/m01…m05 | Task riêng mỗi nhóm; mẫu JSON chưa cấp quyền triển khai |
| docs/sources | Ảnh/PDF và nguồn BA gốc để đối chiếu khi cần |
| scripts / tests/tooling | Tạo ngữ cảnh, kiểm tra phạm vi và tài liệu; test công cụ |
| infra | Vị trí cấu hình local/deploy tương lai |

Tên module thống nhất ở FE–BE–contracts–test: `01-leads`, `02-tracking-sync`, `03-keywords-ads`, `04-reports`, `05-ai-design`. Mỗi nhóm theo trọn module; [MODULE_MAP](docs/MODULE_MAP.md) ghi người/branch/đường dẫn.

## Lệnh hiện có

Chưa cần cài dependency để chạy công cụ nội bộ. Cần Node.js và npm; test công cụ còn cần Git.

```bash
npm run context:task -- --module 01-leads --out .ai-context/m01.md
npm run check:docs
npm run test:tooling
```

Kiểm tra phạm vi diff cần repo Git và module/task rõ: xem [COMMANDS](docs/COMMANDS.md). Chưa có `dev`, `build`, Prisma hoặc import-boundary check; không suy ứng dụng đã chạy từ test công cụ.

## Nguồn và quyết định

Giữ nguyên [ma trận BA](docs/PERMISSIONS.md). Chi tiết UC/DFD nằm trong [hồ sơ module](docs/README.md), dữ liệu tại [ERD_COVERAGE](docs/database/ERD_COVERAGE.md). Chưa chốt DB provider và Prisma major; các mục cần quyết định ở [OPEN_QUESTIONS](docs/decisions/OPEN_QUESTIONS.md).

Bản đích là Next.js/React/TypeScript/Tailwind, Route Handlers, Prisma và npm workspaces. Manifest hiện chỉ khai báo bốn workspace và lệnh công cụ, chưa khóa dependency/version. File nguồn nghiệp vụ được tạo khi có task thực tế, không sinh hàng loạt file rỗng giả hoàn thành.

Xem [mục lục](docs/README.md), [quy trình Git](docs/GIT_WORKFLOW.md) và [báo cáo kiểm tra bản bàn giao](docs/reviews/20261105-handoff-validation.md). `docs/archive/` chứa hồ sơ bootstrap cũ, chỉ dùng tra cứu lịch sử.
