export const baseUrl = "https://ancabota09.wixsite.com/intern";

 export const navBar = {
    homeButton: () => cy.get("#i6kl732v0label"),
    clickOnHomeButton: () => cy.get("#i6kl732v0label").should("be.visible").click(),
    roomsButton: () => cy.get("#i6kl732v2label"),
    clickOnRoomsButton: () => cy.get("#i6kl732v2label").should("be.visible").click(),
    exploreButton: () => cy.get("#i6kl732v1label"),
    clickOnExploreButton: () => cy.get("#i6kl732v1label").should("be.visible").click(),
    contactButton: () => cy.get('#i6kl732v3label'),
    clickOnContactButton: () => cy.get('#i6kl732v3label').should("be.visible").click(),
    bookButton: () => cy.get('.l7_2fn'),
    clickOnBookButton: () => cy.get('.l7_2fn').should("be.visible").click(),
    
  }
  