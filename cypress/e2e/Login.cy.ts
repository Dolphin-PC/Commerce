beforeEach(() => {});

it("로그인 성공", () => {
  // cy.visit("/sign-in");

  // cy.findByLabelText("Email").type(Cypress.env("userId"));
  // cy.findByLabelText("Password").type(Cypress.env("password"));

  // cy.findByText("Sign In").click();
  cy.login();

  cy.assertUrl("/");
});
