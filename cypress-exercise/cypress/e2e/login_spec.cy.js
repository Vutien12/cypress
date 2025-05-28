describe('Login Test', () => {
  it('Should login successfully with valid credentials', () => {
    // Truy cập trang đăng nhập
    cy.visit('https://www.saucedemo.com');

    // Nhập tên người dùng hợp lệ
    cy.get('#user-name').type('standard_user');

    // Nhập mật khẩu hợp lệ
    cy.get('#password').type('secret_sauce');

    // Nhấn nút đăng nhập
    cy.get('#login-button').click();

    // Kiểm tra URL chuyển hướng đến trang danh sách sản phẩm
    cy.url().should('include', '/inventory.html');
  });
});
