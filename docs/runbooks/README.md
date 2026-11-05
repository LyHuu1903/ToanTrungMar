# Hướng dẫn vận hành — chưa cấu hình môi trường

Gói tài liệu chưa deploy, kết nối DB/storage/provider hoặc diễn tập backup/restore. Không có credential/URL môi trường thật trong runbook này.

Khi hạ tầng được chốt, tạo runbook theo thao tác thực: triển khai/forward-fix; migration; backup và restore DB + asset; xử lý webhook/sync/job lỗi; thu hồi phiên/khóa tài khoản; provider credential rotation. Chỉ ghi lệnh/config đã tồn tại và đúng môi trường.

Mỗi runbook cần mục tiêu, môi trường đích, quyền cần thiết, điều kiện trước, thao tác có kiểm tra, điểm dừng, cách xác nhận và phương án khôi phục. Không dùng production để thử reset/restore và không in secret.

Phải ghi bằng chứng: thời điểm, phiên bản ứng dụng/schema, dữ liệu kiểm tra, kết quả, giới hạn và người thực hiện. RPO/RTO/retention/host chưa chốt tại Q15; không dùng ví dụ trong tài liệu cũ như chính sách doanh nghiệp đã duyệt.

Tham chiếu [DATA_SAFETY](../DATA_SAFETY.md), [COMMANDS](../COMMANDS.md) và [OPEN_QUESTIONS](../decisions/OPEN_QUESTIONS.md).
