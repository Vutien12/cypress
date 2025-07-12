describe('Login Failure Test', () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:4200/login');
  });

  it('Should show validation errors when both fields are empty', () => {
    cy.get('button[type="submit"]').click();

    // Kiểm tra lỗi cho email
    cy.get('.error-message')
      .contains('Please enter email address.')
      .should('be.visible');

    // Kiểm tra lỗi cho password
    cy.get('.error-message')
      .contains('Please enter the password.')
      .should('be.visible');
  });

  it('Should show validation error when only password is missing', () => {
    cy.get('#email').type('nguyenvan1a@example.com');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message')
      .contains('Please enter the password.')
      .should('be.visible');
  });

  it('Should show validation error when only email is missing', () => {
    cy.get('#password').type('Secure@123');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message')
      .contains('Please enter email address.')
      .should('be.visible');
  });

  it('Should show incorrect credentials message when login fails', () => {
    cy.get('#email').type('nguyenvan1a@example.com');
    cy.get('#password').type('WrongPassword123');
    cy.get('button[type="submit"]').click();

    cy.get('.form-error-message')
      .should('be.visible')
      .and('contain.text', 'Incorrect email or password.');
  });
});
