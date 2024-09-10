import { ROUTES } from "@/shared/consts/route.const";
/**
 * @desc 회원가입 페이지
 */
it.only("회원가입 성공", function () {
    //* given
    cy.visit(ROUTES.SIGNUP);
    cy.findByLabelText("Email").type(Cypress.env("registerId"));
    cy.findByLabelText("Password").type(Cypress.env("registerPW"));
    cy.findByLabelText("Confirm Password").type(Cypress.env("registerPW"));
    cy.findByLabelText("Nickname").type("cypress");
    //* when
    // Auth
    cy.interceptor_supabase_auth("POST", {
        statusCode: 200,
        body: {
            user: 123,
        },
    });
    cy.interceptor_supabase_db("POST", "user", {
        statusCode: 200,
    });
    cy.findByText("Sign Up").click();
    //* then
    cy.findByText("회원가입이 완료되었습니다.");
    cy.findByText("로그인 페이지로 이동합니다.");
    cy.assertUrl(ROUTES.SIGNIN);
});
