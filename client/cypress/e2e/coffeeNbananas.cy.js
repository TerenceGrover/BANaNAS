describe('home page links', () => {
  it('should have working links', () => {
    cy.visit('https://data-banana.com');
    cy.get('#coffee-icon').click();
    cy.get('#buy > p').should('contain', 'developers');
    cy.get('#monkey-icon').click();
    cy.get('#buy > p').should('contain', 'monkeys');
    cy.get('#bulb-icon').click();
    cy.get('#email > input').should('exist');
    cy.get('#password > input').should('exist');
    cy.get('#ip > input').should('exist');
    cy.get('#login-button').should('exist');
  });
});
