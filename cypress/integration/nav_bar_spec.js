describe("nav bar", () => {
    it ("has a nav bar has sign-up and login if not logged in", () => {
        cy.visit("/")
        cy.get(".topnav").contains("a", "Sign Up")
        cy.get(".topnav").contains("a", "Log In")
        cy.get(".topnav").contains("a", "Post Feed").should("not.exist")
    })
    it ("link to sign up works", () => {
        cy.visit("/")
        cy.get(".topnav").contains("a", "Sign Up").click()
        cy.url().should("include", "users/new")
    })
    it ("link to log in works", () => {
        cy.visit("/")
        cy.get(".topnav").contains("a", "Log In").click()
        cy.url().should("include", "sessions/new")
    })
})