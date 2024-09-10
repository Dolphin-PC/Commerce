beforeEach(function () { });
it("로그인 성공", function () {
    cy.login(false);
    cy.assertUrl("/");
    cy.findByTestId("user-icon-button").should("exist");
});
