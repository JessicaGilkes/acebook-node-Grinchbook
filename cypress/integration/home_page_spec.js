describe("Home page", () => {
  beforeEach(() => {
    cy.task("seedUsers", "homePageSpec")
    cy.visit("/");
  })
  it("has a title", () => {
    cy.get(".title").should("contain", "Acebook");
  });

  it("has a username", () => {
    // check for valued customer
    cy.get("#username").should("contain", "Hello valued customer");

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();

    // check for username
    cy.visit("/");
    cy.get("#username").should("contain", "Jean Luc");
  });
});
