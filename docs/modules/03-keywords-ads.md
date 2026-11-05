# 03-keywords-ads — Ads, từ khóa và SEO

**Nhóm 3 — phụ trách: Nguyễn Anh Quân.** Branch: `feature/ads-keywords`. Trạng thái: **CHƯA TRIỂN KHAI trong gói tài liệu**. Nguồn nghiệp vụ: [BA](../sources/README.md#s04), [ma trận quyền](../PERMISSIONS.md); mục bên dưới tóm tắt nghiệp vụ, không thay nguồn BA.

## Vùng phát triển của nhóm

| Lớp | Đường dẫn |
| --- | --- |
| FE | apps/web/src/modules/03-keywords-ads/ |
| FE route | apps/web/src/app/(workspace)/ads/ |
| BE | apps/api/src/modules/03-keywords-ads/ |
| API route | apps/api/src/app/api/v1/ads/ |
| Contracts | packages/contracts/src/03-keywords-ads/ |
| Model tương lai | packages/database/prisma/models/03-keywords-ads.prisma — chưa tạo |
| E2E/fixture | tests/e2e/03-keywords-ads/ và tests/fixtures/03-keywords-ads/ |

Các file chung và nguyên tắc public interface xem [MODULE_MAP](../MODULE_MAP.md), [ARCHITECTURE](../ARCHITECTURE.md), [API_CONTRACTS](../API_CONTRACTS.md). Tham chiếu Qxx trong hồ sơ này nằm ở [OPEN_QUESTIONS](../decisions/OPEN_QUESTIONS.md).


## Nghiệp vụ theo BFD, bảng nhóm và roadmap

Phân tích Campaign/Keyword, CPC, click, impression, CTR, chi phí và conversion; đối chiếu Lead/kết quả Sales; gợi ý từ khóa theo Google Ads/Search Console/Google Trends. Hỗ trợ theo dõi CPC/ngân sách và chủ đề Content SEO. Chưa giao tự cập nhật chiến dịch/ngân sách trên tài khoản Ads thật.

DFD 5.0 có nội dung SEO tích hợp AI: bài cũ từ website, yêu cầu đề tài/duyệt bài từ Marketing, số liệu keyword/traffic, gợi ý đề tài/outline/bản nháp, D4 bài viết/từ khóa và D5 nhật ký AI. Đề xuất giao phần này cho M03 để khớp BFD/tên module; không đưa vào M05 chỉ vì DFD đánh số 5.0. Tab M03 hiện chưa có use case chi tiết.

Roadmap M03 thuộc giai đoạn 2; DFD 5.0 chưa đánh mốc riêng. Chốt lịch nhiệm vụ SEO tại Q10, chưa tự coi màu xanh là giai đoạn 1. Video/banner thuộc M05 theo task riêng.

## Quyền, dữ liệu và AI

Giữ các hàng AI Marketing/Tracking/Lead trong PERMISSIONS. Marketing và Ads đọc Lead ẩn danh theo UC01; M03 chỉ nhận dữ liệu được phép, không cần thông tin định danh khách để phân tích nguồn/hiệu quả. M03 không được đổi Pipeline hoặc nội dung Lead ngoài quyền UC03-4 của Ads được giao cho module liên quan.

DFD cấm SĐT/email/thông tin khách trong payload AI. Provider chỉ server-side; gửi nội dung SEO phù hợp, ghi thời gian/token/chi phí thực theo contract D5 khi được chốt. Không dùng dữ liệu demo hoặc tự bịa từ khóa/chỉ số để báo tích hợp live.

ERD chưa có bảng metric Ads/D4/D5. M02 nhập metric qua public contract M03 nếu owner đã thống nhất; M03 đọc chất lượng/trạng thái Lead qua M01 public; M04 đọc số liệu phân tích qua public read. Không import repository nội bộ hoặc tạo vòng M02↔M03.

## Chỉ số và contract cần chốt

Mỗi KPI cần nguồn, account/entity, kỳ ngày, grain, đơn vị/currency, công thức, cách xử lý mẫu số 0 và tiêu chí đối chiếu. Không cộng CTR/CPC/tỷ lệ theo trung bình tùy ý. Chỉ số conversion provider và Lead chốt là hai khái niệm cần định nghĩa riêng.

Hình liên kết/BPMN có doanh thu/ROI/duyệt ngân sách; feedback và ERD chưa đủ cho các mục này. Giữ Q08, chưa tự tính lợi nhuận từ chi phí và số Lead hoặc tạo quy trình duyệt mới.

## Tiêu chí nghiệm thu khi triển khai

- Chỉ số khớp fixture đối soát theo account/ngày/grain/đơn vị và nguồn đã cấu hình.
- Khuyến nghị có dữ liệu căn cứ và trạng thái nguồn; không tự sửa Ads thật.
- SEO input/duyệt/lưu phiên bản và lỗi AI có use case được chốt; không có thông tin khách trong provider request.
- Public read trả dữ liệu đúng scope/ẩn danh; D5 ghi usage có thật, không token/cost giả.

## Điểm còn mở

Q02/Q08/Q10/Q13/Q15: UC SEO/Ads chi tiết, công thức KPI, scope ROI/ngân sách, giai đoạn, model D3/D4/D5 và quota.
