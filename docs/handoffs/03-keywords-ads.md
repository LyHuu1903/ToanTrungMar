# Handoff 03-keywords-ads

Cập nhật: 05/11/2026. Nhóm 3 — Nguyễn Anh Quân. Branch dự kiến: `feature/ads-keywords`. Gói bàn giao chưa khởi tạo Git nên chưa có HEAD.

## Hiện trạng

Chỉ có thư mục giữ chỗ FE/BE/contracts/test và tài liệu nghiệp vụ; **chưa có code chức năng, route thực, model/migration hoặc test ứng dụng**. Mẫu task chưa phải nhiệm vụ triển khai. Chưa có account/provider được cấu hình.

## Phạm vi và phụ thuộc

Ads/từ khóa/CPC/ngân sách; SEO AI DFD 5.0 được đề xuất về M03, không phải M05 thiết kế.

M02 đưa metric qua public contract M03; M03 đọc outcome Lead qua M01. M04 đọc public read. Credential/AI adapter chỉ server.

## Bằng chứng và điểm còn mở

Kiểm tra tài liệu/công cụ chung được ghi tại [báo cáo](../reviews/20261105-handoff-validation.md). Nghiệp vụ/API/E2E/DB/provider của module: NOT_RUN. Không suy rằng các chức năng đã hoàn thành.

Chốt UC03/SEO, grain/đơn vị/công thức và phần model còn thiếu; không tự tạo KPI hoặc gửi thông tin khách cho AI.

## Việc tiếp theo

Nhận task cụ thể; tạo task từ [mẫu](../tasks/m03/TASK.example.json). Đọc mục liên quan trong [hồ sơ module](../modules/03-keywords-ads.md), tìm source/caller nếu đã có code mới. Sau task cập nhật trạng thái, file/contract đã đổi, lệnh/kết quả và blocker ngay trong bản này; giữ ngắn, không chép toàn bộ BA.
