# Handoff 05-ai-design

Cập nhật: 05/11/2026. Nhóm 5 — Lý Tăng Hữu. Branch dự kiến: `feature/ai-design`. Gói bàn giao chưa khởi tạo Git nên chưa có HEAD.

## Hiện trạng

Chỉ có thư mục giữ chỗ FE/BE/contracts/test và tài liệu nghiệp vụ; **chưa có code chức năng, route thực, model/migration hoặc test ứng dụng**. Mẫu task chưa phải nhiệm vụ triển khai. Chưa có account/provider được cấu hình.

## Phạm vi và phụ thuộc

UC06, DFD 6.0 là giai đoạn 2. AI tạo bản nháp cho Designer; giữ quyền AI Design chỉ Designer/Admin theo BA.

Đọc dữ liệu cần thiết từ M01 theo public contract có scope, dùng Core private storage/provider/job. Không tạo import M01↔M05.

## Bằng chứng và điểm còn mở

Kiểm tra tài liệu/công cụ chung được ghi tại [báo cáo](../reviews/20261105-handoff-validation.md). Nghiệp vụ/API/E2E/DB/provider của module: NOT_RUN. Không suy rằng các chức năng đã hoàn thành.

Chốt ticket thiết kế/model, giới hạn đầu vào và khả năng provider; chưa hứa video/MP4 hoặc mô hình 3D chỉnh sửa được.

## Việc tiếp theo

Nhận task cụ thể; tạo task từ [mẫu](../tasks/m05/TASK.example.json). Đọc mục liên quan trong [hồ sơ module](../modules/05-ai-design.md), tìm source/caller nếu đã có code mới. Sau task cập nhật trạng thái, file/contract đã đổi, lệnh/kết quả và blocker ngay trong bản này; giữ ngắn, không chép toàn bộ BA.
