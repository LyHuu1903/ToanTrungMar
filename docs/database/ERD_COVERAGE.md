# Đối chiếu ERD với DFD và use case BA

Trạng thái: phân tích bàn giao; không có schema/migration mới. Nguồn là [ERD PDF](../sources/assets/ba-erd.pdf), [DFD](../sources/assets/ba-dfd-level1.png) và UC01/02/04/06 trong tài liệu BA đọc ngày 05/11/2026.

## Kho dữ liệu DFD

| Kho | Nội dung | ERD đã thể hiện | Chưa thể hiện đủ |
| --- | --- | --- | --- |
| D1 | Lead và Pipeline | leads, products, lead_products, lead_attachments, lead_activities | Chi tiết UC01 mới, phản hồi báo giá/mốc nhắc |
| D2 | Người dùng/phân quyền | users, roles | Công tắc Đang nhận lead, online/tải việc; cơ chế phiên khi chọn thiết kế |
| D3 | Nguồn/chiến dịch/chi phí | marketing_tracking gắn Lead, UTM/campaign/landing/device/IP/location/sync status | Metric Ads/GA4/Search Console, cost, account/date/grain và lịch đồng bộ/checkpoint |
| D4 | Bài viết và từ khóa | Chưa có bảng riêng | Bài/outline/keyword/duyệt bài/nguồn bài cũ |
| D5 | Nhật ký dùng AI | Chưa có bảng riêng | Từng lượt, thời gian, token/chi phí, module/user/task và trạng thái |
| D6 | Thiết kế — giai đoạn 2 | design_requests | Thư viện/phiên bản/prompt/thông số cụ thể/thời gian/token và quan hệ tác vụ theo UC06 |

Không cần một bảng cho đúng một kho DFD; các ô “chưa thể hiện” là nhu cầu thiết kế, chưa phải danh sách cột cần tự tạo.

## Chi tiết use case cần đối chiếu trước khi code

| BA mô tả | ERD hiện tại | Việc cần chốt |
| --- | --- | --- |
| Xác nhận tiếp nhận, người/thời điểm | leads chỉ có assigned_sales_id và timestamps chung | Phân biệt phân công với xác nhận tiếp nhận |
| Tên dự án, Spam, SĐT chưa chuẩn hóa | Chưa thấy trường tương ứng trong leads | Cách lưu các khái niệm riêng, không thêm vào Pipeline enum tùy tiện |
| Tự giao khi online/đủ tải/Đang nhận lead | users chỉ có is_active; DFD ghi công tắc tại D2 | Presence, tải việc, nhận Lead và account active là khái niệm khác nhau |
| Lịch sử tạo/sửa/tệp/Spam/tiếp nhận | lead_activities action_type hiện chỉ reassign_sales/status_change/add_note | Cách ghi lịch sử đủ hành vi, giá trị cũ/mới và actor |
| Nguồn Webhook/Hotline/Zalo | contact_channel đang hotline/form_web/email/fanpage | Phân biệt kênh liên hệ với nguồn/campaign, mapping Zalo/Webhook |
| Website tối thiểu SĐT+email, nhập tay bổ sung sau | ERD có NN ở contact_name/phone/area_type/province/created_by_user_id... | Field matrix theo từng luồng; actor của Lead tự động; không điền dữ liệu giả cho đủ NN |
| Trùng khi khớp SĐT/email/công ty/dự án, không gộp | is_duplicate_alert có; chưa có project_name | Thuật toán/mức chuẩn hóa và cách liên kết cảnh báo |
| Báo giá chưa phản hồi và cảnh báo quá 7 ngày | Pipeline có quote_sent; lịch sử có created_at | Mốc tính ngày, tín hiệu phản hồi và cách chống nhắc lặp |
| Chỉ Ads sửa Nguồn/Chiến dịch UC03-4 | marketing_tracking có 2 trường; chưa có rule/history chỉnh nguồn riêng | Contract/validation/history UC03-4 |
| Banner có thể không gắn Lead trong UC06 | design_requests.lead_id đang NN | Phạm vi banner/ấn phẩm độc lập và Sales ticket so với Designer tự tạo |
| Token/chi phí/hạn mức theo người/dự án trong hình UC06 | ERD design_requests không có dữ liệu usage/limit | Model dùng chung D5, cấu hình quota và source cost thực |

## Quan hệ và ràng buộc

PDF thể hiện users → roles; Lead có Sales phụ trách tùy chọn; Lead liên kết nhiều activity/product/attachment/design request; marketing_tracking một-một với Lead. Các trường created_by_user_id/uploaded_by/action_by/from_sales_id/to_sales_id/requested_by_sales_id/assigned_designer_id cần đối chiếu FK đầy đủ trong DBML khi triển khai vì ảnh không vẽ hết.

Không tự thêm cascade/delete/unique, không chọn cỡ ID hoặc thuật toán index từ ảnh. Không dùng updated_at chung làm mốc báo giá khi chưa chốt nghiệp vụ. Kiểm tra trên schema thật đúng provider/major trong task DB riêng.
