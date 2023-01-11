describe("Friends page", () => {
  beforeEach(() => {
    cy.task("seedUsers", "friendsPageSpec");
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
    cy.visit("/friends");
  });
  it("redirects to login page if user is not signed in", () => {
    cy.contains("input", "Log Out").click();
    cy.visit("/friends");
    cy.url().should("include", "sessions/new");
    cy.contains("h1", "Login");
  });
  it("shows friends details for Picard", () => {
    cy.contains("p", "There are 3 people that you are following:");
    cy.get("#friend-list").contains("William Riker");
    cy.get("#friend-list").contains("Deanna Troi");
    cy.get("#friend-list").contains("Worf");
    cy.get("#not-friend-list").contains("James T Kirk");
    cy.get("#not-friend-list").contains("Mr. Spock");
    cy.get("#not-friend-list").contains("Benjamin Sisko");
  });
  it("updates when one user friends another user", () => {
    cy.contains("input", "Follow James T Kirk").click()
    cy.contains("p", "There are 4 people that you are following:");
    cy.get("#friend-list").contains("William Riker");
    cy.get("#friend-list").contains("Deanna Troi");
    cy.get("#friend-list").contains("Worf");
    cy.get("#friend-list").contains("James T Kirk");
    cy.get("#not-friend-list").contains("Mr. Spock");
    cy.get("#not-friend-list").contains("Benjamin Sisko");
    cy.contains("input", "Follow Mr. Spock").click()
    cy.contains("p", "There are 5 people that you are following:");
    cy.get("#friend-list").contains("William Riker");
    cy.get("#friend-list").contains("Deanna Troi");
    cy.get("#friend-list").contains("Worf");
    cy.get("#friend-list").contains("James T Kirk");
    cy.get("#friend-list").contains("Mr. Spock");
    cy.get("#not-friend-list").contains("Benjamin Sisko");
    cy.contains("input", "Follow Benjamin Sisko").click()
    cy.contains("p", "There are 6 people that you are following:");
    cy.get("#friend-list").contains("William Riker");
    cy.get("#friend-list").contains("Deanna Troi");
    cy.get("#friend-list").contains("Worf");
    cy.get("#friend-list").contains("James T Kirk");
    cy.get("#friend-list").contains("Mr. Spock");
    cy.get("#friend-list").contains("Benjamin Sisko");
    cy.contains("p", "You are friends with everybody in the Grinchverse!!!!!");
  });
});
