# 04-reports — Dashboard và báo cáo

**Nhóm 4 — phụ trách: Nguyễn Hoàng Minh Khôi.** Branch: `feature/reports-dashboard`. Trạng thái: **CHƯA TRIỂN KHAI trong gói tài liệu**. Nguồn nghiệp vụ: [BA](../sources/README.md#s04), [ma trận quyền](../PERMISSIONS.md); mục bên dưới tóm tắt nghiệp vụ, không thay nguồn BA.

## Vùng phát triển của nhóm

| Lớp | Đường dẫn |
| --- | --- |
| FE | apps/web/src/modules/04-reports/ |
| FE route | apps/web/src/app/(workspace)/reports/ |
| BE | apps/api/src/modules/04-reports/ |
| API route | apps/api/src/app/api/v1/reports/ |
| Contracts | packages/contracts/src/04-reports/ |
| Model tương lai | packages/database/prisma/models/04-reports.prisma — chưa tạo |
| E2E/fixture | tests/e2e/04-reports/ và tests/fixtures/04-reports/ |

Các file chung và nguyên tắc public interface xem [MODULE_MAP](../MODULE_MAP.md), [ARCHITECTURE](../ARCHITECTURE.md), [API_CONTRACTS](../API_CONTRACTS.md). Tham chiếu Qxx trong hồ sơ này nằm ở [OPEN_QUESTIONS](../decisions/OPEN_QUESTIONS.md).


## UC04 — Dashboard và báo cáo

Dashboard theo vai trò, lấy dữ liệu gốc: Giám đốc tổng quan; Marketing/Ads theo nguồn/sản phẩm/chi phí và hiệu quả; Sales theo cá nhân và khách đã gửi báo giá chưa phản hồi; Designer số ấn phẩm theo loại, thời gian và token/chi phí AI khi giai đoạn thiết kế triển khai.

Lọc 1 tuần, 30 ngày hoặc khoảng tùy chọn. Bộ lọc ngày không hợp lệ phải báo lỗi. Truy vấn thành công không có dữ liệu thì hiển thị 0/trạng thái trống theo UC04; nguồn chưa kết nối/lỗi không được biến thành 0 giả. “Một tuần” lịch hay 7 ngày trượt cần thống nhất trước khi chốt logic ngày.

Thống kê tổng Lead, phân bổ theo Sales, trạng thái, nguồn, sản phẩm nhiều/ít được hỏi; số Lead đã gửi báo giá và chưa phản hồi. Không chỉ tính từ trang danh sách hiện tại. Thống kê thiết kế/AI có nguồn riêng, chưa có thì ghi chưa triển khai.

## Quyền và xuất dữ liệu

Giữ nguyên matrix BA: đủ 8 vai trò có quyền export Excel/Google Sheets, không thu hẹp chỉ còn Giám đốc do UC04 mô tả luồng chính. Sales Dashboard số liệu cá nhân; trưởng phòng báo cáo theo phòng mình theo yêu cầu người dùng; các quyền Lead toàn công ty không bị đổi.

Export dùng cùng bộ lọc, scope và biểu diễn dữ liệu được xem; không dùng export để lộ Lead định danh cho Marketing/Ads. UC04 lỗi file/Sheets chưa kết nối phải báo đúng và cho thử lại/chọn định dạng khác; không báo thành công nếu chưa tạo/gửi được file.

## Dữ liệu và phụ thuộc

M04 đọc public read từ M01/M02/M03 và M05 ở giai đoạn 2; có thể dùng read model/view được owner chốt khi cần. Không tự ghi bảng Lead/Tracking/Ads hoặc query xuyên bảng tùy tiện. Bảng lưu export/job chỉ tạo nếu có yêu cầu thực, không tạo report table chỉ để đủ nhóm.

Mỗi KPI cần định nghĩa mẫu số, nguồn dữ liệu, khoảng thời gian/timezone, độ mới và trạng thái lỗi/thiếu nguồn. Giao diện báo cáo đọc toàn trang theo feedback, không nhét báo cáo dài vào ô nhỏ và không đưa giá báo khách/doanh số chưa chốt.

BPMN/sequence có phê duyệt ngân sách, ROI và doanh thu nhưng UC/ERD chưa đủ và feedback đang giới hạn: ghi Q08, chưa tự thêm workflow hay tính tiền giả. Quyền BA hiện có không bị thay đổi bởi việc chờ làm rõ KPI.

## Tiêu chí nghiệm thu khi triển khai

- Dữ liệu khác nhau đúng vai trò, Sales không thấy số liệu Sales khác qua filter/ID/endpoint khác.
- Ranh giới ngày và bộ lọc được kiểm tra; tập rỗng khác nguồn lỗi; thống kê khớp fixture toàn tập.
- Export đủ các hàng được phép, cùng scope/ẩn danh/filter; Excel/Sheets lỗi không success giả.
- Không hiển thị KPI thiết kế/AI hoặc nguồn Google như đã live khi chưa có dữ liệu được xác minh.

## Điểm còn mở

Q03/Q04/Q08/Q09/Q10/Q13/Q15 và định nghĩa tuần/mốc KPI, nguồn Sheets, usage AI. Cần chốt từng KPI trước khi nghiệm thu số liệu.
