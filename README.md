# 🕶️ VisionX Pro — Kính Thông Minh AI Thế Hệ Mới

[![Vite](https://img.shields.io/badge/Vite-8.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vanilla CSS](https://img.shields.io/badge/CSS-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#aesthetics)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**VisionX Pro** là dự án Landing Page giới thiệu dòng sản phẩm kính thông minh tích hợp trí tuệ nhân tạo (AI) và công nghệ hiển thị thực tế tăng cường (AR) thế hệ mới. Trang web được thiết kế với phong cách tối giản, sang trọng (Glassmorphism), tối ưu hóa hiệu năng và mang đến trải nghiệm cuộn tương tác (Scrollytelling Parallax) mượt mà không dùng thư viện ngoài.

> [!NOTE]  
> Dự án được xây dựng thuần túy sử dụng **React 19**, **Vite** và **Vanilla CSS** nhằm đảm bảo hiệu năng tải trang nhanh nhất và khả năng tùy chỉnh thiết kế giao diện linh hoạt nhất.

---

## ✨ Tính Năng Nổi Bật của Sản Phầm (VisionX Pro)

- 🖥️ **Hiển Thị AR 4K**: Màn hình MicroLED trong suốt đạt độ phân giải 4K mỗi mắt, góc nhìn rộng 52°, tần số quét 120Hz mượt mà.
- 🤖 **Trợ Lý AI Đa Năng**: Trợ lý ảo AI thông minh tích hợp phản hồi dưới 50ms, dịch thuật thời gian thực hỗ trợ hơn 40 ngôn ngữ.
- 🪶 **Thiết Kế Titanium 36g**: Trọng lượng siêu nhẹ chỉ 36 gram nhờ khung vỏ bằng chất liệu Titanium Grade 5 cùng kính Sapphire chống trầy xước.
- 🔋 **Pin Graphene 12 Giờ**: Công nghệ pin Graphene bền bỉ, sạc nhanh 30 phút đạt 80% dung lượng.
- 🔒 **Bảo Mật Sinh Trắc Học**: Mở khóa bằng công nghệ quét mống mắt (Iris Scan) kết hợp mã hóa đầu cuối AES-256.
- 📸 **Camera 48MP & Cảm Biến LiDAR**: Chụp ảnh chất lượng cao và quét không gian 3D chính xác tuyệt đối.

---

## 🎨 Điểm Nhấn Công Nghệ & Thiết Kế Giao Diện

- **Trải Nghiệm Scrollytelling & Parallax**: Tạo ra các hiệu ứng chuyển động mượt mà khi người dùng cuộn trang thông qua các React Hooks tùy biến (`useParallax`, `useElementProgress`, `useHeroProgress`).
- **Giao Diện Glassmorphism Cao Cấp**: Sự hòa trộn tinh tế giữa các mảng màu neon (Indigo, Cyan, Purple) trên nền tối sang trọng kết hợp các hiệu ứng đổ bóng mờ, phát sáng (glow) độc đáo.
- **Micro-interactions (Tương Tác Siêu Nhỏ)**: Các nút bấm, thẻ tính năng phản hồi ngay lập tức với thao tác hover của chuột qua các hiệu ứng biến đổi hình dạng (transform), ánh sáng (shine overlay) và chuyển màu gradient.
- **Tối Ưu Hóa SEO & Tốc Độ**: Đầy đủ các thẻ meta SEO tiêu chuẩn, cấu trúc HTML5 ngữ nghĩa và kỹ thuật Lazy Loading hình ảnh giúp trang đạt điểm số hiệu năng cực cao.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
LandingPage/
├── public/                 # Ảnh tĩnh của sản phẩm và icons
├── src/
│   ├── assets/             # Tài nguyên tĩnh nội bộ
│   ├── components/         # Các Component giao diện chính
│   │   ├── Navbar.jsx          # Thanh điều hướng header
│   │   ├── ScrollProgress.jsx  # Thanh tiến trình cuộn trang
│   │   ├── ScrollyHero.jsx     # Hero section với hiệu ứng thu phóng
│   │   ├── StorySection.jsx    # Kể chuyện thương hiệu qua từng chương
│   │   ├── ParallaxFeatures.jsx# Các tính năng nổi bật dạng lưới
│   │   ├── ParallaxSpecs.jsx   # Thông số kỹ thuật chi tiết
│   │   ├── ParallaxNewsletter.jsx# Đăng ký nhận tin tức / Đặt trước sản phẩm
│   │   └── Footer.jsx          # Chân trang & Thông tin liên hệ
│   ├── hooks/              # Custom Hooks tính toán scroll progress
│   │   ├── useParallax.js      # Tính tiến trình cuộn tổng quan & cục bộ
│   │   └── useScrollAnimation.js# Khởi tạo hiệu ứng animation khi cuộn
│   ├── App.jsx             # Tích hợp các component và chạy ứng dụng
│   ├── index.css           # Định nghĩa Design System, biến màu sắc toàn cục
│   └── main.jsx            # Entrypoint của React
├── index.html              # Template HTML chính chứa SEO Meta tags
├── vite.config.js          # Cấu hình Vite bundler
└── package.json            # Thông tin dependencies & scripts dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

Để chạy dự án này trên máy tính cá nhân của bạn, hãy làm theo các bước sau:

### Yêu Cầu Hệ Thống
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS mới nhất)
- Trình quản lý gói `npm` (mặc định đi kèm khi cài Node.js)

### Các Bước Thực Hiện

1. **Tải mã nguồn về máy**:
   ```bash
   git clone <url-kho-chua-cua-ban>
   cd LandingPage
   ```

2. **Cài đặt các gói thư viện cần thiết**:
   ```bash
   npm install
   ```

3. **Chạy ứng dụng ở môi trường phát triển (Development)**:
   ```bash
   npm run dev
   ```
   *Ứng dụng sẽ được khởi chạy tại địa chỉ mặc định `http://localhost:5173`.*

4. **Biên dịch sản phẩm (Production Build)**:
   ```bash
   npm run build
   ```
   *Thư mục `/dist` sẽ chứa toàn bộ mã nguồn HTML/JS/CSS đã được nén và tối ưu hóa.*

5. **Xem thử bản biên dịch (Preview Build)**:
   ```bash
   npm run preview
   ```

---

## ⚙️ Thiết Lập Môi Trường Lập Trình (Dev Stack)

- **Vite 8**: Đảm bảo tốc độ Hot Module Replacement (HMR) tức thì.
- **ESLint 10**: Định hình và duy trì chất lượng mã nguồn sạch, nhất quán.
- **CSS Variables**: Hệ thống token thiết kế màu sắc, khoảng cách (spacing), bo góc (border-radius) tập trung tại `src/index.css`.

---

## 📄 Giấy Phép (License)

Dự án này được phân phối dưới giấy phép **MIT License**. Chi tiết xem tại tệp `LICENSE`.
