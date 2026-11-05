# Kiểm thử dự án

Đã có tests/tooling/ dùng node:test cho công cụ scope/context/link; chạy npm run test:tooling. Git chỉ được khởi tạo trong thư mục tạm của test, không chạm repo hoặc dữ liệu doanh nghiệp. Chưa có test suite ứng dụng/nghiệp vụ. [QUALITY](../docs/QUALITY.md) là nguồn tiêu chí chung; từng hồ sơ [module](../docs/README.md) có ca nghiệm thu liên quan.

Unit/API integration đặt cạnh logic module/core khi cần. E2E đặt tests/e2e/auth/ và tests/e2e/<module>/ theo 5 tên chuẩn; ca liên module có thư mục riêng khi có thật. Fixture/factory dùng dữ liệu tổng hợp tại tests/fixtures/<module>/ hoặc cạnh test, tránh sao chép dữ liệu khách từ ảnh mẫu.

Kiểm tra hành vi/nhánh lỗi, không chỉ file tồn tại hay test lặp implementation. DB transaction test dùng DB riêng phù hợp provider đích; provider mock ở adapter, sandbox/live là bước kiểm tra khác có quyền tương ứng. Không gọi API tính phí hoặc reset DB thật trong CI mặc định.

Khi test đã chạy, ghi command/môi trường/kết quả và phần chưa kiểm tra tại task, PR và [COMMANDS](../docs/COMMANDS.md). Bộ tài liệu kiểm tra link/nguồn không chứng minh API hoặc E2E đã pass.
