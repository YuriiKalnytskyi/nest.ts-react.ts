describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/example');
  });

  it('type-text', () => {
    cy.get('#name').type('Learn Redux').should('have.value', 'Learn Redux');
  });

  it('Open Drawer', () => {
    cy.contains('Open Drawer').click();
    cy.contains('Save').click();
    cy.get('#closeDrawer').click();
  });
});
