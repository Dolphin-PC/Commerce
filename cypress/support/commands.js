/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";
// custom commands https://docs.cypress.io/api/cypress-api/custom-commands
// custom queries https://docs.cypress.io/api/cypress-api/custom-queries
Cypress.Commands.add("assertUrl", function (url) {
    cy.url().should("eq", "".concat(Cypress.env("baseUrl")).concat(url));
});
Cypress.Commands.add("login", function (isSeller) {
    var id, pw;
    if (isSeller) {
        id = Cypress.env("sellerId");
        pw = Cypress.env("sellerPw");
    }
    else {
        id = Cypress.env("userId");
        pw = Cypress.env("userPw");
    }
    cy.session(id, function () {
        cy.visit("/sign-in");
        cy.findByLabelText("Email").type(id);
        cy.findByLabelText("Password").type(pw);
        cy.findByText("Sign In").click();
        cy.location("pathname").should("eq", "/");
    });
    cy.visit("/");
});
Cypress.Commands.add("interceptor_supabase_auth", function (method, response) {
    cy.intercept(method, "".concat(Cypress.env("supabase_auth_url"), "*"), response);
});
Cypress.Commands.add("interceptor_supabase_db", function (method, table, response) {
    cy.intercept(method, "".concat(Cypress.env("supabase_db_url")).concat(table, "*"), response);
});
