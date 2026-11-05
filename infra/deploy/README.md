# Hạ tầng triển khai

Chưa chọn host hoặc tạo môi trường trong gói này. Cấu hình sẽ theo host thực, không sao chép một deploy config từ dự án cũ hay tự mở dịch vụ cloud.

Cần phân biệt liveness, DB readiness, storage sẵn sàng, cấu hình provider đủ và tích hợp provider đã xác minh. Secret server/worker quản lý ngoài source; credential runtime, migration và backup tách theo nhu cầu.

Trước dữ liệu thật: kiểm tra quyền BA trên API/file/export, schema migration, storage bền, job/sync và kế hoạch restore có bằng chứng. Hướng dẫn thao tác tại [runbooks](../../docs/runbooks/README.md); giá trị RPO/RTO/retention và ngân sách cần chốt theo workload.

Không có URL production hay tuyên bố deploy thành công từ file tài liệu này.
