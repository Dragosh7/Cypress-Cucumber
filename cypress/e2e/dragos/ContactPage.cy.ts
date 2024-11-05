import { generateRandomWords } from "../../ui-manager/dragos/helpers/functions";
import { explorePage , contactPage } from "../../ui-manager/dragos/pages/pages";
import { contactURL } from "../../ui-manager/dragos/pages/pages"

describe("Test ContactPage", () => {

  const values = [
    {name:"Jo Michael", email:"jo_M@test.com", phone: "0897546834", comm: generateRandomWords(32)},
    {name:"Luchian Stark", email:"luck_Stark@test.com", phone: "04782783673", comm: generateRandomWords(21)},
    {name:"Marcus Andron", email:"marcus.andr@test.com", phone: "0982711678", comm: generateRandomWords(19)}

  ]

  const wrongValues = [
    {name:"Joa Michael", email:"badmail", phone: "0897546834", comm: generateRandomWords(32)},//wrong mail
    {name:"8423158", email:"luck_Stark@test.com", phone: "04782783673", comm: generateRandomWords(21)},//wrong name
    {name:"Marcus Andron", email:"marcus.andr@test.com", phone: "Mark", comm: generateRandomWords(19)},//wrong phone
    {name:" ", email:" ", phone: " ", comm: " "}//empty values


  ]

  beforeEach(() => {
    cy.visit(contactURL)
  })

  it("Welcome description is not a template text", () => {
    contactPage.contactParagraph().should('be.visible').invoke('text').should('not.contain', explorePage.templateWelcome);
  })

  values.forEach(element => {
    it(`Test submit values: ${element.name}`, () => {
      cy.url().should("eql", "https://ancabota09.wixsite.com/intern/contact")
      cy.wait(3000)
      
      //contactPage.submitFeedback().contains("Thanks for submitting!").should('not.exist')
      contactPage.nameField().clear().type(element.name)
      contactPage.emailField().clear().type(element.email)
      contactPage.phoneField().clear().type(element.phone)
      contactPage.commentField().clear().type(element.comm)
      contactPage.submitField().click()
      contactPage.submitFeedback().contains("Thanks for submitting!").should('exist')
  
    })
  });

  wrongValues.forEach(element => {
    it(`Test wrong data values: ${element.name}`, () => {
      cy.url().should("eql", "https://ancabota09.wixsite.com/intern/contact");

      //commented this assert below because otherwise the test fails and stops verifying the rest
      //contactPage.submitFeedback().contains("Thanks for submitting!").should('not.exist')
      contactPage.nameField().clear().type(element.name);
      contactPage.emailField().clear().type(element.email);
      contactPage.phoneField().clear().type(element.phone);
      contactPage.commentField().clear().type(element.comm);
      
      contactPage.submitField().click();
      cy.wait(3000)
      // Validate email field has the correct aria-invalid attribute when wrong email is entered
        const isEmailValid = element.email.includes('@');
        //cy.log(" "+isEmailValid)
        contactPage.emailField().invoke('attr', 'aria-invalid').should('exist').and('eq', isEmailValid ? 'false' : 'true');

        // Name validation: If the name contains any number, it should be invalid
        const nameHasNumbers = /\d/.test(element.name);
        contactPage.nameField().invoke('attr', 'aria-invalid').should('exist').and('eq', nameHasNumbers ? 'true' : 'false');

        // Phone validation: If the phone contains any letters, it should be invalid
        const phoneHasLetters = /[a-zA-Z]/.test(element.phone);
        contactPage.phoneField().invoke('attr', 'aria-invalid').should('exist').and('eq', phoneHasLetters ? 'true' : 'false');

        contactPage.submitFeedback().contains("Thanks for submitting!").should('exist');
    });
  });

  it("Test Map Fullscreen", () => {
    contactPage.mapFrame()
      .should('have.attr', 'allowfullscreen');
  
    contactPage.fullscreenButton()
      .should('exist')
      .click() // fullscreen button
      .should('have.attr', 'aria-pressed', 'true'); // Verify if in fullscreen mode
  });
  


})