describe('Checkout Process Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Should complete checkout and navigate to confirmation page', () => {
    // Thêm sản phẩm vào giỏ hàng
    cy.get('.inventory_item').first().find('.btn_inventory').click();

    // Vào giỏ hàng
    cy.get('.shopping_cart_link').click();

    // Nhấn nút Checkout
    cy.get('#checkout').click();

    // Điền thông tin thanh toán
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');

    // Nhấn Continue
    cy.get('#continue').click();

    // Xác minh chuyển đến trang xác nhận
    cy.url().should('include', '/checkout-step-two.html');
  });
});
