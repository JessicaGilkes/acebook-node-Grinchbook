describe("Timeline", () => {
  it("can see author on post feed", () => {
    cy.task("seedUsers", "seeLikesCountOnPost");
    cy.task("seedPosts", "seeLikesCountOnPost");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();

    // Open the post feed and check first post author
    cy.visit("/posts");
    cy.get(".post-block").eq(0).should("contain", "Mr. Spock");

    // Open the post feed and check second post author
    cy.visit("/posts");
    cy.get(".post-block").eq(1).should("contain", "Jean Luc");

    // Make a new post, check that first post author is now Jean Luc
    cy.visit("/posts");
    cy.contains("create new post").click();

    cy.get("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".post-block").eq(0).should("contain", "Jean Luc");
  });
});
