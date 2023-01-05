describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@signupspec.com");
    cy.get("#password").type("password");
    cy.get("#username").type("someone1");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
