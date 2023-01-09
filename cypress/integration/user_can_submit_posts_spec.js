describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign in
    cy.task("seedUsers", "userCanSubmitPost")
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
    
    // submit a post
    cy.task("seedPosts", "userCanSubmitPost")
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
  });
});
