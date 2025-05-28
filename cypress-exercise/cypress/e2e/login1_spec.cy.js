describe('Login Test', () => {
  // Kịch bản đăng nhập thành công đã có ở đây...

  it('Should show error message with invalid credentials', () => {
    // Truy cập trang đăng nhập
    cy.visit('https://www.saucedemo.com');

    // Nhập thông tin không hợp lệ
    cy.get('#user-name').type('invalid_user');
    cy.get('#password').type('wrong_password');

    // Nhấn nút đăng nhập
    cy.get('#login-button').click();

    // Xác minh có thông báo lỗi xuất hiện
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
  });
});
