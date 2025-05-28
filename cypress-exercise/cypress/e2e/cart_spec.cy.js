describe('Cart Test', () => {
  beforeEach(() => {
    // Đăng nhập trước mỗi bài test
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Should add a product to the cart', () => {
    // Nhấn nút "Add to cart" sản phẩm đầu tiên
    cy.get('.inventory_item').first().find('.btn_inventory').click();

    // Xác minh số lượng sản phẩm trong giỏ hàng là 1
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });
});
