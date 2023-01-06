describe("Authentication", () => {
  it("A user who is not signed in cannot reach the posts page", () => {
    cy.visit("/posts");
    cy.url().should("include", "sessions/new");
    cy.contains("h1", "Login");
  });
  it("A user who is not signed in cannot reach the posts/new page", () => {
    cy.visit("/posts/new");
    cy.url().should("include", "sessions/new");
    cy.contains("h1", "Login");
  });
  it("A user signs in and is redirected to /posts", () => {
    // sign in
    cy.task("seedUsers", "cansignInSpec");
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
