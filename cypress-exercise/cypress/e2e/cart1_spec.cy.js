// describe('Cart Test', () => {
//   beforeEach(() => {
//     // Đăng nhập trước mỗi bài test
//     cy.visit('https://www.saucedemo.com');
//     cy.get('#user-name').type('standard_user');
//     cy.get('#password').type('secret_sauce');
//     cy.get('#login-button').click();
//   });

//   it('Should add a product to the cart', () => {
//     cy.get('.inventory_item').first().find('.btn_inventory').click();
//     cy.get('.shopping_cart_badge').should('have.text', '1');
//   });

//   it('Should sort products by price low to high', () => {
//     // Chọn bộ lọc "Price (low to high)" từ dropdown
//     cy.get('.product_sort_container').select('lohi');

//     // Kiểm tra giá sản phẩm đầu tiên sau khi sắp xếp
//     cy.get('.inventory_item_price').first().should('have.text', '$7.99');
//   });
// });

describe('Product Sorting Test - Price Low to High', () => {
  it('Should sort products by price in ascending order', () => {
    // Truy cập trang shop
    cy.visit('http://localhost:51167/shop');

    // Chọn tùy chọn "Price: Low to High" trong dropdown
    cy.get('.sort-select').select('Price: Low to High');

    // Chờ một chút cho dữ liệu sắp xếp lại
    cy.wait(500); // Tùy backend xử lý nhanh hay chậm, có thể bỏ nếu dùng async hoàn toàn

    // Lấy danh sách giá sản phẩm sau khi sắp xếp
    cy.get('.product-card .current-price')
      .then($prices => {
        // Chuyển giá từ dạng $xxx.xx thành mảng số
        const priceValues = [...$prices].map(el =>
          parseFloat(el.textContent?.replace('$', '') || '0')
        );

        // Kiểm tra mảng đã được sắp xếp tăng dần
        const sorted = [...priceValues].sort((a, b) => a - b);

        expect(priceValues).to.deep.equal(sorted);
      });
  });
});
