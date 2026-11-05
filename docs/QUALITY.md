# Kiểm tra, nghiệm thu và bằng chứng

Trạng thái gói: khung/tài liệu và công cụ có node:test. Test công cụ và kiểm tra link được ghi riêng tại [báo cáo](reviews/20261105-handoff-validation.md). Chưa có build, CI, test nghiệp vụ hoặc provider live; các tiêu chí ứng dụng bên dưới chưa phải kết quả đã đạt.

## Chọn mức kiểm tra

| Thay đổi | Bằng chứng phù hợp |
| --- | --- |
| Markdown/cấu trúc | Đúng đường dẫn, link nội bộ, ma trận BA, mapping nhóm/DFD, không nhầm trạng thái triển khai |
| Chữ/CSS nhỏ | Xem trực tiếp vùng ảnh hưởng; không tạo test lặp implementation |
| Nghiệp vụ | Unit cho đầu vào/đầu ra và nhánh lỗi có ý nghĩa |
| API/quyền/ẩn danh | Integration handler thật; đủ 8 vai trò, action và phạm vi dữ liệu theo BA |
| Transaction/constraint | DB test riêng cùng provider với môi trường đích; lỗi giữa chừng không ghi dở, thử concurrency phù hợp |
| Luồng người dùng | E2E với dữ liệu tổng hợp và account test hợp lệ |
| Sync/AI/Google | Mock adapter cho retry/lỗi/chống lặp; kiểm tra sandbox/live riêng khi được cấu hình |
| Schema/tải/backup | Migration, benchmark/query/pool và restore DB + asset có bằng chứng riêng |

## Ca trọng tâm theo BA

- M01: webhook/nhập tay, trùng khi tạo/sửa không tự gộp, SĐT chưa chuẩn hóa, tiếp nhận, Spam giữ Pipeline, tự phân/chưa giao, chuyển Sales hợp lệ và kiểm tra lại, thất bại thiếu lý do, quyền file và DTO ẩn danh.
- M02: bóc nguồn đúng dữ liệu thật; lỗi webhook không mất dấu; event lặp không nhân bản; đồng bộ lại/checkpoint; Ads chỉ sửa Nguồn/Chiến dịch khi được đặc tả; không sửa thông tin khách/Pipeline.
- M03: đơn vị/grain/công thức chỉ số thống nhất; không cộng trung bình tỷ lệ tùy ý; SEO không có thông tin khách gửi AI; tài liệu UC03/SEO còn thiếu phải được ghi rõ.
- M04: đủ vai trò theo ma trận, Sales chỉ số cá nhân, ngày không hợp lệ, nguồn thiếu khác tập rỗng, Excel/Sheets cùng filter/scope/ẩn danh và toàn bộ tập kết quả.
- M05: ảnh/prompt/tham số sai, provider lỗi/timeout không báo thành công, lưu thư viện/phiên bản/tải file và thời gian/token thực; hạn mức được chốt trước khi test; phân biệt bản nháp AI với hoàn thiện.

Không tự diễn giải xanh ma trận thành mọi role được dùng tất cả chức năng. Quyền Admin/Director cũng phải theo từng ô; nghiệp vụ lý do/lịch sử vẫn giữ khi use case áp dụng.

## CI và Definition of Done

Khi được triển khai, checks cần thực sự chạy: lint/typecheck, test vùng ảnh hưởng, build khi có thay đổi wiring/config và kiểm tra import boundary/cycle. Chưa có script thì ghi chưa thiết lập; không tạo CI luôn xanh. Không dùng credential doanh nghiệp/AI trả phí trong CI mặc định.

Task đạt khi đúng tiêu chí, giữ quyền BA, không có diff ngoài phạm vi, tài liệu/contract cập nhật và có reviewer phù hợp. Báo command, môi trường, exit/result bằng PASS/FAIL/BLOCKED/NOT_RUN. Chỉ chạy rộng thêm khi có thay đổi, lỗi hoặc mối lo chưa giải quyết; không lặp full suite vô cớ.

Nguồn thực tế của command: [COMMANDS](COMMANDS.md). Test E2E và fixture đặt theo [tests/README](../tests/README.md).

Kiểm tra phạm vi theo [SCOPE_CHECK](SCOPE_CHECK.md); đường dẫn hợp lệ không chứng minh import boundary hoặc quyền đúng. Mỗi task cập nhật handoff module theo [AI_HANDOFF](AI_HANDOFF.md), không để AI tiếp theo dựa vào trạng thái cũ.
