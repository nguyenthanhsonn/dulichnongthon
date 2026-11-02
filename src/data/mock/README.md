# Dữ liệu mock Du lịch Nông thôn 2026

## Nguồn và phạm vi

35 hồ sơ từ [Phụ lục 02, ngày 27/10/2026](https://docs.google.com/document/d/11gw7XpG78qNzzGM5q1OIpAfIGvjsn6j2/edit), đọc qua Google Drive. Dữ liệu đã được nối vào bảng xếp hạng premium qua getRanking() và vào luồng bình chọn hiện có qua lớp tương thích src/data/destinations.ts. Trang chi tiết và các selectors ngoài getRanking() vẫn thuộc phần việc tiếp theo.

- `types.ts`: schema strict, `needsReview`, `reviewNote`, `relatedTo` và `sourceDetails` để lưu phần “Nét khác biệt” nguyên gốc.
- `destinations.ts`: nguồn chính 35 hồ sơ, mã `NT-01`…`NT-35`, tên tỉnh theo hồ sơ. Các mô tả tóm tắt và highlights được biên tập từ hồ sơ; bốn trường `ratings` giữ nguyên nội dung đánh giá.
- `regions.ts`: 3 vùng; STT 1–17 Bắc, 18–25 và 35 Trung, 26–34 Nam (17/9/9).
- `votes.ts`: dữ liệu giả lập tách riêng; seed cố định 2026, long-tail, top 3 cao rõ rệt. Phân bổ phần dư theo phương pháp phần dư lớn nhất để tổng chính xác **377.230**. Không dùng Math.random, Date.now hoặc dữ liệu thay đổi giữa SSR và CSR.
- `contest.ts`: cấu hình lịch đang có trong dự án (không suy ra từ phụ lục), hạn mức, tên key storage và thống kê tính từ data. `contestStats` chỉ phản ánh baseline mock, chưa gồm phiếu local.
- `index.ts`: export tập trung và getRanking(records?): hợp nhất phiếu runtime với baseline, sắp xếp giảm dần và phá hòa theo id. Không làm thay đổi dữ liệu gốc.
- `image-todo.md`: toàn bộ 35 ảnh cần bổ sung. Chưa có ảnh đúng địa danh được xác minh trong repo nên `image.src` để chuỗi rỗng; UI dùng DestinationImage fallback theo vùng. Không trỏ tới file local không tồn tại, không tái sử dụng ảnh Unsplash ngẫu nhiên.

## Schema và quy tắc số liệu

`Destination.stats` chỉ chứa số liệu được nêu trong hồ sơ. Trường không có hoặc không thể biểu diễn chính xác bằng schema số thì bỏ qua, không điền 0. Doanh thu/thu nhập giữ đơn vị bằng chuỗi. Số liệu khoảng, hơn, dải số, tổng nhiều năm và phạm vi cộng đồng liên kết được lưu trong `sourceDetails`.

Ví dụ: NT-10 có “trên 12.000 lượt” nên không gán `visitors9m2026 = 12000`; NT-24 có 5–7 hộ nên không gán một số hộ duy nhất; NT-29 có lượng khách tổng 7 năm nên không gán vào khách 2025. NT-05 có khoảng 60 lao động, NT-18 có 8 hộ chỉ của Hoa Tiến: đọc cùng ghi chú nguồn, không xem là số liệu chính xác cho toàn vùng. `ratings` là nội dung nguyên gốc và có thể còn lỗi chính tả nguồn.

## Data quality notes

1. Mã gốc `DLNT2026-21` và `DLNT2026-35` chuẩn hóa thành `DLNT2026-021`, `DLNT2026-035`.
2. NT-07 Thái Hải: “Chủ thể” chép từ NT-02 Nà Tông. Không gán operator, gắn needsReview và reviewNote. Không suy đoán đơn vị vận hành thay thế.
3. NT-01 dùng tên “Bản Khun” thống nhất, kể cả tên hiển thị chủ thể. “bản Kun” còn trong sourceDetails để đối soát.
4. NT-08: giữ tourismHouseholds=12 và tourismWorkers=315 theo phần số liệu; đánh giá cộng đồng gốc vẫn ghi hơn 15 hộ homestay. needsReview=true; không sửa số cho khớp.
5. NT-30 Thủy Tuyết: giữ tourismWorkers=12 theo phần số liệu; ratings.community vẫn giữ khoảng 120. needsReview=true.
6. NT-18 và NT-35: giữ hai hồ sơ riêng, relatedTo liên kết hai chiều. 8 hộ NT-18 chỉ thuộc Hoa Tiến; không cộng trùng số liệu Sen Quê Bác. NT-35 có số liệu riêng như nguồn.
7. NT-10 Long Cốc: giữ doanh thu 2.000 triệu đồng theo mốc 9/2026; cần kiểm tra cùng trên 12.000 lượt khách. needsReview=true.
8. Province dùng tên tỉnh/thành theo hồ sơ sau sáp nhập; Lào Cai thay Yên Bái cũ. NT-25 Trạm Hành – Đà Lạt thuộc Lâm Đồng theo phân vùng yêu cầu. Giữ địa chỉ hồ sơ nguyên gốc để truy nguyên, chưa tự sửa các cấp hành chính trong địa chỉ (ví dụ nguồn ghi “thành phố Bắc Ninh/Quảng Ninh” hoặc “thị xã Tịnh Biên”); cần đối soát trước khi xuất bản địa chỉ lên UI.
9. NT-12: 25 hộ tại bản và 155 hộ liên kết ngoài bản là hai phạm vi khác nhau, không phải phép cộng. sourceDetails nêu rõ. NT-21 có 23 hộ cộng đồng nhưng 24 hộ tham gia du lịch; gắn needsReview.
10. NT-35 không có đủ bốn tiêu chí đánh giá. Chỉ ánh xạ Sản phẩm và Cộng đồng cung cấp dịch vụ vào product/community; sustainability và promotion để chuỗi rỗng, không viết thêm nhận định thay nguồn. Các lớp UI sau này cần hiển thị “Chưa có thông tin” cho chuỗi rỗng.
11. fullName là tên hồ sơ gốc (kể cả chú thích nộp lại ở NT-02), name là tên ngắn để hiển thị. Các nhãn giải thưởng, OCOP và mốc thời gian trong hồ sơ chỉ được trích lại, chưa kiểm chứng độc lập.

## Thay bằng API thật

Giữ Destination/VoteRecord làm hợp đồng dữ liệu. API trả danh sách hồ sơ và số phiếu từ backend; kiểm tra schema, id duy nhất, liên kết phiếu và region trước khi trả cho selectors. Thay createMockVotes bằng GET số phiếu server. Thời hạn, quyền bình chọn, chống trùng và giới hạn 3 lượt phải được backend xác thực; localStorage chỉ lưu trạng thái trải nghiệm, không làm cơ sở kết quả chính thức. Không lưu mật khẩu hoặc OTP trong localStorage.

Ảnh thật được đặt trong `public/images/destinations/NT-XX.jpg`, kiểm tra địa danh/quyền sử dụng, cập nhật image.src thành `/images/destinations/NT-XX.jpg` và credit. Trước khi có ảnh, bước UI phải dùng DestinationImage fallback theo vùng.
