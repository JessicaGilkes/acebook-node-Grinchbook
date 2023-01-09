describe("Timeline", () => {
  it("can see likes count on an old post", () => {
    // sign in
    cy.task("seedUsers", "seeLikesCountOnPost")
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
    
    // Assert that we can see the likes count
    cy.task("seedPosts", "seeLikesCountOnPost")
    cy.get(".posts").should("contain", "2 likes");
  });
});
