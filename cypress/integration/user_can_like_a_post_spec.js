describe("Timeline", () => {
  it("can open the singlepost page", () => {
    cy.task("seedUsers", "seeLikesCountOnPost");
    cy.task("seedPosts", "seeLikesCountOnPost");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();

    // Open the singlepost page
    cy.get("a[href*='/singlepost']").eq(0).click();
    cy.url().should("include", "/singlepost?id=");
  });

  it("can like a post", () => {
    cy.task("seedUsers", "seeLikesCountOnPost");
    cy.task("seedPosts", "seeLikesCountOnPost");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();

    cy.get("a[href*='/singlepost']").eq(0).click();
    cy.get("input[type=submit]").eq(2).click();
    cy.get(".post-block").should("contain", "Likes 1");
    cy.get("#likeBtnModal").click();
    cy.get(".modal-content").should("contain", "Jean Luc");
  });
});