# Mục lục tài liệu dự án

Bản bàn giao 05/11/2026 có khung thư mục, tài liệu BA và công cụ nội bộ; source nghiệp vụ, DB và CI chưa triển khai. Đọc phần liên quan task, không nạp toàn bộ mỗi phiên AI.

## Bắt đầu và chuyển AI

| Nhu cầu | File |
| --- | --- |
| Điểm bắt đầu | [AI_START_HERE](../AI_START_HERE.md) |
| Quy tắc toàn repo | [AGENTS](../AGENTS.md) |
| Bối cảnh chung ngắn | [AI_CONTEXT](../AI_CONTEXT.md) |
| Cách tạo context và cập nhật handoff | [AI_HANDOFF](AI_HANDOFF.md) |
| Trạng thái từng module | [handoffs](handoffs/README.md) |
| Khai báo task | [TASK_TEMPLATE](tasks/TASK_TEMPLATE.md) |
| Kiểm tra phạm vi | [SCOPE_CHECK](SCOPE_CHECK.md) |
| Lệnh chạy được | [COMMANDS](COMMANDS.md) |
| Kết quả kiểm tra bản bàn giao | [validation](reviews/20261105-handoff-validation.md) |

## Thiết kế và nguồn nghiệp vụ

| Nội dung | File |
| --- | --- |
| Phạm vi/giai đoạn | [PROJECT](PROJECT.md) |
| Cấu trúc toàn dự án | [ARCHITECTURE](ARCHITECTURE.md) |
| Nhóm/người/branch/đường dẫn | [MODULE_MAP](MODULE_MAP.md) |
| Tích hợp Git | [GIT_WORKFLOW](GIT_WORKFLOW.md) |
| Ma trận quyền BA | [PERMISSIONS](PERMISSIONS.md) |
| Thiết kế auth/credential | [AUTH_AND_ACCESS](AUTH_AND_ACCESS.md) |
| Contract giữa nhóm | [API_CONTRACTS](API_CONTRACTS.md) |
| BA/DFD | [BA_HANDOVER](BA_HANDOVER.md) |
| Nhận diện/UI/sản phẩm | [UI_GUIDELINES](UI_GUIDELINES.md) |
| Dữ liệu/file/backup | [DATA_SAFETY](DATA_SAFETY.md) |
| Kiểm tra/nghiệm thu | [QUALITY](QUALITY.md) |

## Hồ sơ của 5 nhóm

| Nhóm | Nghiệp vụ | Handoff hiện tại |
| --- | --- | --- |
| 1 | [Lead và Pipeline](modules/01-leads.md) | [01-leads](handoffs/01-leads.md) |
| 2 | [Tracking và đồng bộ](modules/02-tracking-sync.md) | [02-tracking-sync](handoffs/02-tracking-sync.md) |
| 3 | [Ads/từ khóa/SEO](modules/03-keywords-ads.md) | [03-keywords-ads](handoffs/03-keywords-ads.md) |
| 4 | [Báo cáo](modules/04-reports.md) | [04-reports](handoffs/04-reports.md) |
| 5 | [AI thiết kế — giai đoạn 2](modules/05-ai-design.md) | [05-ai-design](handoffs/05-ai-design.md) |

## Dữ liệu và vận hành

[Database](database/README.md), [ownership](database/TABLE_OWNERSHIP.md), [từ điển ERD](database/DATA_DICTIONARY.md), [độ bao phủ](database/ERD_COVERAGE.md); [quyết định còn mở](decisions/OPEN_QUESTIONS.md), [ADR](decisions/README.md), [runbook](runbooks/README.md); [nguồn/ảnh BA](sources/README.md).

README theo vùng: [web](../apps/web/README.md), [api](../apps/api/README.md), [database package](../packages/database/README.md), [contracts](../packages/contracts/README.md), [tests](../tests/README.md), [local](../infra/local/README.md), [deploy](../infra/deploy/README.md).

Hồ sơ bootstrap cũ nằm tại [archive](archive/bootstrap/README.md), [task bootstrap đã hoàn tất](tasks/completed/BOOTSTRAP_DOCS_ONLY.md) và [kiểm tra bộ Markdown ban đầu](reviews/20261105-initial-docs-validation.md). Những bản này giữ lịch sử, không thuộc luồng đọc hàng ngày hoặc cấu hình task đang hoạt động.
