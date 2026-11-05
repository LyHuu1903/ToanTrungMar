# Đặt bộ file Markdown vào cấu trúc dự án

> Hồ sơ lịch sử của bộ Markdown ban đầu. Bắt đầu công việc hiện tại tại [AI_START_HERE](../../../AI_START_HERE.md). Trạng thái và số liệu bên dưới thuộc lần bàn giao cũ.

Bộ ngày 05/11/2026 tổng hợp tài liệu người dùng gửi, đọc lại đặc tả BA hiện có và giữ nguyên ma trận quyền BA. Đây là tài liệu + bản nguồn để 5 nhóm phát triển tiếp; chưa có source ứng dụng hoặc database được tạo.

## Cách chép

1. Giải nén ZIP vào một thư mục tạm để xem trước.
2. Chép nội dung theo **đúng đường dẫn tương đối** vào root repo đích. Không tạo thêm một tầng toantrung-v2 bên trong root đang mở.
3. AGENTS.md đặt tại root, cùng cấp package.json khi manifest được scaffold. README.md đặt tại root. docs/, apps/, packages/, tests/, infra/, .github/ giữ nguyên vị trí trong gói.
4. Nếu repo đã có file cùng tên, so sánh/merge phần được giao, giữ thay đổi ngoài phạm vi; không chọn ghi đè toàn bộ một cách tự động. Giữ hướng dẫn framework đã có nếu liên quan.
5. Đọc [docs/README](../../README.md), [MODULE_MAP](../../MODULE_MAP.md) và hồ sơ của nhóm mình. Ảnh/PDF nguồn trong docs/sources/assets giúp Markdown mở được độc lập sau khi giải nén.

## File chính đặt ở đâu

| Đường dẫn | Nội dung |
| --- | --- |
| AGENTS.md | Quy tắc AI toàn repo, phạm vi task và nguồn quyền BA |
| README.md | Giới thiệu, trạng thái, lối vào tài liệu |
| docs/ARCHITECTURE.md | Cấu trúc toàn dự án và hướng phụ thuộc |
| docs/MODULE_MAP.md | Đúng 5 nhóm/người/branch và đường dẫn mọi lớp |
| docs/PERMISSIONS.md | 12 hàng quyền/8 vai trò BA và chi tiết use case |
| docs/modules/ | 5 hồ sơ module, nghiệp vụ và nghiệm thu riêng |
| docs/database/ | Từ điển 9 bảng nguồn, ownership và phần DFD/UC chưa đủ model |
| docs/sources/ | Danh mục nguồn và snapshot sơ đồ BA |
| .github/pull_request_template.md | Mẫu PR, chưa cài CI/branch protection |

## Giao việc cho AI sau khi chép

```text
Đọc AGENTS.md tại root và tài liệu đúng module trong docs/modules/.
Thực hiện task tôi giao trong đúng phạm vi; giữ nguyên ma trận quyền BA.
Nêu đường dẫn dự kiến sửa và kiểm tra, rồi làm phần đã được giao rõ.
Không tự mở rộng sang module khác, đổi stack/quyền hoặc commit/push/deploy.
```

Nếu chỉ tạo folder giữ chỗ, dùng [BOOTSTRAP_DOCS_ONLY](../../tasks/completed/BOOTSTRAP_DOCS_ONLY.md). Chưa chạy npm install, migration hoặc triển khai app chỉ vì đã nhận bộ tài liệu.

## Những điều bộ này không tự quyết định

Chưa khóa provider MySQL/PostgreSQL/Prisma major/host, chưa chọn session/token cụ thể, chưa bổ sung bảng thiếu vào ERD. Các quyết định này được ghi rõ tại OPEN_QUESTIONS, không cản đặt tài liệu vào đúng chỗ.

Các ma trận quyền 4 vai trò và danh sách bảng DB đề xuất trong blueprint/prompt cũ không còn là nguồn chuẩn nếu mâu thuẫn bộ BA này. Không chép AGENTS.md cũ từ prompt khởi tạo lên đè bản đã hợp nhất. Bộ skill .agents/ nếu đã có được quản lý riêng; gói này không cài/sửa/tạo skill giả.
