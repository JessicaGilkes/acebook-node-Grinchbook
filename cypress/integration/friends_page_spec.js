describe("Friends page", () => {
  beforeEach(() => {
    cy.task("seedUsers", "friendsPageSpec");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
  });
  it("redirects to login page if user is not signed in", () => {
    cy.contains("input", "Log Out").click();
    cy.visit("/friends");
    cy.url().should("include", "sessions/new");
    cy.contains("h1", "Login");
  });
  it("shows friends details for Picard", () => {
    cy.visit("/friends");
    cy.contains("p", "There are 3 people that you are following:");
    cy.get("#friend-list").contains("William Riker");
    cy.get("#friend-list").contains("Deanna Troi");
    cy.get("#friend-list").contains("Worf");
    cy.get("#not-friend-list").contains("James T Kirk");
    cy.get("#not-friend-list").contains("Mr. Spock");
    cy.get("#not-friend-list").contains("Benjamin Sisko");
  });
});
