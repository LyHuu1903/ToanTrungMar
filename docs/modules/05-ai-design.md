# 05-ai-design — AI hỗ trợ thiết kế

**Nhóm 5 — phụ trách: Lý Tăng Hữu.** Branch: `feature/ai-design`. Trạng thái: **CHƯA TRIỂN KHAI trong gói tài liệu**. Nguồn nghiệp vụ: [BA](../sources/README.md#s04), [ma trận quyền](../PERMISSIONS.md); mục bên dưới tóm tắt nghiệp vụ, không thay nguồn BA.

## Vùng phát triển của nhóm

| Lớp | Đường dẫn |
| --- | --- |
| FE | apps/web/src/modules/05-ai-design/ |
| FE route | apps/web/src/app/(workspace)/design/ |
| BE | apps/api/src/modules/05-ai-design/ |
| API route | apps/api/src/app/api/v1/design/ |
| Contracts | packages/contracts/src/05-ai-design/ |
| Model tương lai | packages/database/prisma/models/05-ai-design.prisma — chưa tạo |
| E2E/fixture | tests/e2e/05-ai-design/ và tests/fixtures/05-ai-design/ |

Các file chung và nguyên tắc public interface xem [MODULE_MAP](../MODULE_MAP.md), [ARCHITECTURE](../ARCHITECTURE.md), [API_CONTRACTS](../API_CONTRACTS.md). Tham chiếu Qxx trong hồ sơ này nằm ở [OPEN_QUESTIONS](../decisions/OPEN_QUESTIONS.md).


## Giai đoạn 2 — UC06

Designer tạo bản nháp phối cảnh 3D LED theo ảnh hiện trạng, kiểu dáng/loại LED, kích thước/vị trí lắp và prompt; hoặc tạo ảnh/banner theo kích thước/tỷ lệ. Kết quả AI là nháp để Designer xem, chỉnh prompt/tạo lại hoặc tải về chỉnh thủ công, lưu bản hoàn thiện vào thư viện và tải file.

UC06 yêu cầu lưu đầu vào cùng ấn phẩm, thời gian xử lý và token/chi phí theo lượt. Hình sequence còn có kiểm tra hạn mức người dùng/dự án; giá trị/quy tắc quota chưa chốt, không tự áp số cố định. Prompt thiếu, ảnh không hợp lệ, provider lỗi/quá thời gian hoặc download lỗi phải được thông báo đúng; không lưu nháp giả hay đánh completed khi thất bại.

BPMN thể hiện Sales tạo ticket từ Lead, gửi Designer và nhận kết quả; UC06 lại mô tả Designer tự tạo. Đây là hai entry point cần thống nhất tại Q14, không tự thêm portal khách hàng hoặc cấp Sales quyền gọi AI thiết kế. Lane khách hàng trong BPMN là trao đổi bên ngoài ứng dụng.

Video ngắn có trong roadmap/BFD/enum ERD nhưng chưa có UC06 chi tiết; coi là hướng nghiên cứu/phạm vi cần giao riêng, không cam kết render MP4 hoặc file mô hình 3D chỉnh sửa được. Preview phối cảnh là sản phẩm hình ảnh theo đặc tả hiện có.

## Quyền và danh mục

Giữ matrix BA: Designer và Admin được dùng AI thiết kế; các vai trò khác không tự có quyền này. Quyền xem file/Lead theo hàng tương ứng và chú thích Designer 3D/2D; không tự thu hẹp/thêm điều kiện ngoài BA.

Danh mục LED dùng chung M01; khảo sát đúng hình dạng và cách ghép thực tế. Không đóng cứng vài preset thay cho danh mục. Dữ liệu khách không được gửi AI theo ghi chú DFD; chỉ ảnh/tham số/prompt cần cho tác vụ sau khi xử lý thông tin nhận dạng, không gửi raw Lead/contact hoặc ảnh có PII chưa xử lý.

## Dữ liệu, file và public contract

ERD có design_requests với Lead, Sales yêu cầu, Designer, loại yêu cầu, thông số, trạng thái, link nháp/hoàn thiện và thời gian. Chưa đủ thư viện/phiên bản/prompt/usage/quota theo UC06. lead_id và các actor đang NN, cần chốt trường hợp banner độc lập.

M05 đọc dữ liệu Lead/tệp được phép qua M01 public contract, quản lý yêu cầu/asset của mình; màn hình Lead lấy kết quả qua composition/public read. M04 đọc thống kê M05 khi giai đoạn 2. Không import service/repository qua lại tạo vòng.

Tác vụ dài dùng worker cùng codebase khi được triển khai; status/asset lưu bền để reload vẫn còn. Provider credential chỉ server-side. File dùng private storage, quyền tải thống nhất; lưu hoàn thiện không đồng nghĩa chỉ sửa một URL tạm do provider trả.

## Tiêu chí nghiệm thu khi triển khai

- Đúng quyền BA; prompt/ảnh/tham số không hợp lệ không gọi provider.
- Lỗi/timeout/quota được chốt xử lý đúng, không completed giả; request lặp không gây tác vụ tính phí ngoài dự kiến.
- Nháp/hoàn thiện/thư viện/version/download và dữ liệu đầu vào được lưu theo use case đã chốt; refresh không mất lịch sử.
- Token/chi phí/thời gian thực dùng cho M04; không có dữ liệu thì báo thiếu nguồn, không tự tính bịa.
- Không gửi thông tin khách sang AI; UI dùng tiếng Việt, không hiện .env/API key/tên model.

## Điểm còn mở

Q06/Q10/Q13/Q14/Q15: file, video, thư viện/model, entry point/ticket/Lead, quota và metric AI. Giai đoạn 2 không có nghĩa đã được triển khai.
