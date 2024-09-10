/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";
import { Method, RouteHandler } from "node_modules/cypress/types/net-stubbing";
import { Database } from "@/shared/config/@db/database-generated.type";

// type T = TableName extends string & keyof Schema['Tables']
type Table = keyof Database["public"]["Tables"];

declare global {
  namespace Cypress {
    interface Chainable {
      assertUrl(url: string): Chainable<void>;
      login(): Chainable<void>;
      interceptor_supabase_auth(method: Method, response?: RouteHandler): Chainable<() => {}>;
      interceptor_supabase_db(method: Method, table: Table, response?: RouteHandler): Chainable<() => {}>;
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

Cypress.Commands.add("interceptor_supabase_auth", (method, response) => {
  cy.intercept(method, `${Cypress.env("supabase_auth_url")}*`, response);
});

Cypress.Commands.add("interceptor_supabase_db", (method, table, response) => {
  cy.intercept(method, `${Cypress.env("supabase_db_url")}${table}*`, response);
});
