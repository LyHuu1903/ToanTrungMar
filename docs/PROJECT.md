# Phạm vi và trạng thái dự án

Ngày hợp nhất: 05/11/2026. Nguồn nghiệp vụ: [S01/S02/S03/S04](sources/README.md), các ảnh BA và ERD kèm theo. Bộ này là tài liệu bàn giao, chưa phải đặc tả API/schema đã triển khai.

## Mục tiêu

Tập trung Lead, tiến độ Sales, tracking và báo cáo; giảm nhập lặp, cảnh báo trùng, lưu lịch sử bàn giao/thất bại; hỗ trợ Marketing/Ads đối chiếu dữ liệu thực và Designer tạo bản nháp. Khách hàng là dữ liệu bên ngoài ứng dụng, không phải tài khoản đăng nhập.

## Năm module

| Module | Phạm vi | Nguồn BA chính |
| --- | --- | --- |
| M01 | Lead + Pipeline, tiếp nhận/phân công, chuẩn hóa, trùng, Spam, lịch sử, tệp, chuyển Sales và theo dõi báo giá | UC01, UC02; DFD 1.0/2.0 |
| M02 | Nguồn Lead, tracking, webhook, đồng bộ Google Ads/GA4/Search Console, lịch chạy | DFD 3.0, roadmap; UC03 được tham chiếu nhưng chưa có bản mô tả riêng |
| M03 | Từ khóa/Ads/CPC/ngân sách; đề xuất phụ trách SEO tích hợp AI theo BFD/DFD | BFD, DFD 5.0, bảng phân nhóm |
| M04 | Dashboard theo vai trò, 1 tuần/30 ngày/tùy chọn, thống kê sản phẩm/Lead/báo giá, Excel/Sheets | UC04, DFD 4.0 |
| M05 | Bản nháp phối cảnh 3D, ảnh/banner, thư viện ấn phẩm, hoàn thiện/tải file, ghi thời gian/token | UC06, DFD 6.0 — giai đoạn 2 |

Core dùng chung: tài khoản/đăng nhập, quyền, HTTP, thông báo/hồ sơ, storage, logging, điều phối job và DB client. DFD 7.0 là Core; không tạo thêm nhóm thứ sáu.

## Người sử dụng và quyền

8 vai trò BA: Nhân viên Kinh doanh, Nhân viên Marketing, Designer, Nhân viên Ads, Trưởng phòng Marketing, Trưởng phòng Sales, Giám đốc, Quản trị viên. Giữ nguyên [ma trận BA](PERMISSIONS.md). Quyền chức năng được kết hợp biểu diễn ẩn danh và quy tắc use case; không suy quyền từ tên chức danh.

## Giai đoạn nghiệp vụ và mốc kỹ thuật

Roadmap BA dự kiến 10 tuần: GĐ0 tuần 1–2 khảo sát/tài liệu; GĐ1 tuần 3–8 Lead–Tracking–Dashboard; GĐ2 tuần 7–10 từ khóa/Ads và AI thiết kế. Tuần 7–8 chạy song song. Đây là thời lượng tương đối, chưa có ngày bắt đầu được chốt.

DFD đánh dấu thiết kế/phối cảnh bằng nét đứt ở giai đoạn 2. Tiến trình SEO 5.0 chưa ghi giai đoạn riêng; lịch chi tiết cần thống nhất với roadmap trước khi giao task SEO. Không đổi thứ tự hoặc ngày nghiệm thu chỉ từ màu của sơ đồ.

Mốc kỹ thuật tài liệu/khung/auth/module/tích hợp là cách tổ chức task, không thay lịch nghiệp vụ BA. Hiện có bộ tài liệu, khung thư mục và công cụ bàn giao/kiểm tra; các chức năng đều chưa triển khai. Dev/test dùng dữ liệu mẫu tổng hợp; kết nối tài khoản và dữ liệu thật là công việc riêng ở bước cuối theo roadmap BA.

## Giới hạn phải giữ

- Giữ 3 nhóm sản phẩm BA và danh mục cụ thể; không tự thay bằng vài lựa chọn LED cố định.
- Chưa có portal khách hàng, đăng ký công khai, AI phân loại Lead hoặc AI đọc dữ liệu khách.
- Theo feedback UI, chưa đưa giá bán/dự toán/chiết khấu/bảo hành và thẻ doanh số lên ứng dụng. Chi phí Ads/AI vẫn thuộc BA.
- Một số hình module/BPMN có doanh thu, ROI và phê duyệt ngân sách nhưng UC/ERD chưa mô tả đủ và feedback đang giới hạn tiền báo khách: giữ dấu nguồn, xử lý [Q08](decisions/OPEN_QUESTIONS.md#q08) trước khi triển khai các mục đó.
- Video ngắn là hướng nghiên cứu trong roadmap/BFD; UC06 hiện mô tả phối cảnh và ảnh/banner. Chưa hứa tính năng video hoàn chỉnh.
- Kết nối các website hiện có; roadmap không giao làm lại giao diện website công ty.

Đề xuất công nghệ và các ranh giới nằm ở [ARCHITECTURE](ARCHITECTURE.md); phần nghiệp vụ chưa mô hình hóa đủ nằm ở [BA_HANDOVER](BA_HANDOVER.md).
