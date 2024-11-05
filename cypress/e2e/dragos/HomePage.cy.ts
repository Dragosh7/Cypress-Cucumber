/// <reference types="cypress-iframe" />
import { homepage, homeURL, contactURL, exploreURL, roomsPage, roomsURL } from "../../ui-manager/dragos/pages/pages";
import 'cypress-iframe' ;
import { isDisabledDate, selectDateInIframe } from "../../ui-manager/dragos/helpers/functions";

const formatDateForSearch = (date: Date): string => {
    const day = date.getDate();
    const year = date.getFullYear();

    const monthMap = {
        0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
        6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
    };

    const month = monthMap[date.getMonth()]; // custom mapping for 3-letter month. Because cypress returns Sept instead of Sep

    return `${day} ${month} ${year}`;
};


describe("Test Homepage", () => {

    beforeEach(() => {
        cy.visit(homeURL);
    })


    it('Future Date Selection Check-In Calendar', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);

        cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in').should('exist').click();
        selectDateInIframe(futureDate);
       
        const formattedDate = formatDateForSearch(futureDate);

        cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in-value')
            .should('have.text', (formattedDate));
    });

    it('Today Date Selection Check-In Calendar', () => {
        const today = new Date();

        cy.get(homepage.iframeSelector).its('0.contentDocument').find('#search-widget #check-in').should('exist').click();
        selectDateInIframe(today);

        const formattedDate = formatDateForSearch(today);

        cy.get(homepage.iframeSelector).its('0.contentDocument').find('#search-widget #check-in-value')
            .should('have.text', formattedDate);
    });

    it('Past Date Selection Check-In Calendar', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 2);

        cy.get(homepage.iframeSelector).its('0.contentDocument').find('#search-widget #check-in').should('exist').click();
        isDisabledDate(pastDate)
    });

    it('Adults Increase Button', () => {
        cy.wait(3000)

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults > .up').click({ force: true,  multiple: true }); 

    
        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults span.value.ng-binding')
            .should('have.text', '2');
    });

    it('Adults Decrease Button from 1 should remain 1', () => {
        cy.wait(3000)

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults > .down').click({ force: true,  multiple: true }); 


        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults span.value.ng-binding')
            .should('have.text', '1');
    });

    it('Adults Decrease Button', () => {
        cy.wait(3000)

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults > .up').click({ force: true,  multiple: true }); 

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults > .up').click({ force: true,  multiple: true }); 
    

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults span.value.ng-binding')
            .should('have.text', '3');

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults > .down').click({ force: true,  multiple: true }); 


        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults span.value.ng-binding')
            .should('have.text', '2');
    });

    it('Children Increase Button', () => {
        cy.wait(3000)

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children > .up').click({ force: true,  multiple: true }); 

    
        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children span.value.ng-binding')
            .should('have.text', '1');
    });

    it('Children Decrease Button should not go lower than 0', () => {
        cy.wait(3000)

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children > .down').click({ force: true,  multiple: true }); 

    
        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children span.value.ng-binding')
            .should('have.text', '0');
    });

    it('Children Decrease', () => {
        cy.wait(3000)

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children > .up').click({ force: true,  multiple: true }); 
        
        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children > .up').click({ force: true,  multiple: true }); 

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children > .up').click({ force: true,  multiple: true }); 

    
        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children span.value.ng-binding')
            .should('have.text', '3');

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children > .down').click({ force: true,  multiple: true }); 

    
        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#children span.value.ng-binding')
            .should('have.text', '2');
    });

    it('Search Widget Test', () => {
        const today = new Date();
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + 3);

        cy.get(homepage.iframeSelector).its('0.contentDocument').find('#search-widget #check-in').should('exist').click();
        selectDateInIframe(today);

        cy.get(homepage.iframeSelector).its('0.contentDocument').find('#search-widget #check-out').should('exist').click();
        selectDateInIframe(nextDate);

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('#adults > .up').click({ force: true,  multiple: true }); 

        cy.get(homepage.iframeSelector)
            .its('0.contentDocument')
            .find('button[ng-click="filter($root.endpoint)"]') 
            .should('be.visible') 
            .click();

        cy.url().should('include', '/rooms');
    });

    it('Validates the Home button name, hover color, and redirection', () => {
        // Validate button name
        homepage.homeButton().should('contain', 'HOME');
    
        // Click the button and validate redirection
        homepage.clickOnHomeButton();
        cy.url().should('eq', homeURL);

        homepage.homeButton()
          .trigger('mouseover')
          .should('have.css', 'color', 'rgb(255, 255, 255)');

      });
    
    it('Validates the Rooms button name, hover color, and redirection', () => {
        // Validate button name
        homepage.roomsButton().should('contain', 'ROOMS');
    
        // Click the button and validate redirection
        homepage.clickOnRoomsButton();
        cy.url().should('eq', roomsURL);

        homepage.roomsButton()
          .trigger('mouseover')
          .should('have.css', 'color', 'rgb(255, 255, 255)');
    
      });
    
    it('Validates the Explore button name, hover color, and redirection', () => {
        // Validate button name
        homepage.exploreButton().should('contain', 'EXPLORE');
    
        // Click the button and validate redirection
        homepage.clickOnExploreButton();
        cy.url().should('eq', exploreURL);

        // Hover on the Explore button and check if the color turns white
        homepage.exploreButton()
          .trigger('mouseover')
          .should('have.css', 'color', 'rgb(255, 255, 255)');
    
      });
    
    it('Validates the Contact button name, hover color, and redirection', () => {
        // Validate button name
        homepage.contactButton().should('contain', 'CONTACT');
    
        // Click the button and validate redirection
        homepage.clickOnContactButton();
        cy.url().should('eq', contactURL);

        // Hover on the Contact button and check if the color turns white
        homepage.contactButton()
          .trigger('mouseover')
          .should('have.css', 'color', 'rgb(255, 255, 255)');
      });
    
    it('Validates the Book button name, hover color, and clickability', () => {
        homepage.bookButton().should('contain', 'BOOK NOW');

        // Click the Book button
        homepage.clickOnBookButton();
        cy.url().should('not.eq',roomsURL);

        // Hover on the Book Now button and check if the color turns white
        homepage.bookButton()
          .trigger('mouseover')
          .should('have.css', 'color', 'rgb(255, 255, 255)');

      });

    it('Facebook Button Test', () => {
        homepage.facebookButton().should('be.visible').invoke('removeAttr', 'target').click();
        const facebookPageUrl = homepage.facebookPageUrl
        // Handle cross-origin issues for Facebook
        cy.origin('https://www.facebook.com', { args: { facebookPageUrl } }, ({ facebookPageUrl }) => {
            cy.on('uncaught:exception', (err) => {
                if (err.message.includes('Some expected error message')) {
                    return false; // Prevent test failure
                }
            });
            cy.url().should('include', facebookPageUrl);
            cy.url().should('include', "wix");

        });
    });

    it('Twitter Button Test', () => {
        homepage.twitterButton().should('be.visible').invoke('removeAttr', 'target').click();
        const twitterPageUrl = homepage.twitterPageUrl
        // Handle cross-origin issues for Twitter
        cy.origin('https://x.com', { args: { twitterPageUrl } }, ({ twitterPageUrl }) => {
            cy.on('uncaught:exception', (err) => {
                if (err.message.includes('Some expected error message')) {
                    return false; // Prevent test failure
                }
            });
            cy.url().should('include', twitterPageUrl);
            cy.url().should('include', "wix");
        });
    });
    
    it('Pinterest Button Test', () => {
        homepage.pinterestButton().should('be.visible').invoke('removeAttr', 'target').click();
        const pinterestPageUrl = homepage.pinterestPageUrl
        // Handle cross-origin issues for Pinterest
        cy.origin('https://www.pinterest.com', { args: { pinterestPageUrl } }, ({ pinterestPageUrl }) => {
            cy.on('uncaught:exception', (err) => {
                if (err.message.includes('Some expected error message')) {
                    return false; // Prevent test failure
                }
            });
            cy.url().should('include', pinterestPageUrl);
            cy.url().should('include', "wix");
        });
    });

    it('Wix Button Test', () => {
        homepage.wixButton().should('be.visible').invoke('removeAttr', 'target').click();
        cy.url().should('include', homepage.wixPageUrl);
    });

    it('Mail To Button Test', () => {
        homepage.contactMailButton().should('be.visible').then(($link) => {
            const href = $link.attr('href');
            expect(href).to.include('mailto:');
            expect(href).to.include(homepage.linkAddress);
        });
    });





})