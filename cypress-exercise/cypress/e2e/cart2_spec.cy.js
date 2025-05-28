describe('Remove from Cart Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Should remove a product from the cart', () => {
    // Thêm sản phẩm vào giỏ hàng
    cy.get('.inventory_item').first().find('.btn_inventory').click();

    // Kiểm tra số lượng trong giỏ là 1
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // Nhấn nút "Remove"
    cy.get('.inventory_item').first().find('.btn_inventory').click();

    // Xác minh biểu tượng giỏ hàng không còn hiển thị
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});
