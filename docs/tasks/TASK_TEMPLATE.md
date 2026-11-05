# Giao task hẹp, có tiêu chí

Không bắt người dùng điền lại nếu hội thoại đã đủ. AI có thể lập task từ yêu cầu hiện tại, nêu ngắn kết quả/phạm vi/kiểm tra rồi tiếp tục phần được giao rõ.

## Task máy đọc được

Mỗi nhóm có `docs/tasks/m01/`…`m05/TASK.example.json`. Copy mẫu đúng nhóm thành `task.local.json` để làm cục bộ hoặc `<ID>.json` để đưa vào PR. Mẫu để `template`; chỉ chuyển `ready` khi có nhiệm vụ thực tế.

| Trường | Ý nghĩa |
| --- | --- |
| schemaVersion | 1 |
| id / title / goal | ID, kết quả cụ thể, mục tiêu được giao |
| status | template / ready / blocked / completed |
| modules | Tên module đầy đủ; chỉ liệt kê module thực sự được giao |
| acceptanceCriteria | Mảng tiêu chí quan sát được; ready/completed cần ít nhất một mục |
| allowedSharedPaths | Mặc định rỗng; file/phần chung bắt buộc, ưu tiên file cụ thể |
| readWhenNeeded | Tài liệu .md chỉ mở khi liên quan task |
| notes | Nguồn BA/mục liên quan, lý do chạm chung, giới hạn Git nếu cần |

Đường dẫn tương đối root, không wildcard hoặc `..`. Đuôi `/` cho phép thư mục; không mở toàn repo/apps/docs. Không dùng phần dùng chung để sửa module khác; task liên module ghi rõ `modules`. Không có ACTIVE_TASK chung cho cả 5 nhóm.

```bash
npm run context:task -- --task docs/tasks/m01/task.local.json --out .ai-context/task.md
npm run check:scope -- --task docs/tasks/m01/task.local.json
```

Lệnh scope thứ hai cần Git. Task `.local.json` bị ignore; file task đã review dùng cho PR/policy-ref phải được lưu trong Git theo quy trình nhóm. Xem [SCOPE_CHECK](../SCOPE_CHECK.md) và [AI_HANDOFF](../AI_HANDOFF.md).

## Bổ sung mô tả khi task phức tạp

| Mục | Nội dung |
| --- | --- |
| Chế độ | Tư vấn / tài liệu / triển khai / sửa lỗi / review |
| Owner / reviewer | Theo phân công thực tế, không tự đoán |
| Nguồn BA | UC/DFD/matrix/feedback và mục cụ thể |
| Phụ thuộc | Contract/schema/provider/môi trường; phần vẫn làm độc lập |
| Kiểm tra | Input → output; quyền; nhánh lỗi; dữ liệu có ghi dở không |
| Phạm vi Git | Sửa cục bộ / commit / push / PR / deploy theo việc được giao |
| Chuyển đổi | Khi có dữ liệu/phát hành: chuyển đổi, xác minh, khôi phục |

## Bàn giao kết quả

Ghi file/contract thay đổi và lý do, phần chung ảnh hưởng, lệnh thực chạy/kết quả/giới hạn, blocker và bước tiếp theo. Cập nhật handoff ngắn đúng module; chi tiết/lịch sử ở task hoặc PR. Không ghi PASS cho phần chưa chạy.

Ví dụ việc hẹp: “M01 chuyển Lead thiếu lý do phải bị API từ chối; chỉ sửa schema/route/policy/use case/test cần thiết. Giữ quyền BA và module khác. Chứng minh lỗi không ghi dở; chuyển hợp lệ giữ Pipeline và lưu lịch sử. Chỉ sửa cục bộ.”
