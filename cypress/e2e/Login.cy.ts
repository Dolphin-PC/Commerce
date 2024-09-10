beforeEach(() => {
  cy.visit("/sign-in");
});

it("회원가입 ", () => {
  cy.findByText("Sign In").click();
});
