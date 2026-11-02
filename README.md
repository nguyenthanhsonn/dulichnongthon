<p align="center">
  <img src="public/logo.png" alt="Logo Du Lịch Nông Thôn" width="160" height="160" style="border-radius: 50%; box-shadow: 0 10px 25px rgba(31, 107, 69, 0.2);" />
</p>

<h1 align="center">CUỘC THI DU LỊCH NÔNG THÔN 2026</h1>

<p align="center">
  <strong>Cổng Thông Tin Bình Chọn Trực Tuyến & Tôn Vinh 35 Điểm Đến Du Lịch Nông Nghiệp, Làng Nghề Sinh Thái Việt Nam</strong>
</p>

<p align="center">
  <a href="#-tính-năng-nổi-bật">Tính Năng</a> •
  <a href="#-hệ-thống-thiết-kế--bảng-màu">Hệ Thống Thiết Kế</a> •
  <a href="#-công-nghệ-sử-dụng">Công Nghệ</a> •
  <a href="#-hướng-dẫn-cài-đặt">Cài Đặt</a> •
  <a href="#-thể-lệ-bình-chọn">Thể Lệ</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Status-Completed-1F6B45?style=for-the-badge" alt="Status" />
</p>

---

## 📖 Giới Thiệu Dự Án

**Cuộc thi Du lịch Nông thôn 2026** là nền tảng bình chọn trực tuyến cấp quốc gia, hướng đến mục tiêu quảng bá, bảo tồn và tôn vinh 35 điểm đến du lịch sinh thái, làng nghề truyền thống và các mô hình nông nghiệp xanh trải dài khắp dải đất hình chữ S.

Hệ thống được phát triển với triết lý thiết kế hiện đại, giao diện mờ kính sang trọng (**Glassmorphism**), hiệu ứng chuyển cảnh tự nhiên và bộ nhận diện đậm chất đồng quê Việt Nam.

---

## ✨ Tính Năng Nổi Bật

### 1. Giao diện & Trải nghiệm Người dùng (UI/UX)
- **Glassmorphism Floating Navbar**: Thanh điều hướng dạng viên thuốc bo tròn với hiệu ứng kính mờ `backdrop-blur-2xl`, độ tương phản cao, tối ưu hiển thị trên mọi nền ảnh.
- **Hero Video**: Video phong cảnh nông thôn Việt Nam với nút phát/tạm dừng, ảnh dự phòng và hỗ trợ giảm chuyển động. Nguồn video được cấu hình trong `src/lib/media.ts`.
- **Live Countdown Timer**: Đồng hồ đếm ngược thời gian kết thúc bình chọn (Ngày : Giờ : Phút : Giây) hiển thị song hành cùng nút hành động chính.
- **Cuộn trang tương tác mượt mà**:
  - Thanh tiến trình cuộn trang siêu mượt (Scroll Progress Bar) ở mép trên màn hình.
  - Nút trượt nhanh về đầu trang (Back to Top) mờ kính.
  - Hiệu ứng xuất hiện mềm mại (Reveal on Scroll) theo từng phân đoạn nội dung.

### 2. Danh mục 35 Điểm đến & Phân trang Thông minh
- **Bộ lọc đa chiều**: Lọc nhanh theo 3 vùng miền (**Miền Bắc**, **Miền Trung**, **Miền Nam**) kết hợp thanh tìm kiếm thời gian thực theo tên địa danh, tỉnh thành.
- **Sắp xếp linh hoạt**: Tùy chọn sắp xếp theo mức độ bình chọn cao nhất hoặc theo mã định danh (NT-01 đến NT-35).
- **Phân trang tối ưu (Pagination)**: Chia đều 8 thẻ/trang kèm điều hướng trang trực quan, tự động cuộn lên đầu danh mục khi chuyển trang.

### 3. Quy trình Bình chọn Step-by-Step sinh động
- **AOS**: Hiệu ứng cuộn xuất hiện một lần, tôn trọng tùy chọn `prefers-reduced-motion`.
- Khu vực **Cách thức bình chọn** kích hoạt hiệu ứng tự động theo từng bước khi cuộn tới (`IntersectionObserver`):
  - **Bước 01**: Đăng nhập bằng số điện thoại (OTP 6 chữ số).
  - **Bước 02**: Chọn tối đa 3 điểm đến đề cử yêu thích.
  - **Bước 03**: Xác nhận bình chọn và ghi nhận trực tiếp vào bảng tổng sắp.
- Đường line tiến trình chuyển màu động kết nối xuyên suốt 3 bước.

### 4. Bảng Xếp Hạng & Quản Lý Bình Chọn (State Management)
- **Top 3 Leaderboard**: Tôn vinh 3 vị trí dẫn đầu toàn quốc với hiệu ứng huy chương vàng, bạc, đồng; Top 1 ở giữa và cao hơn trên desktop; vàng, bạc và đồng phân biệt từng thứ hạng. Trên điện thoại hiển thị theo thứ tự 1–2–3.
- **Hệ thống Modal Glassmorphism**:
  - Modal đăng nhập SĐT & mã OTP với đồng hồ đếm ngược gửi lại mã.
  - Modal xác nhận bình chọn trước khi hoàn tất.
  - Modal Bảng xếp hạng chi tiết toàn bộ 35 điểm đến theo thời gian thực.
  - Modal Thể lệ cuộc thi minh bạch, chuẩn mực.
- **Lưu trữ trạng thái phía Client (LocalStorage)**: Giữ phiên đăng nhập, quản lý hạn mức 3 lượt vote/tài khoản, ngăn chặn bình chọn trùng lặp một điểm đến.

---

## 🎨 Hệ Thống Thiết Kế & Bảng Màu

Bảng màu được lấy cảm hứng từ thiên nhiên nông thôn, đồng ruộng và sông nước Việt Nam:

| Vai trò | Tên màu | Mã màu (HEX) | Minh họa | Ứng dụng thực tế |
| :--- | :--- | :---: | :---: | :--- |
| **Chủ đạo** | Xanh lá đậm | `#1F6B45` | `■` | Logo, tiêu đề chính, nút nhấn phụ, huy hiệu nhận diện |
| **Phụ** | Xanh lá tươi | `#7CB342` | `■` | Tag danh mục, bước 2 quy trình, điểm nhấn tươi sáng |
| **Nhấn** | Cam vàng | `#F5A623` | `■` | Nút **Bình chọn ngay**, Rank 1 Leaderboard, bước 3 hoàn tất |
| **Điểm nhấn nhỏ** | Xanh dương | `#5BB5E8` | `■` | Chỉ số minh bạch, màu sắc biểu trưng cho sông nước |
| **Nền** | Kem nhạt | `#FBF8F0` | `■` | Màu nền toàn bộ website, tạo cảm giác dịu nhẹ, sang trọng |
| **Chữ** | Xanh đen | `#1B2B22` | `■` | Tiêu đề và nội dung văn bản đạt độ tương phản chuẩn WCAG |

- **Phông chữ**: `Manrope` cho nội dung và `Lora` cho tiêu đề (Google Fonts) – hiển thị dấu tiếng Việt sắc nét, hiện đại, kích thước tối thiểu từ 16px.

---

## 🛠️ Công Nghệ Sử Dụng

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server-Ready Architecture)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Ngôn ngữ**: TypeScript 5 (Strict Mode)
- **Tối ưu hình ảnh**: Next.js Image Optimization với CDN Unsplash chuyên dụng

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản 18.18 trở lên (khuyến nghị Node.js 20+ hoặc 22 LTS)
- **Trình quản lý gói**: `npm`, `pnpm` hoặc `yarn`

### 2. Cài đặt dependencies
```bash
npm install
# hoặc nếu dùng pnpm
pnpm install
```

### 3. Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt để trải nghiệm website.

### 4. Kiểm tra mã nguồn (Code Quality)
```bash
npm run lint
```

### 5. Đóng gói triển khai sản phẩm (Production Build)
```bash
npm run build
npm run start
```

---

## 📋 Thể Lệ Bình Chọn Tóm Tắt

1. **Đối tượng tham gia**: Mọi công dân Việt Nam và bạn bè quốc tế quan tâm đến du lịch nông thôn.
2. **Quy định lượt vote**:
   - Mỗi số điện thoại xác thực qua OTP được cấp tối đa **03 lượt bình chọn**.
   - Mỗi điểm đến chỉ được bình chọn **01 lần duy nhất** (không bình chọn trùng lặp).
3. **Tính minh bạch**: Kết quả được đối soát và cập nhật công khai tức thì trên Bảng xếp hạng trực tuyến.

---

<p align="center">
  <sub>© 2026 Cuộc thi Du lịch Nông thôn Việt Nam. Phát triển vì sự phát triển bền vững của cộng đồng nông thôn.</sub>
</p>

## Giao diện cập nhật

- Nền xanh dịu `#EAF1E5`, xanh lá sáng `#B8E486` cho nút bình chọn; header kính nền xanh trong suốt.
- Thống kê lấy số điểm đến và tổng lượt bình chọn trực tiếp từ Voting Context.
- Video minh họa: [Hữu Thịnh 79 / Pexels](https://www.pexels.com/video/stunning-aerial-view-of-central-vietnam-rice-fields-31460029/), phong cảnh đồng lúa miền Trung. Có thể thay bằng phim chính thức tại `src/lib/media.ts`.
- `postcss.config.mjs` dùng plugin `@tailwindcss/postcss` để biên dịch Tailwind trong cả development và production Webpack.

## Nền và chuyển động

`PageBackground` tạo mesh mint/sage/sky, blob chuyển động bằng transform, SVG đường ruộng và grain nhẹ; không thêm thư viện. `SectionDivider` chia các section bằng sóng. Hero giữ video đang có, thêm dot grid và gradient chuyển về màu nền mới. Card top 1 dùng IntersectionObserver để chạy hiệu ứng nổi lên một lần khi vào màn hình; top 2 và 3 không có hiệu ứng scroll. `prefers-reduced-motion` tắt blob và hiệu ứng card.

Các file cho đợt nền/chuyển động: `src/components/page-background.tsx`, `src/components/section-divider.tsx` (mới); `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/top3.tsx`, `src/components/footer.tsx` (sửa). Thiết kế thể lệ và menu ở `src/components/rules-modal.tsx`, `src/components/navbar.tsx`.

Bộ dữ liệu Phụ lục 02 đã hoàn tất **bước 1: types + data** trong `src/data/mock/`: `types.ts`, `destinations.ts`, `votes.ts`, `regions.ts`, `contest.ts`, `index.ts`, `README.md`, `image-todo.md`. Bản motion premium sau đó đã nối getRanking() và lớp tương thích của luồng bình chọn vào nguồn mock. Xem ghi chú chất lượng và nguồn trong `src/data/mock/README.md`.

## Top 3 — motion premium

- TopRankCard dùng chung RANK_THEME cho vàng kim loại, bạc và đồng. Viền gradient, lớp glow opacity, shine và SVG sparkle/confetti cấu hình cố định; không thêm thư viện.
- useInView quan sát phần giới thiệu section với threshold 0.35 (vẫn kích hoạt được trên màn hình thấp dù cả section cao hơn viewport), ngừng quan sát sau lần đầu. Desktop: top 1 xuất hiện ở 200ms/900ms, shine và burst ở 900ms; top 2 ở 1300ms/700ms, top 3 ở 1500ms/700ms. Count-up top 1 bắt đầu 1000ms, top 2–3 ở 2200ms, chạy easeOutExpo trong 1600ms. Mobile: reveal dọc ở 200/400/600ms.
- Trước trigger, giữ chiều cao card nhưng ẩn nội dung và vô hiệu hóa tương tác. Kết thúc entry thì bỏ will-change và cố định trạng thái cuối để resize không chạy lại entry. Hover tilt tối đa ±4° chỉ trên pointer fine có hover. Giảm chuyển động: hiển thị ngay số cuối, không shine/sparkle/count-up.
- Dữ liệu top 3 từ getRanking() của src/data/mock; phiếu runtime được hợp nhất từ Voting Context. Lớp tương thích src/data/destinations.ts giúp danh sách, thống kê và modal cùng dùng 35 hồ sơ mới. Ảnh chưa xác minh dùng gradient fallback, không dùng ảnh sai địa danh. Đọc storage sau hydration để tránh SSR/CSR khác nhau.
- File mới: src/hooks/useInView.ts, src/hooks/useCountUp.ts, src/hooks/useReducedMotion.ts, src/components/top-rank-card.tsx, src/components/destination-image.tsx. File sửa: src/hooks/useMediaQuery.ts, src/components/top3.tsx, src/app/globals.css, src/data/mock/index.ts, src/data/destinations.ts, src/context/voting-context.tsx, src/components/destination-card.tsx, src/components/leaderboard-modal.tsx, src/components/vote-modal.tsx, src/components/stats-grid.tsx; cùng README dự án và README mock.
