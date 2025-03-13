describe('Subscriptions App', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
      statusCode: 200,
      fixture: 'all_subscriptions'
    });
    cy.visit('http://localhost:5173/');
  });

  it('displays title on page load', () => {
    cy.get('h3').contains('SubsTeaTution');
  });

  it('displays a logo', () => {
    cy.get('img').should('be.visible');
  });

  // it('should show a filter button', () => {
  //   cy.get('.filter').should('exist');
  // });

  // it('should show all filter options when clicked', () => {
  //   cy.get('.filter select').select('all');

  //   cy.get('.filter select option').should('have.length', 6);
  // });

  it('should have 10 h3 elements with correct titles', () => {
    cy.fixture('all_subscriptions.json').then((subscriptions) => {
      const titles = subscriptions.data.map(sub => sub.attributes.title);

      cy.get('.SubsContainer')
        .find('h3')
        .should('have.length', 10)
        .each((h3, index) => {
          cy.wrap(h3).should('have.text', titles[index]);
        });
    });
  });

  it('should navigate to the homepage when the logo is clicked', () => {
    cy.get('img').click(); 
    cy.url().should('eq', 'http://localhost:5173/'); 
  });

  it('should navigate to the homepage when the title is clicked', () => {
    cy.get('h3').contains('SubsTeaTution').click(); 
    cy.url().should('eq', 'http://localhost:5173/'); 
  });
});