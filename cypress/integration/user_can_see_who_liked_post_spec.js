describe("Timeline", () => {
  it("can open the modal", () => {
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

  it("can see who has liked a post", () => {
    cy.task("seedUsers", "seeLikesCountOnPost");
    cy.task("seedPosts", "seeLikesCountOnPost");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();

    // Open the singlepost page
    cy.get("a[href*='/singlepost']").eq(1).click();
    cy.get("#likeBtnModal").click();
    cy.get(".modal-content").should("contain", "Jean Luc");
  });
});
