# Frontend Toàn Trung

Workspace đích apps/web; chưa có ứng dụng Next.js hoặc dependency được tạo trong gói này. Xem [kiến trúc](../../docs/ARCHITECTURE.md), [quyền BA](../../docs/PERMISSIONS.md), [UI](../../docs/UI_GUIDELINES.md).

src/app/ chứa login và route/layout mỏng; src/modules/ chứa 5 module; src/core/ chứa UI/layout/HTTP/session dùng chung. Mỗi nhóm sở hữu module và route tương ứng theo [MODULE_MAP](../../docs/MODULE_MAP.md).

FE chỉ gọi HTTP bằng DTO contracts. Không import DB, Prisma, secret hoặc API internals. Menu/Dashboard theo quyền BA, direct URL vẫn phải bị hệ thống kiểm tra. Hiển thị loading/empty/error/chưa triển khai đúng thực tế; không dùng số mẫu làm dữ liệu live.

Unit test đặt cạnh logic; E2E theo tests/e2e/<module> khi có hành trình thật. Chưa có npm run dev/build/test được xác minh: [COMMANDS](../../docs/COMMANDS.md).
