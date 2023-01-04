describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  it("has a username", () => {
    // create new user
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("someone1");
    cy.get("#submit").click();

    // check for valued customer

    cy.visit("/");
    cy.get("#username").should("contain","Hello valued customer")

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // check for username
    cy.visit("/");
    cy.get("#username").should("contain","someone1")
  });

});
