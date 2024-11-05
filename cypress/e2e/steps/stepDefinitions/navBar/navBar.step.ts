import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { baseUrl, navBar } from "../../pages/NavigationBar";

Given('the homepage is loaded successfully', () => {
  cy.visit(baseUrl);
  cy.wait(3000);
});

When("the page is fully loaded", () => {
  cy.url().should("include", baseUrl);
});

Then('the "{word}" button should be displayed', (button: string) => {
  const buttonMethod = `${button.toLowerCase()}Button`; 
  navBar[buttonMethod]().should("be.visible");
});

When('the "{word}" button is clicked', (button: string) => {
  const clickMethod = `clickOn${button}Button`; 
  if (typeof navBar[clickMethod] === 'function') {
    navBar[clickMethod](); 
  } else {
    throw new Error(`Method ${clickMethod} not found in navBar.`);
  }
  cy.wait(3000);
});

Then('the "{word}" button color turns white', (button: string) => {
  cy.wait(1000);
  const buttonMethod = `${button.toLowerCase()}Button`;
  navBar[buttonMethod]().should("have.css", "color", "rgb(255, 255, 255)");
});

Then('the "{word}" page should load successfully', (button: string) => {
  const pageUrls: { [key: string]: string } = {
    Book: `${baseUrl}/book-now`,
    Contact: `${baseUrl}/contact`,
    Rooms: `${baseUrl}/rooms`,
    Explore: `${baseUrl}/explore`,
    Home: baseUrl,
  };

  cy.url().should("eq", pageUrls[button]);
});
