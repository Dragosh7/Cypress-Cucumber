import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import {chatFrame, baseUrl} from  '../../pages/ChatForm'

function getIframeBody(selector) {
    return cy
      .get(selector) // get the iframe
      .scrollIntoView() // scroll to make it visible
      .its('0.contentDocument.body') // get the document of the iframe
      .should('not.be.empty') // ensure the body exists
      .then(cy.wrap); // wrap it so we can interact with it
  }

Given('the home page is opened', ()=> {
    cy.visit(baseUrl)
    cy.wait(3000)
})

Given('the user sees the Chat icon', () => {
    getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.chatBtn) 
    .should('be.visible'); 
});
  
When('the user clicks on the chat button', () => {
    getIframeBody(chatFrame.iframeSelector) 
      .find(chatFrame.chatBtn) 
      .click(); 
});

When('the user types {string} in the “Write your message” field', (message:string) => {
  getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.chatTextArea)
    .should('be.visible')
    .type(message); // message 
});

When('the user sends an emoji in the “Write your message” field', () => {
  getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.chatEmojiTab)
    .should('be.visible').first()
    .click()

  // Capture the emoji text and click the emoji button
  getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.firstEmojiAvailable)
    .should('be.visible')
    .first()
    .invoke('text')
    .then((emojiText) => {
      // Click the emoji button
      getIframeBody(chatFrame.iframeSelector)
        .find(chatFrame.firstEmojiAvailable)
        .click();

      // Store the emoji text for later use
      cy.wrap(emojiText.trim()).as('selectedEmoji');})

});

When('the send button is clicked', () => {
  getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.sendBtn)
    .should('be.visible')
    .click(); // send message button
});

When('the user enters a name {string}', (name: string) => {
  getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.inputName)
    .should('be.visible')
    .type(name); // name 
});

When('enters a email {string}', (email: string) => {
  getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.inputEmail)
    .should('be.visible')
    .type(email); // email 
});

When('writes the message {string} between 1-80 characters', (message: string) => {
  getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.inputMessage)
    .should('be.visible')
    .type(message); // message 
});

When('clicks on the submit button', () => {
  getIframeBody(chatFrame.iframeSelector) 
    .find(chatFrame.submitForm) // submit button
    .should('be.visible')
    .click();
});
  
Then('the chat window is visible', () => {
    getIframeBody(chatFrame.iframeSelector) 
      .find(chatFrame.openChatButton) 
      .should('be.visible') 
      .and('contain', 'Online'); 
});
  
Then('the user can see an operator online', () => {
    getIframeBody(chatFrame.iframeSelector) 
      .find(chatFrame.openChatButton) 
      .should('contain', 'Intern'); 
});

Then('the message {string} that was sent should be displayed', (message:String) => {
getIframeBody(chatFrame.iframeSelector)
  .find(chatFrame.chatMessages)
  .last()
  .should('contain', message); 
});

Then('a form for completion is received', (message:String) => {
  cy.wait(2000)

  getIframeBody(chatFrame.iframeSelector)
  .find(chatFrame.chatForm)
  .should('exist')
  .and('be.visible');
});

Then('the form is submitted successfully with a confirmation', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.formFeedback)
    .should('contain', 'Thanks! Message us here.');
});

Then('the NAME field provides a failure message', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.chatNameError) // error message element
    .should('be.visible')
    .and('contain', 'Make sure to add your name.');
});

Then('the EMAIL field provides a failure message', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.chatEmailError) // error message element
    .should('be.visible')
    .and('contain', 'Enter a valid email address.');
});

Then('the message field stops at exactly 80 characters', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.messageCounter) // error message element
    .invoke('text').then((text) => {
      // the number before the slash represents the curr number of chars
      const count = parseInt(text.split('/')[0], 10);

      expect(count).to.be.at.most(80);
    });
});

Then('the message contains a rich text', () => {
  cy.get('@selectedEmoji').then((emojiText) => {
    getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.chatMessages)
    .first().should('contain.text', emojiText);
  });
});