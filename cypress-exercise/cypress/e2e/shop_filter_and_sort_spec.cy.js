describe('Advanced Shop Page Tests', () => {
  before(() => {
    cy.visit('http://localhost:4200/login');
    cy.get('input#email').type('nguyenvan1a@example.com');
    cy.get('input#password').type('Secure@123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/shop');
  });
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit('http://localhost:4200/shop');
  });

  // 1. Lọc sản phẩm theo khoảng giá từ 200 đến 500
  it('Should filter products between 200 and 500 using input fields', () => {
    cy.get('input.price-input').eq(0).clear().type('200');
    cy.get('input.price-input').eq(1).clear().type('500');
    cy.wait(500);
    cy.get('.product-card').should('exist');
    cy.get('.product-pricing .current-price').each(($el) => {
      const price = parseFloat($el.text().replace('$', ''));
      expect(price).to.be.within(200, 500);
    });
  });

  // 2. Reset bộ lọc giá và kiểm tra số lượng sản phẩm
  it('Should reset price filter and show more products', () => {
    cy.get('input.price-input').eq(0).clear().type('500');
    cy.get('input.price-input').eq(1).clear().type('2000');
    cy.wait(300);
    cy.get('.product-card').then(($filtered) => {
      const filteredCount = $filtered.length;
      cy.get('input.price-input').eq(0).clear();
      cy.get('input.price-input').eq(1).clear();
      cy.get('input.price-range').invoke('val', 9999).trigger('input');
      cy.wait(500);
      cy.get('.product-card').its('length').should('be.gte', filteredCount);
    });
  });

  // 3. Dùng thanh trượt để lọc giá nhỏ hơn 300
  it('Should filter products under 300 using slider', () => {
    cy.get('input.price-range').invoke('val', 300).trigger('input');
    cy.wait(400);

    cy.get('.product-pricing .current-price').each(($el) => {
      const price = parseFloat($el.text().replace('$', ''));
      expect(price).to.be.lte(300);
    });
  });

  // 4. Sắp xếp theo giá từ thấp đến cao
  it('Should sort products by Price: Low to High', () => {
    cy.get('.sort-select').select('Price: Low to High');
    cy.wait(400);
    const prices = [];
    cy.get('.product-pricing .current-price')
      .each(($el) => {
        prices.push(parseFloat($el.text().replace('$', '')));
      })
      .then(() => {
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sorted);
      });
  });

  // 5. Sắp xếp theo giá từ cao xuống thấp
  it('Should sort products by Price: High to Low', () => {
    cy.get('.sort-select').select('Price: High to Low');
    cy.wait(400);
    const prices = [];
    cy.get('.product-pricing .current-price')
      .each(($el) => {
        prices.push(parseFloat($el.text().replace('$', '')));
      })
      .then(() => {
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).to.deep.equal(sorted);
      });
  });

  // 6. Sắp xếp theo đánh giá cao nhất (Best Rating)
  it('Should sort products by Best Rating', () => {
    cy.get('.sort-select').select('Best Rating');
    cy.wait(400);

    const ratings = [];
    cy.get('.product-rating .stars')
      .each(($el) => {
        const filledStars = $el.find('.star.filled').length;
        ratings.push(filledStars);
      })
      .then(() => {
        const sorted = [...ratings].sort((a, b) => b - a);
        expect(ratings).to.deep.equal(sorted);
      });
  });

  // 7. Kiểm tra số lượng sản phẩm mỗi trang (pagination)
  it('Should display correct number of products per page', () => {
    [5, 10, 20, 30].forEach((count) => {
      cy.get('.items-select').select(String(count));
      cy.wait(400);
      cy.get('.product-card').its('length').should('be.lte', count);
    });
  });

  // 8. Chuyển trang và kiểm tra sản phẩm thay đổi
  it('Should change product list when navigating to next page', () => {
    cy.get('.items-select').select('5');
    cy.wait(300);

    cy.get('.product-name')
      .first()
      .invoke('text')
      .then((page1Product) => {
        cy.get('.page-btn').contains('Next').click();
        cy.wait(500);
        cy.get('.product-name')
          .first()
          .invoke('text')
          .should('not.eq', page1Product);
      });
  });
});
