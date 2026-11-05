# Database dùng chung

Đọc [ERD gốc](../sources/assets/ba-erd.pdf), [từ điển](DATA_DICTIONARY.md), [ownership](TABLE_OWNERSHIP.md) và [độ bao phủ](ERD_COVERAGE.md). Đây là tài liệu hiện trạng ERD, chưa có schema/migration hoặc kết nối DB được tạo.

## Vị trí đích

Prisma đặt tại packages/database. Với major hỗ trợ schema nhiều file và layout đã chốt: main schema ở prisma/schema.prisma; model tại prisma/models/; migrations cùng cấp trong prisma/migrations/. Config phải đọc đúng cả nguồn model; client/transaction utility thuộc src/. Tên file/config/cách khai báo datasource phải theo major thực tế, không trộn hướng dẫn nhiều major.

Model tương lai: core.prisma, 01-leads.prisma, 02-tracking-sync.prisma, 03-keywords-ads.prisma, 04-reports.prisma, 05-ai-design.prisma khi có model cần tạo. M04 ưu tiên đọc, chưa tạo bảng báo cáo chỉ để đủ file. Gói tài liệu không tạo các file .prisma rỗng.

Một DB, một migration history, một người điều phối hợp nhất schema. Owner module quản lý nghiệp vụ/bảng của mình; không tách 5 DB hay 5 migrations độc lập. FE không import package DB; các repository backend dùng theo quyền/task.

## Provider và giới hạn hiện tại

ERD dùng int unsigned, tinyint(1), datetime và enum kiểu MySQL; blueprint cũ đề xuất PostgreSQL. Chưa có quyết định provider/major production được người dùng chốt trong bộ này. Không tự chuyển kiểu hoặc provider bằng cách đổi URL. Đây là [Q01](../decisions/OPEN_QUESTIONS.md#q01).

ERD có nhiều trường FK mang tên user nhưng một số không có đường vẽ trong bản PDF. Khi triển khai phải đối chiếu DBML/schema đầy đủ và chốt ràng buộc, không suy “không có FK” từ ảnh gọn. Không sửa migration đã áp dụng hoặc chạy lệnh phá dữ liệu.

Đối chiếu validation BA mới với NN/enum/quan hệ ERD trước khi generate model. Các điểm thiếu được ghi rõ, chưa tự bổ sung DDL. An toàn dữ liệu, file và phục hồi theo [DATA_SAFETY](../DATA_SAFETY.md).
