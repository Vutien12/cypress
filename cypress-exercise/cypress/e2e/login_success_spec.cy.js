describe('Login Page Test', () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it('Should login successfully with valid credentials and redirect to /shop', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input#email').type('nguyenvan1a@example.com');
    cy.get('input#password').type('Secure@123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/shop');
    cy.contains('Shop').should('exist');
  });
});
