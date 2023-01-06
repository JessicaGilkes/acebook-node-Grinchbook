describe("nav bar", () => {
  it("nav bar has sign-up and login, but not Post Feed, if not logged in", () => {
    cy.visit("/");
    cy.get(".topnav").contains("a", "Sign Up");
    cy.get(".topnav").contains("a", "Log In");
    cy.get(".topnav").contains("a", "Post Feed").should("not.exist");
  });
  it("link to sign up works", () => {
    cy.visit("/");
    cy.get(".topnav").contains("a", "Sign Up").click();
    cy.url().should("include", "users/new");
  });
  it("link to log in works", () => {
    cy.visit("/");
    cy.get(".topnav").contains("a", "Log In").click();
    cy.url().should("include", "sessions/new");
  });
  const signUp = () => {
    // sign in
    cy.task("seedUsers", "navBarSpec");
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
  };
  it("has links to log out, home, friends and post if user is signed in", () => {
    signUp();
    cy.get(".topnav").contains("a", "Home");
    cy.get(".topnav").contains("a", "Friends");
    cy.get(".topnav").contains("a", "Post Feed");
    cy.get(".topnav").contains("input", "Log Out");
    cy.get(".topnav").contains("a", "Sign Up").should("not.exist");
  });
  it("link to home page works", () => {
    signUp();
    cy.get(".topnav").contains("a", "Home").click();
    cy.contains("p", "Welcome to Acebook");
  });
  it("link to Post Feed page works", () => {
    signUp();
    cy.get(".topnav").contains("a", "Post Feed").click();
    cy.contains("h1", "Post Feed");
  });
  it("Log Out button works", () => {
    signUp();
    cy.get(".topnav").contains("input", "Log Out").click();
    cy.url().should("include", "sessions/new");
  });
  it("link to friends page works", () => {
    signUp();
    cy.get(".topnav").contains("a", "Friends").click();
    cy.contains("h1", "Friends");
  });
});
