describe("Timeline", () => {
  it("can see likes count on an old post", () => {
    cy.task("seedUsers", "seeLikesCountOnPost");
    cy.task("seedPosts", "seeLikesCountOnPost");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();

    // Open the singlepost page
    cy.get("a[href*='/singlepost']").eq(0).click();
    cy.get("#likeBtnModal").click();
    cy.get(".modal-content").should("contain", "Liked by: ");
  });
});
