# 🕶️ VisionX Pro — Kính Thông Minh AI Thế Hệ Mới

[![Vite](https://img.shields.io/badge/Vite-8.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vanilla CSS](https://img.shields.io/badge/CSS-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#aesthetics)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**VisionX Pro** là dự án Landing Page cao cấp giới thiệu dòng kính thông minh tích hợp trí tuệ nhân tạo (AI) và công nghệ hiển thị thực tế tăng cường (AR) thế hệ mới. Trang web được thiết kế theo phong cách Scrollytelling Parallax kết hợp các tính năng nâng cao hiện đại: Dark/Light Mode, Giỏ hàng/Yêu thích/Đã xem mini, Chatbot trực tuyến, và hệ thống theo dõi hành vi người dùng tự động gửi về Webhook.

> [!NOTE]  
> Dự án được xây dựng thuần túy sử dụng **React 19**, **Vite** và **Vanilla CSS** nhằm đảm bảo hiệu năng tải trang nhanh nhất, khả năng tùy chỉnh thiết kế giao diện linh hoạt nhất và tối ưu hóa trải nghiệm tương tác mượt mà.

---

## ⚡ Các Tính Năng Nâng Cao Đã Tích Hợp

### 1. 🌓 Chế độ Giao diện Song song (Dark / Light Mode)
*   **Quản lý Theme tập trung:** Tích hợp hook `useTheme` tự động đồng bộ hóa trạng thái giao diện với `localStorage` và thẻ `html[data-theme]`.
*   **Hệ thống CSS Variables:** Toàn bộ bảng màu, độ mờ đục (opacity) và viền kính (glassmorphism border) tự động thay đổi mượt mà theo từng chế độ.
*   **Toast Feedback:** Hiển thị thông báo nhỏ mỗi khi chuyển đổi theme thành công.

### 2. 📊 Hệ thống Analytics & Theo dõi Hành vi Thực tế
*   **Theo dõi Milestone cuộn:** Tự động phát hiện và ghi nhận các cột mốc cuộn trang của người dùng (25%, 50%, 75%, 100% chiều cao trang).
*   **Theo dõi Sự kiện Click:** Bất kỳ phần tử nào có thuộc tính `data-track` đều tự động được ghi nhận hành vi click của người dùng.
*   **Tích hợp Webhook API:** Dữ liệu hành vi (click, cuộn) và form đăng ký sẽ được gửi dưới dạng JSON POST về endpoint API thực tế (mô phỏng qua Webhook.site với cơ chế tự động thành công ngoại tuyến khi gặp lỗi mạng/CORS).

### 3. 🔔 Hệ thống Thông báo Đẩy (Toast Notifications)
*   **Đa dạng loại thông báo:** Hỗ trợ 4 kiểu thông báo bao gồm `success` (thành công), `error` (lỗi), `info` (thông tin), và `warning` (cảnh báo).
*   **Tự động tắt & Trực quan:** Mỗi toast có thanh tiến trình thời gian chạy nhỏ dần cho biết khi nào thông báo tự biến mất, hỗ trợ hiệu ứng chuyển động mượt mà.

### 4. 💀 Tải trước Skeleton (Skeleton Loading)
*   **Cải thiện Tốc độ Nhận thức:** Ở khu vực tính năng nổi bật (Features), hệ thống hiển thị hiệu ứng ánh sáng shimmer động (Skeleton Cards) trong 900ms đầu tiên trước khi tải dữ liệu thật, mang lại trải nghiệm phản hồi ứng dụng nhanh chóng.

### 5. 🛍️ Phân hệ Thương mại Điện tử Mini (Ecommerce Subsystem)
*   **Quản lý giỏ hàng:** Cho phép người dùng thêm sản phẩm, cập nhật số lượng, xóa sản phẩm trực tiếp từ panel góc phải.
*   **Sản phẩm Yêu thích (Wishlist):** Lưu trữ các sản phẩm yêu thích của khách hàng đi kèm hiệu ứng nhịp tim (heartbeat) sinh động trên nút thả tim.
*   **Lịch sử xem sản phẩm (Recently Viewed):** Tự động theo dõi các biến thể sản phẩm người dùng đã xem và gợi ý quay lại mua.
*   **Store Drawer:** Panel kéo ra từ bên phải màn hình tích hợp 3 tab điều hướng mượt mà, hỗ trợ đóng nhanh bằng phím `Escape` và tự động khoá cuộn trang (body scroll lock).

### 6. 🤖 Chatbot Hỗ trợ Trực tuyến (VisionBot)
*   **Tự động trả lời thông minh:** Cửa sổ trò chuyện tự động phản hồi dựa theo từ khóa (giá, pin, bảo hành, màu sắc, camera, AI chip, v.v.).
*   **Typing Indicator:** Hiệu ứng 3 chấm nhảy biểu thị trạng thái "Bot đang nhập câu trả lời".
*   **Unread Badge:** Đèn nháy đỏ hiển thị số tin nhắn chưa đọc khi cửa sổ chat đang đóng.
*   **Gợi ý câu hỏi:** Cung cấp các thẻ câu hỏi gợi ý nhanh ngay khi mới mở cửa sổ chat.

---

## 🎨 Điểm Nhấn Công Nghệ & Thiết Kế Giao Diện

*   **Hiệu ứng Parallax Scrollytelling:** Tận dụng React Hooks tùy biến (`useParallax`, `useElementProgress`) để tính toán tiến trình cuộn trang, giúp các lớp nền, tiêu đề, và thẻ sản phẩm trượt mượt mà.
*   **Glassmorphism & Micro-interactions:** Sự kết hợp hoàn hảo giữa các tông màu Neon (Indigo, Cyan) trên nền kính mờ tạo nên nét công nghệ tương lai cao cấp.
*   **Ripple Effect:** Thêm hiệu ứng gợn sóng nước (ripple effect) khi người dùng bấm vào các nút mua hàng và đăng ký.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
LandingPage/
├── public/                 # Ảnh tĩnh của sản phẩm và biểu tượng
├── src/
│   ├── assets/             # Tài nguyên tĩnh nội bộ
│   ├── components/         # Các Component giao diện chính
│   │   ├── Navbar.jsx          # Thanh điều hướng header (Tích hợp Theme Toggle & Cart Badge)
│   │   ├── ScrollProgress.jsx  # Thanh tiến trình cuộn trang
│   │   ├── ScrollyHero.jsx     # Hero section với hiệu ứng thu phóng
│   │   ├── StorySection.jsx    # Kể chuyện thương hiệu qua từng chương
│   │   ├── ParallaxFeatures.jsx# Các tính năng nổi bật (Tích hợp Skeleton Loading)
│   │   ├── ParallaxSpecs.jsx   # Thông số kỹ thuật chi tiết
│   │   ├── ProductCard.jsx     # Thẻ sản phẩm với hiệu ứng gợn sóng & yêu thích
│   │   ├── ProductSection.jsx  # Khu vực trưng bày các phiên bản VisionX
│   │   ├── StoreDrawer.jsx     # Panel giỏ hàng, yêu thích và lịch sử xem sản phẩm
│   │   ├── ChatBot.jsx         # Cửa sổ tư vấn bán hàng tự động trực tuyến
│   │   ├── ToastNotification.jsx# Hệ thống thông báo đẩy góc màn hình
│   │   ├── ParallaxNewsletter.jsx# Đăng ký và đặt trước sản phẩm (Validate email & Webhook)
│   │   └── Footer.jsx          # Chân trang & Thông tin liên hệ
│   ├── hooks/              # Custom Hooks hỗ trợ
│   │   ├── useParallax.js      # Tính tiến trình cuộn tổng quan & cục bộ
│   │   ├── useScrollAnimation.js# Khởi tạo hiệu ứng animation khi cuộn
│   │   ├── useTheme.js         # Quản lý chế độ tối / sáng
│   │   ├── useAnalytics.js     # Ghi nhận và gửi dữ liệu hành vi người dùng
│   │   ├── useStore.js         # State quản lý giỏ hàng và danh sách yêu thích
│   │   └── useRipple.js        # Tạo hiệu ứng gợn sóng khi click
│   ├── App.jsx             # Tích hợp toàn bộ hệ thống
│   ├── index.css           # Định nghĩa Design System, CSS variables và Keyframes
│   └── main.jsx            # Entrypoint của React
├── index.html              # Template HTML chính chứa SEO Meta tags
├── vite.config.js          # Cấu hình Vite bundler
└── package.json            # Thông tin dependencies & scripts dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### Yêu Cầu Hệ Thống
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS mới nhất)
- Trình quản lý gói `npm` (mặc định đi kèm khi cài Node.js)

### Các Bước Thực Hiện

1. **Tải mã nguồn về máy**:
   ```bash
   git clone https://github.com/minhquang-31203/Landing_Page.git
   cd Landing_Page
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

5. **Xem thử bản biên dịch (Preview Build)**:
   ```bash
   npm run preview
   ```

---

## 📄 Giấy Phép (License)

Dự án này được phân phối dưới giấy phép **MIT License**.
