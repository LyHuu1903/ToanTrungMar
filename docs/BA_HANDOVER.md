# Bàn giao BA → IT và truy vết yêu cầu

Ngày hợp nhất 05/11/2026. Tài liệu mô tả những gì đã đọc trong brief, feedback, roadmap, sơ đồ BA, ERD, bảng phân nhóm và trao đổi của người dùng. Phân biệt **nghiệp vụ BA**, **đề xuất kỹ thuật** và **chưa đủ đặc tả**; không đánh dấu code hoàn thành từ sơ đồ.

## Nguồn chuẩn

Giữ nguyên ma trận BA theo chỉ định mới nhất của người dùng. Tài liệu kỹ thuật cũ chỉ tham khảo kiến trúc; ma trận 4 vai trò, người P1…P5 và các bảng DB tự đề xuất trong blueprint cũ không thay bản BA/bảng nhóm thật.

Đọc lại tài liệu đặc tả trực tuyến ngày 05/11 thấy UC01/UC02/UC04/UC06 đã có nội dung. Các tab M02/M03 còn trống; UC03-1 và UC03-4 được UC01 gọi nhưng chưa có mô tả riêng. Không giữ nhận xét cũ “M01/M05 chưa có use case” sau khi đã có bản mới.

## Đối tượng ngữ cảnh

8 vai trò lấy từ ma trận: NVKD, NV Marketing, Designer, NV Ads, Trưởng phòng MKT, Trưởng phòng Sales, Giám đốc, Admin. Website/Google/AI là hệ thống ngoài; khách hàng là dữ liệu, không tạo portal/tài khoản. Lane khách hàng trong BPMN mô tả hoạt động kinh doanh ngoài ứng dụng.

Ảnh ngữ cảnh BA hiện gộp phòng ban; khi trình bày lại phải thể hiện đủ vai trò theo ma trận mà giữ nội dung nguồn. Tài liệu này không sửa nguyên ảnh BA. [Ngữ cảnh](sources/assets/ba-context.png), [liên kết module](sources/assets/ba-module-links.png), [BFD](sources/assets/ba-bfd.png), [DFD](sources/assets/ba-dfd-level1.png).

## Tiến trình DFD và kho dữ liệu

| DFD | Ý nghĩa | Module đích | Kho chính |
| --- | --- | --- | --- |
| 1.0 | Tiếp nhận và phân Lead | M01 | D1 |
| 2.0 | Theo dõi Pipeline/báo giá | M01 | D1 |
| 3.0 | Tracking nguồn và đồng bộ | M02 | D3 |
| 4.0 | Báo cáo/Dashboard | M04 | Đọc D1, D3, D5 theo hình |
| 5.0 | Nội dung SEO tích hợp AI | Đề xuất giao M03 theo BFD/phân nhóm | D3, D4, D5 |
| 6.0 | Thiết kế/phối cảnh | M05 — giai đoạn 2 | D6 |
| 7.0 | Người dùng/phân quyền | Core | D2 |

Số DFD không phải số nhóm/module. M04 nhận thống kê M05 ở giai đoạn 2 theo sơ đồ liên kết/UC04; DFD hiện chỉ biểu diễn các luồng ghi trên hình, không tự thêm D6 → D4 như đường gốc đã có.

Ghi chú BA: các thực thể lặp chỉ để tránh đường chéo; mọi tiến trình đọc D2 kiểm tra quyền nhưng không vẽ hết; công tắc Đang nhận lead lưu ở D2; dữ liệu gửi AI không có SĐT/email/thông tin khách; nét đứt là giai đoạn 2. Đây là ràng buộc cần chuyển vào task/test.

## Truy vết nghiệp vụ quan trọng

| ID nội bộ tài liệu | Nguồn BA | Yêu cầu | Hồ sơ/tiêu chí |
| --- | --- | --- | --- |
| BA-01 | UC01 | Webhook/nhập tay, chuẩn hóa SĐT, kiểm tra trùng tạo/sửa, không tự gộp | M01; input và các cờ riêng |
| BA-02 | UC01 | Webhook tự phân hoặc Chưa giao; Sales online/đủ tải; tiếp nhận có thời điểm; Spam giữ Pipeline | M01 + Core; model hiện thiếu một phần |
| BA-03 | UC01/UC03-4 | Marketing chỉ xem ẩn danh; Ads xem ẩn danh, sửa Nguồn/Chiến dịch duy nhất | PERMISSIONS, M01/M02 |
| BA-04 | UC02 | Thất bại có lý do; chuyển Lead mở với người nhận hợp lệ, kiểm tra lại khi xác nhận, giữ trạng thái | M01; transaction/lịch sử |
| BA-05 | DFD 2.0 | Cảnh báo báo giá quá 7 ngày | M01; mốc ngày và phản hồi cần chốt |
| BA-06 | DFD 3.0/roadmap | Dữ liệu nguồn Google và website thật, lịch đồng bộ | M02; không giả metadata |
| BA-07 | DFD 5.0/BFD | SEO: đề tài/outline/bản nháp, bài cũ, từ khóa/traffic, duyệt bài, nhật ký AI | M03; UC chi tiết và model D4/D5 chưa đủ |
| BA-08 | UC04/ma trận | Dashboard theo vai trò, 1 tuần/30 ngày/tùy chọn, export Excel/Sheets đúng dữ liệu được xem | M04; export được cấp cho đủ 8 vai trò |
| BA-09 | UC06/DFD | Nháp 3D/ảnh/banner, thư viện/phiên bản, tải file, thời gian/token | M05 giai đoạn 2 |
| BA-10 | DFD ghi chú | Không gửi thông tin khách sang AI | Core adapter + M03/M05; kiểm tra payload/tệp |

## ERD được bàn giao và phần cần bổ sung

[ERD PDF](sources/assets/ba-erd.pdf) có 9 bảng: roles, users, leads, products, lead_products, lead_attachments, lead_activities, marketing_tracking, design_requests. Hai trang thể hiện cùng cấu trúc, trang sau làm nổi các đường liên kết. Không đếm thành 18 bảng.

ERD chưa bao phủ hết DFD/UC mới: D4 bài viết/từ khóa, D5 nhật ký AI, số liệu chi phí Ads; cùng các chi tiết phân công/tiếp nhận/Spam/project/online/Đang nhận lead và hành vi lịch sử. [ERD_COVERAGE](database/ERD_COVERAGE.md) là danh sách đối chiếu, không phải lệnh tự thêm bảng.

Một kho DFD có thể ứng với nhiều bảng; một nhãn nghiệp vụ không tự thành cột. Người phụ trách DB phối hợp owner module và BA chốt model trong task riêng, giữ một migration history.

## Khác biệt phải giữ dấu nguồn

Field bắt buộc, loại file, định nghĩa trùng, giai đoạn SEO, doanh thu/ROI/ngân sách và yêu cầu thiết kế có/không gắn Lead đang khác mức chi tiết giữa nguồn. Nội dung đã rõ được triển khai theo task; phần chưa rõ theo [OPEN_QUESTIONS](decisions/OPEN_QUESTIONS.md). Không đề xuất sửa ma trận quyền đã được người dùng chốt.
