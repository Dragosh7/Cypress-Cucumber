import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { calendar, formatDateForSearch, verifyCheckInDateDisplay, verifyCheckOutDateDisplay, isDisabledDate, adjustGuestCount, selectDateInCheckOutIframe, selectDateInCheckInIframe } from "../../pages/Calendar";
import { baseUrl } from "../../pages/ChatForm";


Given('the user navigates to the homepage', () => {
    cy.wait(3000)
    cy.visit(baseUrl);
});

When('the user selects a check-in date {string} days from today', (dayOffset: string) => {
    selectDateInCheckInIframe(parseInt(dayOffset));
});

When('the user selects a check-out date {string} days from today', (dayOffset: string) => {
    selectDateInCheckOutIframe(parseInt(dayOffset));
});

Then('the check-in field should display the selected date {string}', (dayOffset: string) => {
    verifyCheckInDateDisplay(parseInt(dayOffset));
});

Then('the check-out field should display the selected date {string}', (dayOffset: string) => {
    verifyCheckOutDateDisplay(parseInt(dayOffset));
});

When('the user attempts to select a past check-in date 2 days before today', () => {
    const date = new Date();
    date.setDate(date.getDate() - 2);

    cy.wrap(date).as('selectedPastDate');

});

Then('the past date should be grayed out and not selectable', () => {
    cy.get('@selectedPastDate').then((date) => {
        const typedDate = date as unknown as Date; // Explicitly cast through `unknown` to `Date`
        //const formattedDate = formatDateForSearch(typedDate);

        cy.get(calendar.iframeSelector)
            .its('0.contentDocument')
            .find(calendar.checkInButton)
            .should('exist').click();
        isDisabledDate(typedDate);
    });
});


When('the user changes the number of adults {string}', (action: string) => {
    cy.wait(3000);
    adjustGuestCount("adults", action);
});

Then('the adults field should display {string}', (expected: string) => {
    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.adultsValue)
      .should('have.text', expected);
});

When('the user changes the number of kids {string}', (action: string) => {
    cy.wait(5000);
    adjustGuestCount("children", action);
});

Then('the kids field should display {string}', (expected: string) => {
    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.childrenValue)
      .should('have.text', expected);
});

Given('the user has entered valid check-in and check-out dates', () => {

    //cy.get(calendar.iframeSelector).its('0.contentDocument').find('#search-widget #check-in').click();
    selectDateInCheckInIframe(0); // today's date

    //cy.get(calendar.iframeSelector).its('0.contentDocument').find('#search-widget #check-out').click();
    selectDateInCheckOutIframe(3);
    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.checkOutButton).click(); //closing the check-out calendar
});

Given('the default adult value is at least 1', () => {
    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.adultsValue).contains('1');
});

When('the user clicks the search button', () => {
    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.searchButton)
      .click();
});

Then('the user should be redirected to the rooms page', () => {
    cy.wait(3000)
    cy.url().should('contain', '/rooms');
});
