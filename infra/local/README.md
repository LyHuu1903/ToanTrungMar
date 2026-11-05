# Môi trường local/dev/test

Vị trí đích cho cấu hình môi trường được chọn; chưa có Docker/compose, DB/bucket hoặc credential được thiết lập. Không yêu cầu nhóm cài công cụ mới chỉ để khớp cây thư mục.

Khi triển khai: chốt runtime/provider/major, biến môi trường mẫu không có giá trị bí mật, cách chạy từng workspace, DB test riêng và nguồn dữ liệu tổng hợp. Giữ dữ liệu thật tách dev/test; không seed mặc định vào production.

Ghi command thật tại [COMMANDS](../../docs/COMMANDS.md), quyết định tại [ADR](../../docs/decisions/README.md), an toàn tại [DATA_SAFETY](../../docs/DATA_SAFETY.md).
