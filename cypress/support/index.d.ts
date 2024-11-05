// cypress/support/index.d.ts

// Extend Cypress' Chainable interface to include the custom `getIframeBody` command
declare namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Custom command to get the body of an iframe.
       * @param iframeSelector The selector for the iframe element.
       * @returns The iframe body wrapped as a Cypress chainable object for further chaining.
       */
      getIframeBody(iframeSelector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
  