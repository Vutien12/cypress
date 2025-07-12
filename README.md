# 🚀 Kiểm Thử Tự Động với Cypress

## 📌 Mục Tiêu

Thực hiện kiểm thử tự động **end-to-end** bằng **Cypress** cho trang web bán đồ điện tử tại `http://localhost:4200`, bao gồm:

- ✅ Đăng nhập thành công / thất bại
- ✅ Thêm / xóa sản phẩm khỏi giỏ hàng
- ✅ Lọc giá / sắp xếp sản phẩm
- ✅ Kiểm tra đánh giá, phân trang
- ✅ Ghi lại video và ảnh kiểm thử

---

## ⚙️ Cài Đặt

### 1. Khởi tạo dự án & cài đặt Cypress

```bash
npm init -y
npm install cypress --save-dev
```

### 2. Mở giao diện Cypress

```bash
npx cypress open

```

### 3. Hoặc chạy tất cả kiểm thử

```bash
npx cypress run
```

## 📁 Cấu Trúc Thư Mục Dự Án

```bash
├── cypress\
│   ├── e2e\
│   │   ├── login_spec.cy.js
│   │   ├── login_failure_spec.cy.js
│   │   ├── cart_spec.cy.js
│   │   ├── shop_filter_and_sort_spec.cy.js
│   │   └── checkout_process.cy.js
│   ├── images\
│   │   ├── login_success_spec.cy.js.png
│   │   ├── login_failure_spec.cy.js.png
│   │   ├── cart_spec.cy.js.png
│   │   ├── shop_filter_and_sort_spec.cy.js.png
│   │   └── cypress.mkv

```

## 🧪 Danh Sách Các Test Case

### 🔐 Login Test Cases

| STT | Mô Tả                                                                  | Trạng Thái |
| --- | ---------------------------------------------------------------------- | ---------- |
| 1   | Should login successfully with valid credentials and redirect to /shop | ✅ Passed  |
| 2   | Should show validation errors when both fields are empty               | ✅ Passed  |
| 3   | Should show validation error when only password is missing             | ✅ Passed  |
| 4   | Should show validation error when only email is missing                | ✅ Passed  |
| 5   | Should show incorrect credentials message when login fails             | ✅ Passed  |

---

### 🛒 Cart Test Cases

| STT | Mô Tả                                                                 | Trạng Thái |
| --- | --------------------------------------------------------------------- | ---------- |
| 6   | Test 1: Add 10 products with random quantities and verify in cart     | ✅ Passed  |
| 7   | Test 2: Add products then randomly change quantities and verify total | ✅ Passed  |
| 8   | Test 3: Add products then remove half of cart items                   | ✅ Passed  |
| 9   | Test 4: Add products then clear the cart                              | ✅ Passed  |

---

### 🛍️ Filter & Sort Test Cases

| STT | Mô Tả                                                         | Trạng Thái |
| --- | ------------------------------------------------------------- | ---------- |
| 10  | Should filter products between 200 and 500 using input fields | ✅ Passed  |
| 11  | Should reset price filter and show more products              | ✅ Passed  |
| 12  | Should filter products under 300 using slider                 | ✅ Passed  |
| 13  | Should sort products by Price: Low to High                    | ✅ Passed  |
| 14  | Should sort products by Price: High to Low                    | ✅ Passed  |
| 15  | Should sort products by Best Rating                           | ✅ Passed  |
| 16  | Should display correct number of products per page            | ✅ Passed  |
| 17  | Should change product list when navigating to next page       | ✅ Passed  |

---

## 📸 Hình Ảnh & Video Kiểm Thử

📁 **Thư mục chứa:** `D:\PVVU\Test\cypress\cypress\images`
![login success](./images/login_success_spec.cy.js.png)
![login fail](./images/login_failure_spec.cy.js.png)
![cart](./images/cart_spec.cy.js.png)
![filter-sort](./images/shop_filter_and_sort_spec.cy.js.png)
![video](./images/cypress.mkv)

### 🎥 Video

| File          | Mô Tả                              | Dung Lượng |
| ------------- | ---------------------------------- | ---------- |
| `cypress.mkv` | Ghi lại toàn bộ quá trình kiểm thử | ~22.6 MB   |

### 🖼️ Ảnh Chụp Màn Hình

| Tên File                              | Mô Tả Kiểm Thử                     |
| ------------------------------------- | ---------------------------------- |
| `login_success_spec.cy.js.png`        | Đăng nhập thành công               |
| `login_failure_spec.cy.js.png`        | Đăng nhập thất bại / lỗi input     |
| `cart_spec.cy.js.png`                 | Thêm sản phẩm vào giỏ hàng         |
| `shop_filter_and_sort_spec.cy.js.png` | Lọc và sắp xếp sản phẩm trong shop |

---

## 📈 Tổng Kết

- 🧪 **Tổng số test case:** `17`
- ✅ **Tỷ lệ pass:** `100%`
- 🎥 **Video + ảnh chụp:** đầy đủ minh họa quá trình kiểm thử

---
