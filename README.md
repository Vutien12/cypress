# cypress# 🚀 Dự án Kiểm thử Tự động với Cypress

## 📌 Mục tiêu
Thực hành kiểm thử tự động end-to-end bằng **Cypress** cho trang web mẫu [saucedemo.com](https://www.saucedemo.com), bao gồm các chức năng:
- Đăng nhập thành công/thất bại
- Thêm/xóa sản phẩm khỏi giỏ hàng
- Tìm kiếm/sắp xếp sản phẩm
- Quy trình thanh toán

---

## 🧰 Yêu cầu hệ thống

- Node.js v14 trở lên
- Trình soạn thảo như Visual Studio Code
- Truy cập Internet tới [https://www.saucedemo.com](https://www.saucedemo.com)

---

## ⚙️ Cài đặt

2. Khởi tạo và cài Cypress:

    npm init -y

    npm install cypress --save-dev

3. Mở Cypress:

    npx cypress open

🧪 Các kịch bản kiểm thử

| Tên tệp                  | Mô tả                                     |
| ------------------------ | ----------------------------------------- |
| `login_spec.cy.js`       | Kiểm tra đăng nhập thành công             |
| `login1_spec.cy.js`      | Kiểm tra đăng nhập thất bại               |
| `cart_spec.cy.js`        | Thêm sản phẩm vào giỏ hàng                |
| `cart1_spec.cy.js`       | Xóa sản phẩm khỏi giỏ hàng                |
| `cart2_spec.cy.js`       | Sắp xếp sản phẩm theo giá từ thấp đến cao |
| `checkout_process.cy.js` | Kiểm tra quy trình thanh toán             |


▶️ Cách chạy kiểm thử

1. Mở terminal trong thư mục dự án.

2. Gõ lệnh:

    npx cypress open

3. Giao diện Cypress sẽ hiện lên, chọn file .cy.js bạn muốn kiểm thử.




