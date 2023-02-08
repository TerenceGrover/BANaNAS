describe('Multi Player', () => {
  it('runs a multiplayer comparison', () => {
    cy.visit('https://data-banana.com');
    cy.get('#multi-1').click();
    cy.get('#category-container > :nth-child(1) > :nth-child(2)').click();
    cy.get('#What').click();
    cy.get(':nth-child(3) > .item').click();
    cy.get('#Where').click();
    cy.get(':nth-child(3) > .item').click();
    cy.get('#category-container > :nth-child(1) > :nth-child(6)').click();
    cy.get(
      ':nth-child(5) > #sub-container > :nth-child(1) > .svelte-select > .value-container > #What'
    ).click();
    cy.get(':nth-child(3) > .item').click();
    cy.get(
      ':nth-child(5) > #sub-container > #false > .svelte-select > .value-container > #Where'
    ).click();
    cy.get(':nth-child(3) > .item').click();
    cy.get('#vs').click();
    cy.get('#r > .svelte-1b2mi0j').should('not.have.text', 'NaN');
    cy.get('#bullet-1').should('not.have.text', 'NaN');
    cy.get('#bullet-2').should('not.have.text', 'NaN');
    cy.get('svg').should('have.class', 'line-graph');
    cy.get('path.line').its('length').should('eq', 2);

    cy.get('g.tick').each(($tick) => {
      cy.wrap($tick)
        .invoke('text')
        .should('match', /^\d+\.?\d*$/);
    });

    // cy.get('#left').click();
    cy.get('#home-button').click();
    cy.get('#top-header').should('exist');
  });
});
