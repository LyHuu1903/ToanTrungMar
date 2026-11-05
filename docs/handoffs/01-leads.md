# Handoff 01-leads

Cập nhật: 05/11/2026. Nhóm 1 — Lâm Thành Nam. Branch dự kiến: `feature/lead-management`. Gói bàn giao chưa khởi tạo Git nên chưa có HEAD.

## Hiện trạng

Chỉ có thư mục giữ chỗ FE/BE/contracts/test và tài liệu nghiệp vụ; **chưa có code chức năng, route thực, model/migration hoặc test ứng dụng**. Mẫu task chưa phải nhiệm vụ triển khai. Chưa có account/provider được cấu hình.

## Phạm vi và phụ thuộc

UC01/UC02, DFD 1.0 và 2.0. Lead + Pipeline cùng thuộc M01; cờ Spam/trùng/tiếp nhận không thay 5 trạng thái Pipeline.

Core account/quyền/thông báo; M02 gọi public ingest M01. M03/M04/M05 đọc public contract có scope. Không import ngược gây cycle.

## Bằng chứng và điểm còn mở

Kiểm tra tài liệu/công cụ chung được ghi tại [báo cáo](../reviews/20261105-handoff-validation.md). Nghiệp vụ/API/E2E/DB/provider của module: NOT_RUN. Không suy rằng các chức năng đã hoàn thành.

Chốt trường bắt buộc/ẩn danh, chuẩn hóa/trùng và điều kiện phân/chuyển Sales ở các mục liên quan OPEN_QUESTIONS trước khi viết use case đó.

## Việc tiếp theo

Nhận task cụ thể; tạo task từ [mẫu](../tasks/m01/TASK.example.json). Đọc mục liên quan trong [hồ sơ module](../modules/01-leads.md), tìm source/caller nếu đã có code mới. Sau task cập nhật trạng thái, file/contract đã đổi, lệnh/kết quả và blocker ngay trong bản này; giữ ngắn, không chép toàn bộ BA.
