/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      assertUrl(url: string): Chainable<void>;
      login(): Chainable<void>;
    }
  }
}

// custom commands https://docs.cypress.io/api/cypress-api/custom-commands
// custom queries https://docs.cypress.io/api/cypress-api/custom-queries

Cypress.Commands.add("assertUrl", (url) => {
  cy.url().should("eq", `${Cypress.env("baseUrl")}${url}`);
});

Cypress.Commands.add("login", () => {
  const userId = Cypress.env("userId");
  const password = Cypress.env("password");

  cy.session(userId, () => {
    cy.visit("/sign-in");

    cy.findByLabelText("Email").type(userId);
    cy.findByLabelText("Password").type(password);
    cy.findByText("Sign In").click();

    cy.location("pathname").should("eq", "/");
  });

  cy.visit("/");
});

// 커스텀 쿼리 예제
// Cypress.Commands.addQuery('get', () => {
//     const getFn = cy.now('get', '[data-testid="cart-icon"]');

// inner function 형태로 반환해야 함
//     return subject => {
//         const btn = getFn(subject);

//         return btn;
//     }
// })
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
