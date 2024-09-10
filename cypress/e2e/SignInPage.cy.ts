beforeEach(() => {});

it("로그인 성공", () => {
  cy.login();

  cy.assertUrl("/");
  cy.findByTestId("user-icon-button").should("exist");
});
