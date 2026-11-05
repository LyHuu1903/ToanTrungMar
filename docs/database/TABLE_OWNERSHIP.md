# Quyền sở hữu bảng và kho dữ liệu

Ownership dưới đây là **đề xuất tổ chức phát triển theo 5 nhóm**, chưa phải quyền DB đã cấu hình. Tên 9 bảng lấy nguyên từ ERD BA; không dùng danh sách bảng suy đoán trong blueprint cũ làm schema thật.

| Bảng hiện có trong ERD | Owner ghi đề xuất | Consumer chính |
| --- | --- | --- |
| roles | Core | Tất cả module qua quyền |
| users | Core | M01 phân công, M05 Designer, M04 phạm vi |
| leads | M01 | M02 qua public ingest; M03/M04/M05 qua read contract |
| products | M01 duy trì danh mục chung | Cả 5 module theo danh mục BA |
| lead_products | M01 | M03/M04/M05 khi được cấp |
| lead_attachments | M01 | M05 khi yêu cầu thiết kế được phép |
| lead_activities | M01 | M04 đọc tiến độ/lịch sử cần thiết |
| marketing_tracking | M02 | M01/M03/M04 qua contract |
| design_requests | M05 — giai đoạn 2 | M01 composition/M04 qua contract |

M01 là owner danh mục sản phẩm đề xuất để tránh mỗi nhóm tạo một danh mục LED khác nhau. Quyền người dùng thay đổi danh mục phải theo ma trận/đặc tả, không tự cấp từ ownership code.

## Phần chưa có model trong ERD

| Vùng DFD/nhu cầu | Owner đề xuất khi chốt model | Trạng thái |
| --- | --- | --- |
| D3 campaign/metric Google chi phí | M03 chịu model phân tích; M02 ingest qua public contract | Chưa có cấu trúc metric trong ERD |
| D4 bài viết/từ khóa | M03 | Chưa có bảng/UC chi tiết |
| D5 nhật ký dùng AI | Core duy trì contract lưu dùng chung; M03/M05 phát sinh lượt | Chưa có model hoặc người điều phối được chỉ định |
| M04 export lưu lâu/job | M04 nếu có yêu cầu lưu | Chưa có bảng; không bắt buộc tạo |
| Session/presence/nhận Lead/lịch sử mở rộng | Core/M01 phối hợp | Xem ERD_COVERAGE, chưa chốt cách lưu |

Không ghi tên bảng tương lai như thể BA đã duyệt DDL. Người điều phối DB/Core và reviewer cần trưởng dự án chỉ định; chưa gán P1/P2 giả hoặc GitHub username từ họ tên. Các thay đổi public contract/FK cần owner và consumer review trước merge.

Mỗi bảng chỉ có một owner ghi. Consumer dùng public contract/read model được thống nhất; M04 không tự sửa bảng nguồn. Ghi liên quan cần transaction context phù hợp; checkpoint và retry không được làm mất/nhân dữ liệu.
