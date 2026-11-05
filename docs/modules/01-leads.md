# 01-leads — Quản lý Lead và Pipeline

**Nhóm 1 — phụ trách: Lâm Thành Nam.** Branch: `feature/lead-management`. Trạng thái: **CHƯA TRIỂN KHAI trong gói tài liệu**. Nguồn nghiệp vụ: [BA](../sources/README.md#s04), [ma trận quyền](../PERMISSIONS.md); mục bên dưới tóm tắt nghiệp vụ, không thay nguồn BA.

## Vùng phát triển của nhóm

| Lớp | Đường dẫn |
| --- | --- |
| FE | apps/web/src/modules/01-leads/ |
| FE route | apps/web/src/app/(workspace)/leads/ |
| BE | apps/api/src/modules/01-leads/ |
| API route | apps/api/src/app/api/v1/leads/ |
| Contracts | packages/contracts/src/01-leads/ |
| Model tương lai | packages/database/prisma/models/01-leads.prisma — chưa tạo |
| E2E/fixture | tests/e2e/01-leads/ và tests/fixtures/01-leads/ |

Các file chung và nguyên tắc public interface xem [MODULE_MAP](../MODULE_MAP.md), [ARCHITECTURE](../ARCHITECTURE.md), [API_CONTRACTS](../API_CONTRACTS.md). Tham chiếu Qxx trong hồ sơ này nằm ở [OPEN_QUESTIONS](../decisions/OPEN_QUESTIONS.md).


## Nghiệp vụ đã có — UC01 và UC02

M01 bao gồm tiếp nhận Lead và Pipeline; không tách thành nhóm thứ sáu. Nguồn tự động qua webhook gọi phần bóc tracking UC03, chuẩn hóa SĐT, kiểm tra trùng, lưu trạng thái Vừa nhận thông tin và tự giao Sales đủ điều kiện. Chưa có người phù hợp thì Chưa giao và tiếp tục phân khi có người phù hợp. Lead nhập tay từ Hotline/Zalo do NVKD tạo, mặc định người nhập phụ trách theo UC01.

NVKD xem Lead thuộc phạm vi được giao, xác nhận tiếp nhận có người/thời điểm; sửa SĐT/email/công ty/dự án/địa chỉ/sản phẩm và kiểm tra trùng lại; đính kèm ảnh theo UC01; đánh dấu/bỏ Spam và ghi lịch sử. Spam không đổi Pipeline. Chuẩn hóa thất bại gắn cờ SĐT chưa chuẩn hóa.

Trùng khi khớp SĐT hoặc email; có công ty/dự án thì đối chiếu thêm theo UC01. Gắn cờ, tô đỏ, hiển thị Lead cũ, không tự gộp. Mức chuẩn hóa/so khớp và field tối thiểu cần chốt ở Q05/Q13; không tự đặt unique phone cho mọi Lead.

| Mã Pipeline trong ERD | Hiển thị BA |
| --- | --- |
| new_lead | Vừa nhận thông tin |
| quoting | Đang soạn báo giá |
| quote_sent | Đã gửi báo giá |
| won | Chốt thành công |
| lost | Thất bại |

Thất bại bắt buộc có lý do. Chuyển Lead chỉ khi chưa Chốt thành công/Thất bại; phải có lý do và người nhận khác người chuyển, đang online/đủ điều kiện. Lý do Bận yêu cầu tải việc ít hơn hẳn theo định nghĩa BA cần chốt. Kiểm tra lại khi xác nhận; chuyển người phụ trách, giữ Pipeline, lưu lý do/lịch sử và thông báo hai bên. Không đủ điều kiện thì giữ nguyên dữ liệu.

Theo dõi danh sách đã gửi báo giá chưa phản hồi; DFD yêu cầu nhắc quá 7 ngày, mốc/nhắc lặp đang Q09. Không tự thêm giá bán/dự toán hoặc thẻ doanh số.

## Quyền và đầu vào/đầu ra

Giữ nguyên ma trận PERMISSIONS. UC01: Marketing chỉ xem ẩn danh; Ads xem ẩn danh và chỉ sửa Nguồn/Chiến dịch theo UC03-4. Không dùng một patch Lead chung để Ads sửa contact/Pipeline. Vai trò quản lý/Admin vẫn giữ các ô quyền BA đã tick; UC01 không liệt kê họ không có nghĩa xóa quyền.

Input có hai luồng web/nhập tay; web tối thiểu SĐT+email theo UC01, các field required còn khác feedback/ERD cần field matrix. Output gồm Lead đúng biểu diễn quyền, người phụ trách, trạng thái/cờ, lịch sử, tài liệu được phép và thông báo. Khách hàng không có tài khoản ứng dụng.

## Dữ liệu và phụ thuộc

Bảng ERD: leads, products, lead_products, lead_attachments, lead_activities. Danh mục LED dùng chung cả 5 module. Phân công/online/nhận Lead và account do Core phối hợp; metadata tracking do M02 sở hữu. M03/M04/M05 chỉ đọc qua public contract có scope. Composition gọi tracking rồi ingest tránh import M01↔M02.

ERD chưa có đầy đủ tên dự án/Spam/tiếp nhận/SĐT chưa chuẩn hóa, actor webhook và lịch sử các thao tác UC01. Chưa tự thêm DDL; xem ERD_COVERAGE. Danh sách không Lead/lỗi lưu/thiếu tài liệu phải hiện đúng trạng thái; lỗi cập nhật không được ghi dở.

## Tiêu chí nghiệm thu khi triển khai

- Tạo/sửa/trùng/SĐT/cờ đúng UC01; retry webhook không làm nhân bản cùng sự kiện, nhưng không tự gộp Lead thật trùng.
- Chưa có Sales phù hợp giữ Chưa giao; phân công cạnh tranh không giao một Lead cho hai người; tiếp nhận không đổi trạng thái.
- Chuyển/thất bại thiếu lý do hoặc người nhận hết điều kiện bị từ chối, Lead/lịch sử không ghi dở; chuyển thành công giữ Pipeline.
- Spam/bỏ Spam không đổi Pipeline; lịch sử phản ánh thao tác; file sai theo UC01 không lưu.
- Đủ vai trò theo matrix; DTO ẩn danh và quyền file/export không bị vượt qua đường API khác.

## Điểm còn mở

Q03–Q09, Q12–Q14: field ẩn danh/required, nguồn, file, online/tải việc, lịch sử/nhắc, model và ticket thiết kế. Không chặn các phần đã rõ khi task độc lập.
