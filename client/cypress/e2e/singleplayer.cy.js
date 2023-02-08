describe('Single Player', () => {
  it('runs a single player', () => {
    cy.visit('https://data-banana.com');
    cy.get('#single').click();
    cy.get('#category-container > :nth-child(1) > :nth-child(1)').click();
    cy.get('#What').click();
    cy.get(':nth-child(3) > .item').click();
    cy.get('#go').click();
    // cy.get('.title > .svelte-1axuq6s').should('not.have.text', 'undefined');
    cy.get('#bullet-1').should('not.have.text', 'NaN');
    cy.get('path.line').its('length').should('eq', 1);
    cy.get('svg.bars').find('g.tick').should('have.length.greaterThan', 0);
    cy.get('.year-label')
      .invoke('text')
      .should('match', /^\d{4}$/);
    cy.get('#bullet-1').should('not.have.text', 'NaN');
    cy.get('#paragraph').should('not.have.text', 'NaN');
    cy.get('#paragraph-container > :nth-child(2)').should(
      'not.have.text',
      'NaN'
    );
    cy.get('#back-button').click();
    cy.get('#player-zone-container').should('exist');
    cy.get('#home-button').click();
    cy.get('#player-zone-container').should('not.exist');
    cy.get('#top-header').should('exist');
  });
});
