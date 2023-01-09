describe("Timeline", () => {
  it("can see likes count on an old post", () => {
    cy.task("seedUsers", "seeLikesCountOnPost")
    cy.task("seedPosts", "seeLikesCountOnPost")
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
    
    // Assert that we can see the likes count
    cy.get(".posts").should("contain", "2 likes");
  });
});
