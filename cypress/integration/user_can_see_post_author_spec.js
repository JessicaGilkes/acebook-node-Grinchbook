describe("Timeline", () => {
    it("view post contents on post feed", () => {
      cy.task("seedUsers", "seeLikesCountOnPost");
      cy.task("seedPosts", "seeLikesCountOnPost");
      // sign in
      cy.visit("/sessions/new");
      cy.get("#email").type("picard@ng.com");
      cy.get("#password").type("makeItSo");
      cy.get("#submit").click();
  
      // Open the post feed page
      cy.visit("/posts");
      cy.get(".post-metadata").should("contain", "Mr. Spock")

      // Open a single post page
      cy.get("a[href*='/singlepost']").eq(1).click();
      cy.get(".header").should("contain", "Jean Luc")

    });
});