describe("Follow from post feed", () => {
  beforeEach(() => {
    cy.task("seedUsers", "followFromFeedSpec");
    cy.task("seedPosts", "followFromFeedSpec");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
  });
  it("Can follow Mr. Spock from the posts feed", () => {
    cy.task("getIDStrings", "followFromFeedSpec").then((ids) => {
      cy.get("#" + ids.spockIDString).click();
      cy.visit("/friends");
      cy.contains("p", "There are 4 people that you are following:");
      cy.get("#friend-list").contains("William Riker");
      cy.get("#friend-list").contains("Deanna Troi");
      cy.get("#friend-list").contains("Worf");
      cy.get("#friend-list").contains("Mr. Spock");
      cy.get("#not-friend-list").contains("James T Kirk");
      cy.get("#not-friend-list").contains("Benjamin Sisko");
    });
  });
});
