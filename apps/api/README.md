# Backend Toàn Trung

Workspace đích apps/api, Next.js Route Handlers/TypeScript theo kiến trúc; chưa có handlers, auth, worker hoặc kết nối DB chạy thật trong gói tài liệu.

src/app/api/v1/ chỉ composition/HTTP; src/modules/ chứa 5 module; src/core/ chứa auth/quyền/HTTP/audit/storage/notifications/jobs/config; src/workers/ chỉ có code khi job thật cần.

Luồng: xác thực → quyền/scope BA → schema input → use case → repository → output serializer. DTO Marketing/Ads theo UC01 ẩn danh; Ads chỉ sửa nguồn/campaign theo UC03-4. Chưa tự cấp quyền bằng tên chức danh hoặc role của developer.

Module khác dùng public.ts; Core không import module. Transaction ngắn giữ ghi liên quan nhất quán; provider/upload/tác vụ dài ngoài transaction. Worker cùng codebase, không tách microservice chỉ để đủ sơ đồ.

Đọc [AUTH_AND_ACCESS](../../docs/AUTH_AND_ACCESS.md), [API_CONTRACTS](../../docs/API_CONTRACTS.md), [MODULE_MAP](../../docs/MODULE_MAP.md). Chưa có command runtime: [COMMANDS](../../docs/COMMANDS.md).
