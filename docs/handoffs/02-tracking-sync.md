# Handoff 02-tracking-sync

Cập nhật: 05/11/2026. Nhóm 2 — Cát Cần Sỹ. Branch dự kiến: `feature/tracking-integration`. Gói bàn giao chưa khởi tạo Git nên chưa có HEAD.

## Hiện trạng

Chỉ có thư mục giữ chỗ FE/BE/contracts/test và tài liệu nghiệp vụ; **chưa có code chức năng, route thực, model/migration hoặc test ứng dụng**. Mẫu task chưa phải nhiệm vụ triển khai. Chưa có account/provider được cấu hình.

## Phạm vi và phụ thuộc

DFD 3.0, nguồn/webhook/Google Ads/GA4/Search Console. UC03 được tham chiếu nhưng chưa có mô tả riêng đầy đủ.

M02 gọi public ingest M01 và public upsert metric M03; không ghi trực tiếp bảng hai module đó. Scheduler/worker thuộc Core khi có job thật.

## Bằng chứng và điểm còn mở

Kiểm tra tài liệu/công cụ chung được ghi tại [báo cáo](../reviews/20261105-handoff-validation.md). Nghiệp vụ/API/E2E/DB/provider của module: NOT_RUN. Không suy rằng các chức năng đã hoàn thành.

Chốt contract ingest/checkpoint/idempotency và nguồn Google; không tự kết nối account hoặc gửi dữ liệu thật.

## Việc tiếp theo

Nhận task cụ thể; tạo task từ [mẫu](../tasks/m02/TASK.example.json). Đọc mục liên quan trong [hồ sơ module](../modules/02-tracking-sync.md), tìm source/caller nếu đã có code mới. Sau task cập nhật trạng thái, file/contract đã đổi, lệnh/kết quả và blocker ngay trong bản này; giữ ngắn, không chép toàn bộ BA.
