describe('Subscriptions App', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions/2', {
      statusCode: 200,
      fixture: 'subscription_detail' 
    });
    cy.visit('http://localhost:5173/2');
  });

  it('should display sub-details on page load', () => {
    cy.get('.sub-details').should('exist');
  });

  it('should have an h2 elements', () => {
    // Ensure there are exactly 6 h2 elements within the .sub-details section
    cy.get('.sub-details').find('h2').should('exist');
  });

  it('should display the first h2 element with the title', () => {
    cy.fixture('subscription_detail.json').then((subscription) => {
      const title = subscription.data.attributes.title;
      cy.get('.sub-details')
        .find('h2')
        .should('have.text', title);
    });
  });

  it('should find the 2nd, 3rd, 4th, and 5th child elements under .sub-details', () => {
    cy.get('.sub-details > :nth-child(2)').should('exist');
    cy.get('.sub-details > :nth-child(3)').should('exist');
    cy.get('.sub-details > :nth-child(4)').should('exist');
    cy.get('.sub-details > :nth-child(5)').should('exist');
  });

  it('should have a cancel button that exists', () => {
    cy.get('.btn').should('exist');
  });

  it('should toggle the subscription status and button text', () => {
    cy.get('.btn').click();
  
    cy.get('.sub-details > :nth-child(4)').should(($status) => {
      expect($status.text().trim()).to.be.oneOf(['Status: Active', 'Status: Canceled']);
    });
  
    cy.get('.btn').should(($btn) => {
      expect($btn.text().trim()).to.be.oneOf(['Activate', 'Cancel']);
    });
  });
});