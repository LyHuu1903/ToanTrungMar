# 02-tracking-sync — Tracking và đồng bộ đa kênh

**Nhóm 2 — phụ trách: Cát Cần Sỹ.** Branch: `feature/tracking-integration`. Trạng thái: **CHƯA TRIỂN KHAI trong gói tài liệu**. Nguồn nghiệp vụ: [BA](../sources/README.md#s04), [ma trận quyền](../PERMISSIONS.md); mục bên dưới tóm tắt nghiệp vụ, không thay nguồn BA.

## Vùng phát triển của nhóm

| Lớp | Đường dẫn |
| --- | --- |
| FE | apps/web/src/modules/02-tracking-sync/ |
| FE route | apps/web/src/app/(workspace)/tracking/ |
| BE | apps/api/src/modules/02-tracking-sync/ |
| API route | apps/api/src/app/api/v1/tracking/ |
| Contracts | packages/contracts/src/02-tracking-sync/ |
| Model tương lai | packages/database/prisma/models/02-tracking-sync.prisma — chưa tạo |
| E2E/fixture | tests/e2e/02-tracking-sync/ và tests/fixtures/02-tracking-sync/ |

Các file chung và nguyên tắc public interface xem [MODULE_MAP](../MODULE_MAP.md), [ARCHITECTURE](../ARCHITECTURE.md), [API_CONTRACTS](../API_CONTRACTS.md). Tham chiếu Qxx trong hồ sơ này nằm ở [OPEN_QUESTIONS](../decisions/OPEN_QUESTIONS.md).


## Nghiệp vụ và trạng thái đặc tả

Tracking và đồng bộ chạy song song: tracking ghi nguồn/UTM/campaign/landing/device/IP/vị trí nếu nguồn thực cung cấp; sync đưa dữ liệu Google Ads/GA4/Search Console về theo lịch. Không suy được mọi sự kiện trình duyệt chỉ từ một bảng Lead. Không bịa metadata hoặc dùng riêng IP để gán một khách.

DFD 3.0 đi vào D3; website gửi form vào tiến trình Lead kèm metadata. UC01 gọi UC03-1 bóc tracking và UC03-4 sửa Nguồn/Chiến dịch, nhưng tab M02 chưa có UC03 chi tiết. BFD/roadmap còn nhắc Fanpage khi có và bảng nhóm có nghiên cứu n8n; chưa mặc định cài n8n hoặc cấp dịch vụ mới.

UC01 mô tả website gửi SĐT/email tối thiểu, UTM, gclid nếu có, landing/device/IP. Hotline/Zalo do NVKD nhập tay. M02 không bắt buộc là cửa vào của mọi Lead nhập tay; lớp app có thể điều phối bóc nguồn rồi public ingest M01.

## Quyền

Áp nguyên PERMISSIONS cho chức năng Tracking. Riêng UC01/UC03-4, nhân viên Ads là người sửa Nguồn/Chiến dịch, không sửa các trường Lead khác; Marketing xem ẩn danh/chỉ xem. Cấu hình hệ thống/User vẫn theo hàng Admin của matrix, không tự biến mọi user Tracking thành quản trị provider.

## Dữ liệu và contract

marketing_tracking là bảng ERD hiện có: liên kết một-một Lead, UTM/campaign/landing/device/IP/location/sync status/time. Chưa thấy đầy đủ cost/metric Google, kết nối, lịch sync/checkpoint và lịch sử sửa nguồn. Schema tương lai do owner phối hợp, không thêm tên bảng giả trong tài liệu như đã tồn tại.

Cần contract website/event ID, xác thực nguồn, input/response lỗi, idempotency, actor hệ thống, mapping channel/source, lỗi dữ liệu và replay. M02 tạo/sửa Lead qua M01 public; metric phân tích thuộc M03 theo ownership được thống nhất. Checkpoint chỉ chốt sau ghi bền hoặc có replay an toàn.

Không nâng cấp giao diện ba website vì roadmap chỉ giao kết nối dữ liệu. Hiện mới có hai URL thương hiệu trong trao đổi; website thứ ba, account Google và quyền nguồn cần được cung cấp/chốt theo task.

## Tiêu chí nghiệm thu khi triển khai

- Có nguồn thật mới ghi metadata; thiếu nguồn thể hiện chưa xác định, không dữ liệu demo giả live.
- Event lặp/retry không nhân cùng sự kiện; lỗi validation có phản hồi và dấu lỗi an toàn theo UC01.
- Sync dừng/tiếp tục không mất hoặc nhân dữ liệu; lỗi provider/rate limit/credential được phân biệt đúng.
- Ads chỉ sửa hai trường được giao, có rule/history đã chốt; không thể patch contact/Pipeline bằng trường thừa.
- Fixture tổng hợp khác tích hợp sandbox/live; chưa cấu hình không báo thành công.

## Điểm còn mở

Q01/Q02/Q03/Q05/Q12/Q13: UC03, nguồn/website, định danh chống lặp, quy tắc chỉnh nguồn, lịch sync và độ bao phủ D3. Không gửi tracking chứa IP/contact sang AI.
