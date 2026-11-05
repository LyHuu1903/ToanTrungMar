# Lệnh hiện có và giới hạn

Chạy tại root có `package.json` (`ToanTrungMar/`).

## 1. Lệnh quản trị & kiểm tra phạm vi (Node.js built-in)

| Mục đích | Lệnh thật | Phạm vi |
| --- | --- | --- |
| Tạo context module | `npm run context:task -- --module 01-leads --out .ai-context/m01.md` | Không đọc source/BA chi tiết; chưa cấp task |
| Tạo context task | `npm run context:task -- --task docs/tasks/m01/task.local.json --out .ai-context/task.md` | Task phải được tạo từ yêu cầu thực tế |
| Kiểm tra local diff | `npm run check:scope -- --module 01-leads` | Cần Git; staged + unstaged + untracked |
| Kiểm tra task + shared | `npm run check:scope -- --task docs/tasks/m01/task.local.json` | Cần Git và task ready/completed |
| Kiểm tra PR | `npm run check:scope -- --module 01-leads --base origin/main --head HEAD` | Chỉ diff merge-base→head, cần ref có thật |
| Markdown/link/JSON | `npm run check:docs` | Nội bộ, không kiểm tra truy cập link web |
| Test công cụ | `npm run test:tooling` | node:test; Git repo tạm, không DB/provider |

`task.local.json` là file người/AI tạo cho việc thực tế; gói chỉ có `TASK.example.json` ở trạng thái template. Xem [bàn giao](AI_HANDOFF.md) và [scope](SCOPE_CHECK.md) cho policy-ref, shared paths và exit code.

## 2. Lệnh ứng dụng Core & Database (Yêu cầu `npm install`)

| Mục đích | Lệnh thật | Phạm vi |
| --- | --- | --- |
| Sinh Prisma Client | `npm run db:generate` | Sinh `@prisma/client` từ `packages/database/prisma/` |
| Đẩy schema SQLite local | `npm run db:push` | Khởi tạo/cập nhật bảng Core trong SQLite local |
| Seed dữ liệu nền & demo dev | `npm run db:seed` | Tạo 8 vai trò BA, cấu hình thương hiệu mặc định, tài khoản demo khi `NODE_ENV !== 'production'` |
| Chạy môi trường phát triển | `npm run dev` | Chạy Next.js App Router + API v1 tại `http://localhost:3000` |
| Kiểm tra kiểu TypeScript | `npm run typecheck` | Kiểm tra kiểu trên cả 4 workspaces (`contracts`, `database`, `api`, `web`) |
| Unit test bảo mật Core | `npm run test:core` | Kiểm thử `scrypt` password hash, RBAC 8 vai trò / 12 quyền, và bộ lọc ảnh nhị phân (`image-validator`) |
| Build ứng dụng | `npm run build` | Build Next.js production bundle (`apps/web`) |

## 3. Phần chờ 5 nhóm nghiệp vụ & hạ tầng Production

| Phần | Trạng thái |
| --- | --- |
| Nghiệp vụ 5 module (`M01`–`M05`) | Đang giữ trạng thái trống (`Module đang được phát triển`) để 5 nhóm độc lập bàn giao qua PR |
| PostgreSQL & S3/R2 Production | Đã chuẩn bị cấu trúc kiến trúc; chờ thông tin hạ tầng thực tế từ công ty |
| Tích hợp Zalo OA / Meta / Google Ads / Gemini | Thuộc phạm vi `M02`, `M03`, `M05`; chưa kết nối live |
