describe('🛒 Cart Operations Test Suite', () => {
  const addedItems = [];

  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.session('login-session', () => {
      cy.visit('http://localhost:4200/login');
      cy.get('#email').type('nguyenvan1a@example.com');
      cy.get('#password').type('Secure@123');
      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 10000 }).should('include', '/shop');
    });
    cy.visit('http://localhost:4200/shop');
  });

  const addRandomProducts = () => {
    addedItems.length = 0;

    cy.get('.product-card').should('have.length.gte', 10);

    const productCount = Math.floor(Math.random() * 6) + 3;

    for (let i = 0; i < productCount; i++) {
      const quantity = Math.floor(Math.random() * 9) + 1;

      cy.get('.product-card')
        .eq(i)
        .within(() => {
          cy.get('.current-price')
            .invoke('text')
            .then((text) => {
              const price = parseFloat(text.replace('$', ''));
              addedItems.push({ index: i, quantity, price });
            });

          for (let j = 0; j < quantity; j++) {
            cy.get('.overlay-btn.cart-btn').click({ force: true });
          }
        });
    }

    cy.wait(1000);
  };

  it('🧪 Test 1: Add 10 products with random quantities and verify in cart', () => {
    addedItems.length = 0;

    cy.get('.product-card').should('have.length.gte', 10);

    // Thêm từng sản phẩm một cách tuần tự
    Cypress._.times(10, (index) => {
      cy.get('.product-card')
        .eq(index)
        .within(() => {
          const quantity = Math.floor(Math.random() * 5) + 1;

          cy.get('.product-name')
            .invoke('text')
            .then((nameText) => {
              const name = nameText.trim();
              addedItems.push({ name, quantity });

              Cypress._.times(quantity, () => {
                cy.get('.overlay-btn.cart-btn').click({ force: true });
              });
            });
        });
    });

    // Đợi đảm bảo mọi thứ thêm xong
    cy.wait(1500);
    cy.get('[data-cy="open-cart"]').click();
    cy.wait(500);

    // ✅ Kiểm tra số lượng sản phẩm trong giỏ
    cy.get('.cart-item').should('have.length', 10);

    // ✅ Kiểm tra từng sản phẩm theo tên và số lượng
    addedItems.forEach((item) => {
      cy.get('.cart-item')
        .contains(item.name)
        .parents('.cart-item')
        .within(() => {
          cy.get('.qty').should('have.text', item.quantity.toString());
        });
    });
  });

  it('🧪 Test 2: Add products then randomly change quantities and verify total', () => {
    addRandomProducts();
    cy.get('[data-cy="open-cart"]').click();
    cy.wait(500);

    let expectedTotal = 0;

    cy.get('.cart-item').each(($el) => {
      const newQty = Math.floor(Math.random() * 9) + 1;

      cy.wrap($el).within(() => {
        cy.get('.qty')
          .invoke('text')
          .then((oldQtyText) => {
            const oldQty = parseInt(oldQtyText);
            const diff = newQty - oldQty;

            for (let i = 0; i < Math.abs(diff); i++) {
              if (diff > 0) cy.get('button').contains('add').click();
              else cy.get('button').contains('remove').click();
            }

            cy.get('.price')
              .invoke('text')
              .then((priceText) => {
                const price = parseFloat(priceText.replace('x $', ''));
                expectedTotal += price * newQty;
              });
          });
      });
    });

    cy.wait(1000);
    cy.get('.subtotal .amount')
      .invoke('text')
      .then((subtotalText) => {
        const actualTotal = parseFloat(subtotalText.replace('$', ''));
        expect(actualTotal).to.be.closeTo(expectedTotal, 0.01);
      });
  });

  it('🧪 Test 3: Add products then remove half of cart items', () => {
    addRandomProducts();
    cy.get('[data-cy="open-cart"]').click();
    cy.wait(500);

    cy.get('.cart-item')
      .its('length')
      .then((count) => {
        const toRemove = Math.floor(count / 2);

        for (let i = 0; i < toRemove; i++) {
          cy.get('.cart-item')
            .eq(0)
            .within(() => {
              cy.get('.cart-remove-btn').click();
            });
        }

        cy.wait(500);
        cy.get('.cart-item').should('have.length', count - toRemove);
      });
  });

  it('🧪 Test 4: Add products then clear the cart', () => {
    addRandomProducts();
    cy.get('[data-cy="open-cart"]').click();
    cy.wait(500);

    cy.get('.btn-clear').click();
    cy.wait(500);
    cy.get('.cart-item').should('have.length', 0);
    cy.get('.subtotal .amount').should('contain', '$0.00');
  });
});
