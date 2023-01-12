describe("Comments on single post page", () => {
  beforeEach(() => {
    cy.task("seedUsers", "commentsSpec");
    cy.task("seedPosts", "commentsSpec");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("kirk@original.com");
    cy.get("#password").type("finalFrontier");
    cy.get("#submit").click();
    cy.task("getIDStrings", "commentsSpec").then((ids) => {
      cy.get("a[href*=" + ids.commentedPostIDString + "]").click();
    });
  });
  it("lists expected comments", () => {
    cy.contains("p", "You're taking too long between phrases.");
    cy.contains("p", "It's for dramatic effect");
    cy.contains("p", "And coming up: Try to say where no ONE has gone before");
  });
  it("makes a new comment and lists it", () => {
    cy.get("#new-comment").type(
      "No... It really was the sixties, we didn't have any of that."
    );
    cy.get(".comment-form").submit();
    cy.contains("p", "No... It really was the sixties, we didn't have any of that.")
  });
});
