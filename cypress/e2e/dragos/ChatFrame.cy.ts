import { chatFrame } from "../../ui-manager/dragos/pages/pages";

describe("Test Chat Functionality", () => {

  beforeEach(() => {
    cy.visit('/');
  });


  const values = [
    { name: "Chinatown", email: "china123@mail.com", msg: "help" },
    { name: "user2", email: "chinamail@mail.com", msg: "help 3" },
    { name: "john", email: "john@john.com", msg: "booking" },


  ];

  it('should verify that the chat button is visible and clickable', () => {
    cy.wait(3000)
    cy.get('#comp-jr4sqg2g > .nKphmK')
    .scrollIntoView() 
    .its('0.contentDocument') 
    .should('exist')
    .then((iframeDoc) => {
        const body = iframeDoc.body;
        //console.log(body.innerHTML); 

        // Ensure the body is not empty
        expect(body.innerHTML).to.not.be.empty;

        cy.wrap(body)
            .find(chatFrame.chatBtn) 
            .should('be.visible') 
            .scrollIntoView() 
            .then(($button) => { 
                    cy.wrap($button).click(); 
            });

        cy.wrap(body)
            .find('div[data-hook="expanded-widget"]') 
            .should('be.visible') // Check if the chat widget is visible
            .and('contain', 'Online')
            .and('contain', 'Intern'); // Check if operator Intern is online
    });
  });

  values.forEach((element) => {
    it('chat form test', () => {
      cy.wait(5000);
      const messageToSend = element.msg; 
  
      cy.get(chatFrame.iframeSelector)
        .scrollIntoView()
        .its('0.contentDocument')
        .should('exist')
        .then((iframeDoc) => {
          const body = iframeDoc.body;
  
          // check body not empty
          expect(body.innerHTML).to.not.be.empty;
  
          cy.wrap(body)
            .find(chatFrame.chatBtn)
            .should('be.visible')
            .scrollIntoView()
            .then(($button) => {
              cy.wrap($button).click(); 
            });
  
          // Type a message into the chat
          cy.wrap(body)
            .find(chatFrame.chatTextArea)
            .should('be.visible')
            .type(messageToSend); // dynamic message from element
  
          cy.wrap(body)
            .find(chatFrame.sendBtn)
            .should('be.visible')
            .click(); // send message button
  
          // Verify that the message appears in the chat window
          cy.wrap(body)
            .find(chatFrame.chatMessages)
            .last()
            .should('contain', messageToSend); 
  
          cy.wrap(body)
            .find(chatFrame.chatForm)
            .should('exist')
            .and('be.visible');
  
          cy.wrap(body)
            .find(chatFrame.inputName)
            .should('be.visible')
            .type(element.name); // name from element
  
          cy.wrap(body)
            .find(chatFrame.inputEmail)
            .should('be.visible')
            .type(element.email); // email from element
  
          cy.wrap(body)
            .find(chatFrame.inputMessage)
            .should('be.visible')
            .type('booking problems'); // Static message 
  
          // Submit the form
          cy.wrap(body)
            .find(chatFrame.submitForm) // submit button
            .should('be.visible')
            .click();
  
          // Verify success message feedback
          cy.wrap(body)
            .find(chatFrame.formFeedback)
            .should('contain', 'Thanks! Message us here.');
        });
    });
  });

    it('chat form invalid email data test', () => {
      cy.wait(3000);
  
      cy.get(chatFrame.iframeSelector)
        .scrollIntoView()
        .its('0.contentDocument')
        .should('exist')
        .then((iframeDoc) => {
          const body = iframeDoc.body;
  
          // Ensure the body is not empty
          expect(body.innerHTML).to.not.be.empty;
  
          // Open chat by clicking chat button
          cy.wrap(body)
            .find(chatFrame.chatBtn)
            .should('be.visible')
            .scrollIntoView()
            .then(($button) => {
              cy.wrap($button).click(); // click chat button
            });
  
          // Type a message into the chat
          cy.wrap(body)
            .find(chatFrame.chatTextArea)
            .should('be.visible')
            .type("messageToSend"); // dynamic message from element
  
          cy.wrap(body)
            .find(chatFrame.sendBtn)
            .should('be.visible')
            .click(); 
  
          // check if the message appears in the chat window
          cy.wrap(body)
            .find(chatFrame.chatMessages)
            .last()
            .should('contain', "messageToSend"); 
  
          cy.wrap(body)
            .find(chatFrame.chatForm)
            .should('exist')
            .and('be.visible');
  
          // Fill the form 
          cy.wrap(body)
            .find(chatFrame.inputName)
            .should('be.visible')
            .type("element.name"); 
  
          cy.wrap(body)
            .find(chatFrame.inputEmail)
            .should('be.visible')
            .type("element.email"); 
  
          // Check for invalid email format
            cy.wrap(body)
              .find(chatFrame.chatEmailError) // error message element
              .should('be.visible')
              .and('contain', 'Enter a valid email address');
  
            // Attempt to click Submit button
            cy.wrap(body)
              .find(chatFrame.submitForm) // Submit button selector
              .should('be.visible')
              .click();
  
            // form needs to be visible after clicking submit with an invalid email
            cy.wrap(body)
              .find(chatFrame.chatForm)
              .should('exist')
              .and('be.visible');
  
            // "Thank You" message does NOT appear
            cy.wrap(body)
              .find(chatFrame.formFeedback)
              .should('not.exist'); // No success message when email is invalid
          
        });
    });

    it('chat form invalid name data test', () => {
        cy.wait(3000);
        const nothing = '';
        cy.get(chatFrame.iframeSelector)
          .scrollIntoView()
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            const body = iframeDoc.body;
    
            // Ensure the body is not empty
            expect(body.innerHTML).to.not.be.empty;
    
            // Open chat by clicking chat button
            cy.wrap(body)
              .find(chatFrame.chatBtn)
              .should('be.visible')
              .scrollIntoView()
              .then(($button) => {
                cy.wrap($button).click(); // click chat button
              });
    
            // Type a message into the chat
            cy.wrap(body)
              .find(chatFrame.chatTextArea)
              .should('be.visible')
              .type("input test"); 
    
            cy.wrap(body)
              .find(chatFrame.sendBtn)
              .should('be.visible')
              .click(); 
    
            // check if the message appears in the chat window
            cy.wrap(body)
              .find(chatFrame.chatMessages)
              .last()
              .should('contain', "input test"); 
    
            cy.wrap(body)
              .find(chatFrame.chatForm)
              .should('exist')
              .and('be.visible');
    
            // Fill the form 
             //no message
    
            cy.wrap(body)
              .find(chatFrame.inputEmail)
              .should('be.visible')
              .type("element.email@mail.com"); 
    
            // Check for invalid email format
              cy.wrap(body)
                .find(chatFrame.chatNameError) // error message element
                .should('be.visible')
                .and('contain', 'Make sure to add your name.');
    
              // Attempt to click Submit button
              cy.wrap(body)
                .find(chatFrame.submitForm) // Submit button selector
                .should('be.visible')
                .click();
    
              // form needs to be visible after clicking submit with an invalid email
              cy.wrap(body)
                .find(chatFrame.chatForm)
                .should('exist')
                .and('be.visible');
    
              // "Thank You" message does NOT appear
              cy.wrap(body)
                .find(chatFrame.formFeedback)
                .should('not.exist'); // No success message when email is invalid
            
          });
      });

    it.skip('chat emoji test', () => {
    cy.wait(3000);
    const messageToSend = "element.msg"; 
    
    cy.get(chatFrame.iframeSelector)
        .scrollIntoView()
        .its('0.contentDocument')
        .should('exist')
        .then((iframeDoc) => {
        const body = iframeDoc.body;
    
        // check body is not empty
        expect(body.innerHTML).to.not.be.empty;
    
        cy.wrap(body)
            .find(chatFrame.chatBtn)
            .should('be.visible')
            .scrollIntoView()
            .then(($button) => {
            cy.wrap($button).click(); 
            });
    
        // Type a message into the chat
        cy.wrap(body)
            .find(chatFrame.chatTextArea)
            .should('be.visible')
            .type(messageToSend); // dynamic message from element
    
        cy.wrap(body)
            .find(chatFrame.sendBtn)
            .should('be.visible')
            .click(); // send message button
    
        // Verify that the message appears in the chat window
        cy.wrap(body)
            .find(chatFrame.chatMessages)
            .last()
            .should('contain', messageToSend); 
    
        cy.wrap(body)
            .find(chatFrame.chatForm)
            .should('exist')
            .and('be.visible');
    
        cy.wrap(body)
            .find(chatFrame.inputName)
            .should('be.visible')
            .type("element.name"); // name from element
    
        cy.wrap(body)
            .find(chatFrame.inputEmail)
            .should('be.visible')
            .type("element.emaial@mail.com"); // email from element
    
        cy.wrap(body)
            .find(chatFrame.inputMessage)
            .should('be.visible')
            .type('booking problems'); // Static message 
    
        // Submit the form
        cy.wrap(body)
            .find(chatFrame.submitForm) // submit button
            .should('be.visible')
            .click();
    
        // Verify success message feedback
        cy.wrap(body)
            .find(chatFrame.formFeedback)
            .should('contain', 'Thanks! Message us here.');
    
        // Click the emoji button to open the emoji list
        cy.wrap(body)
            .find('button.sk1yM')
            .should('be.visible')
            .click(); // Click emoji button to open emoji list
    
        // Wait for the emoji list to appear, then select a random emoji
        cy.wrap(body)
            .find('[data-hook="input keyboards"]')
            .should('be.visible')
            .then(($emojis) => {
            // Get the total number of emojis
            const emojiCount = $emojis.length;
    
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * emojiCount);
    
            // Select the emoji at the random index and click it
            cy.wrap($emojis[randomIndex]).click();
            });
    
        // Verify that the emoji is sent in the chat
        cy.wrap(body)
            .find(chatFrame.chatMessages)
            .last()
            .should('contain', '😊'); 
        });
    });
      
});
