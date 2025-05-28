describe('Cart Test', () => {
  beforeEach(() => {
    // Đăng nhập trước mỗi bài test
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Should add a product to the cart', () => {
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('Should sort products by price low to high', () => {
    // Chọn bộ lọc "Price (low to high)" từ dropdown
    cy.get('.product_sort_container').select('lohi');

    // Kiểm tra giá sản phẩm đầu tiên sau khi sắp xếp
    cy.get('.inventory_item_price').first().should('have.text', '$7.99');
  });
});
