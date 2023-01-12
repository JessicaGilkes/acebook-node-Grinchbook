describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign in
    cy.task("seedUsers", "userCanSubmitPost")
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
    
    // submit a post
    cy.task("seedPosts", "userCanSubmitPost")
    cy.visit("/posts");
    cy.contains("create new post").click();

    cy.get("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
  });

  it("can submit an image along with a post", () => {
    // sign in
    cy.task("seedUsers", "userCanSubmitPost")
    cy.visit("/sessions/new");
    cy.get("#email").type("picard@ng.com");
    cy.get("#password").type("makeItSo");
    cy.get("#submit").click();
    
    // submit a post
    cy.task("seedPosts", "userCanSubmitPost")
    cy.visit("/posts");
    cy.contains("create new post").click();

    cy.get("#message").type("Hello, here's a happy coo!");
    cy.get("#photo").type("https://oldmooresalmanac.com/wp-content/uploads/2017/11/cow-2896329_960_720-Copy.jpg")
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, here's a happy coo!");
    cy.get(".imgupload").should("have.attr", "src").should("include", "https://oldmooresalmanac.com/wp-content/uploads/2017/11/cow-2896329_960_720-Copy.jpg")
  });

  // Shouldn't work, but does, possibly due to Cypress' browser
  //
  // it("can submit an image as a post", () => {
  //   // sign in
  //   cy.task("seedUsers", "userCanSubmitPost")
  //   cy.visit("/sessions/new");
  //   cy.get("#email").type("picard@ng.com");
  //   cy.get("#password").type("makeItSo");
  //   cy.get("#submit").click();
    
  //   // submit a post
  //   cy.task("seedPosts", "userCanSubmitPost")
  //   cy.visit("/posts");
  //   cy.contains("create new post").click();

  //   cy.get("#photo").type("https://live.staticflickr.com/2275/2366822806_5dd2352131.jpg");
  //   cy.get("#new-post-form").submit();
  //   cy.get(".imgupload").should("have.attr", "src").should("include", "https://live.staticflickr.com/2275/2366822806_5dd2352131.jpg");
  // });
});
