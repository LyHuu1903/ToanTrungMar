# Task mẫu — đặt tài liệu và tạo folder giữ chỗ

Đây là prompt bootstrap lịch sử. Phần đặt tài liệu và folder giữ chỗ đã hoàn thành trong bản bàn giao 05/11/2026; không chạy lại để ghi đè repo hiện tại. Nội dung AGENTS.md hiện tại là bản chuẩn, không chép rule từ prompt cũ lên đè.

```text
Đọc AGENTS.md tại root và docs/PROJECT.md, docs/MODULE_MAP.md.
Chỉ đặt bộ tài liệu bàn giao vào đúng đường dẫn và tạo folder giữ chỗ theo docs/ARCHITECTURE.md.
Giữ các module trống; tạo .gitkeep cho thư mục lá chưa có file khi được tạo khung.
Nếu tài liệu đã tồn tại, so sánh/merge phần được giao, giữ nội dung ngoài phạm vi và thay đổi của người khác.
Giữ nguyên ma trận quyền BA; không dùng ma trận đề xuất 4 vai trò cũ.
Không viết code nghiệp vụ, tạo schema/migration/seed, cài dependency, tạo dịch vụ hoặc gọi Google/AI.
Không cài skill/vendor giả và không tạo CI luôn xanh.
Không commit/push/merge/deploy trong task này.
Kiểm tra đủ 5 module, tài liệu/link/ownership và báo file đã tạo/giữ lại, rồi dừng.
```

Nếu được giao scaffold framework/auth thật sau này, lập task riêng với tiêu chí, provider/major và phạm vi Git rõ; không tự tiếp tục từ tài liệu sang triển khai ứng dụng.
