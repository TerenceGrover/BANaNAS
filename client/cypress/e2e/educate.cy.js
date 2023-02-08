describe('Multi Player', () => {
  it('should correctly render education section', () => {
    cy.visit('https://data-banana.com');
    cy.get('#divider-text').click();
    cy.get('.description')
      .should('contain', 'World Bank API')
      .should('contain', 'HerukArt');
    // .should('contain', 'Open Meteo API')
    cy.get('#button-container > :nth-child(2)').click();
    cy.get('#sub-info').should('exist').should('contain', 'BANaNAS');
    cy.get('#button-container > :nth-child(3)').click();
    cy.get('#sub-info')
      .should('contain', 'Alex')
      .should('contain', 'Alessio')
      .should('contain', 'Seth')
      .should('contain', 'Terence');
  });
});
