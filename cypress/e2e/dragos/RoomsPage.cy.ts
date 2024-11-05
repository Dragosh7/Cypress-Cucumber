import { roomsURL, roomsPage } from "../../ui-manager/dragos/pages/pages";
import { isDisabledDate, selectDateCheckIn, selectDateCheckOut } from "../../ui-manager/dragos/helpers/functions";

describe("Test RoomsPage", () => {

  beforeEach(() => {
    cy.visit(roomsURL);
  });

  it('Check filters Test', () => {
    cy.wait(3000)
    const today = new Date();
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + 3);

    cy.get(roomsPage.iframeSelector).its('0.contentDocument').find(roomsPage.checkInCalendar()).should('exist').click();
    selectDateCheckIn(today);

    //cy.get(roomsPage.iframeSelector).its('0.contentDocument').find('#check-out').should('exist').click();
    //cy.wait(3000)
    selectDateCheckOut(nextDate);

    cy.get(roomsPage.iframeSelector)
        .its('0.contentDocument')
        .find('#adults > .up').click({ force: true,  multiple: true }); 

    cy.get(roomsPage.iframeSelector)
        .its('0.contentDocument')
        .find('#children > .up').click({ force: true,  multiple: true }); 

    cy.get(roomsPage.iframeSelector)
        .its('0.contentDocument')
        .find(roomsPage.searchButton()) 
        .should('be.visible') 
        .click();

    // format dates for assertion
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const month = today.toLocaleDateString('en-US', options).split(' ')[0]; 
    const startDate = today.getDate(); 
    const endDate = nextDate.getDate(); 
    const numberOfNights = nextDate.getDate() - today.getDate(); // Nr of nights

    cy.get(roomsPage.iframeSelector)
        .its('0.contentDocument')
        .find(roomsPage.filterResults())
        .should('exist')
        .invoke('text')
        .then((text) => {
            // Normalize the text by trimming whitespace
            const normalizedText = text.replace(/\s+/g, ' ').trim();

            expect(normalizedText).to.include(month);
            expect(normalizedText).to.include(`${startDate}`);
            expect(normalizedText).to.include(`${endDate}`);
            expect(normalizedText).to.include(`${numberOfNights} night(s)`);
        });
    });

  it('Test "clear filters" button', () => {
        cy.wait(3000)
        const today = new Date();
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + 3);
    
        cy.get(roomsPage.iframeSelector).its('0.contentDocument').find(roomsPage.checkInCalendar()).should('exist').click();
        selectDateCheckIn(today);
        selectDateCheckOut(nextDate);

        cy.get(roomsPage.iframeSelector)
            .its('0.contentDocument')
            .find(roomsPage.searchButton()) 
            .should('be.visible') 
            .click();
    
        
        cy.get(roomsPage.iframeSelector)
            .its('0.contentDocument')
            .find(roomsPage.filterResults())
            .should('exist')

        cy.get(roomsPage.iframeSelector)
            .its('0.contentDocument')
            .find(roomsPage.clearFiltersBtn())
            .should('exist').click()
        
        cy.get(roomsPage.iframeSelector)
            .its('0.contentDocument')
            .find(roomsPage.filterResults())
            .should('not.exist')
    });

  it('should verify the presence, visibility, and content of standard room descriptions, prices, and features', () => {
        cy.wait(3000)
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.standardRoomDesc()) 
              .should('be.visible')
              .invoke('text')
              .should('not.be.empty');
      
            cy.wrap(iframeDoc)
              .find(roomsPage.standardRoomPrice()) 
              .should('be.visible')
              .invoke('text')
              .should('match', /\d+/);
      
            cy.wrap(iframeDoc)
              .find(roomsPage.standardRoomFeatures()) 
              .should('be.visible')
              .invoke('text')
              .should('not.be.empty');
          });
    });

  it('should verify the presence, visibility, and content of cottage room descriptions, prices, and features', () => {
        cy.wait(3000)
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.cottageRoomDesc()) 
              .should('be.visible')
              .invoke('text')
              .should('not.be.empty');
      
            cy.wrap(iframeDoc)
              .find(roomsPage.cottageRoomPrice()) 
              .should('be.visible')
              .invoke('text')
              .should('match', /\d+/);
      
            cy.wrap(iframeDoc)
              .find(roomsPage.cottageRoomFeatures()) 
              .should('be.visible')
              .invoke('text')
              .should('not.be.empty');
          });
    });

  it('should verify the presence, visibility, and content of classic room descriptions, prices, and features', () => {
        cy.wait(3000)
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.classicRoomDesc()) 
              .should('be.visible')
              .invoke('text')
              .should('not.be.empty');
      
            cy.wrap(iframeDoc)
              .find(roomsPage.classicRoomPrice()) 
              .should('be.visible')
              .invoke('text')
              .should('match', /\d+/);
      
            cy.wrap(iframeDoc)
              .find(roomsPage.classicRoomFeatures()) 
              .should('be.visible')
              .invoke('text')
              .should('not.be.empty');
          });
    });

  it('should verify the standard room title and correct room redirection', () => {
        cy.wait(3000)
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.standardRoomTitle()) 
              .should('be.visible')
              .invoke('text')
              .should('eq',"Standard Suite");
      
            cy.wrap(iframeDoc)
              .find(roomsPage.standardRoom()) 
              .should('be.visible').first().click()

            cy.wait(3000);

            cy.wrap(iframeDoc)
                .find(roomsPage.roomPageTitle()) 
                .should('be.visible').invoke('text')
                .then(text => text.trim()) // Trim whitespace because it contains /n
                .should('eq', "Standard Suite");
          });
    });

  it('should verify the cottage room title and correct room redirection', () => {
        cy.wait(3000)
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.cottageRoomTitle()) 
              .should('be.visible')
              .invoke('text')
              .should('eq',"Cottage");
      
            cy.wrap(iframeDoc)
              .find(roomsPage.cottageRoom()) 
              .should('be.visible').first().click()

            cy.wait(3000);

            cy.wrap(iframeDoc)
                .find(roomsPage.roomPageTitle()) 
                .should('be.visible').invoke('text')
                .then(text => text.trim()) // Trim whitespace because it contains /n
                .should('eq', "Cottage");
          });
    });

  it('should verify the classic room title and correct room redirection', () => {
        cy.wait(3000)
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.classicRoomTitle()) 
              .should('be.visible')
              .invoke('text')
              .should('eq',"Classic App");
      
            cy.wrap(iframeDoc)
              .find(roomsPage.classicRoom()) 
              .should('be.visible').first().click()

            cy.wait(3000);

            cy.wrap(iframeDoc)
                .find(roomsPage.roomPageTitle()) 
                .should('be.visible').invoke('text')
                .then(text => text.trim()) // Trim whitespace because it contains /n
                .should('eq', "Classic App");
          });
    });

  it('test standard room details ', () => {
        cy.wait(3000)
        let currentUrl: string;
        cy.url().then((url) => {
            currentUrl = url; // Store the URL in variable
          });

        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.standardRoom()) 
              .should('be.visible').first().click()

            cy.wait(3000);
            cy.url().should('not.eq',"https://ancabota09.wixsite.com/intern/rooms")

            cy.wrap(iframeDoc)
                .find(roomsPage.roomPageTitle()) 
                .should('be.visible').invoke('text')
                .then(text => text.trim()) // Trim whitespace because it contains /n
                .should('eq', "Standard Suite");

            cy.wrap(iframeDoc)
                .find(roomsPage.roomDescription()) 
                .should('be.visible')
                .invoke('text')
                .then(descriptionText => {
                  const trimmedText = descriptionText.trim();
                  expect(trimmedText).to.not.be.empty; // Should not be empty
                  expect(trimmedText).to.not.equal(roomsPage.templateDescription); 
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomProperties()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Accommodates","a room must specify the number of accomodates"); //a room must specify the number of accomodates
                  expect(trimmedText).to.contain("Beds","a room must provide beds info"); //a room must provide beds info
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomAmenities()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.exist;//("room's amenities should be displayed"); 
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomCheckInAndOut()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Check-In"); 
                  expect(trimmedText).to.contain("Check-Out"); //to contain info about check-in and check-out time

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomTerms()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Minimum nights"); //to contain terms info

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomTerms()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Minimum nights"); //to contain terms info

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.readPolicies())
                .should('be.visible') // button link is visible
                .then(($link) => {
                    $link.removeAttr('target');
                    cy.wrap($link).click();
                    
                    cy.wait(2000)
                    cy.url().should('not.eq', currentUrl); // Ensure URL has changed
        
                    cy.url().should('include', '/terms');
                })
            
          });
    });

  it('test cottage room details ', () => {
        cy.wait(3000)
        let currentUrl: string;
        cy.url().then((url) => {
            currentUrl = url; // Store the URL in variable
          });

        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.cottageRoom()) 
              .should('be.visible').first().click()

            cy.wait(3000);
            cy.url().should('not.eq',"https://ancabota09.wixsite.com/intern/rooms")

            cy.wrap(iframeDoc)
                .find(roomsPage.roomPageTitle()) 
                .should('be.visible').invoke('text')
                .then(text => text.trim()) // Trim whitespace because it contains /n
                .should('eq', "Cottage");

            cy.wrap(iframeDoc)
                .find(roomsPage.roomDescription()) 
                .should('be.visible')
                .invoke('text')
                .then(descriptionText => {
                  const trimmedText = descriptionText.trim();
                  expect(trimmedText).to.not.be.empty; // Should not be empty
                  expect(trimmedText).to.not.equal(roomsPage.templateDescription); 
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomProperties()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Accommodates","a room must specify the number of accomodates"); //a room must specify the number of accomodates
                  expect(trimmedText).to.contain("Beds","a room must provide beds info"); //a room must provide beds info
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomAmenities()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.exist;//("room's amenities should be displayed"); 
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomCheckInAndOut()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Check-In"); 
                  expect(trimmedText).to.contain("Check-Out"); //to contain info about check-in and check-out time

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomTerms()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Minimum nights"); //to contain terms info

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomTerms()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Minimum nights"); //to contain terms info

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.readPolicies())
                .should('be.visible') // button link is visible
                .then(($link) => {
                    $link.removeAttr('target');
                    cy.wrap($link).click();
                    
                    cy.wait(2000)
                    cy.url().should('not.eq', currentUrl); // Ensure URL has changed
        
                    cy.url().should('include', '/terms');
                })
            
          });
    });

  it('test classic room details ', () => {
        cy.wait(3000)
        let currentUrl: string;
        cy.url().then((url) => {
            currentUrl = url; // Store the URL in variable
          });

        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.classicRoom()) 
              .should('be.visible').first().click()

            cy.wait(3000);
            cy.url().should('not.eq',"https://ancabota09.wixsite.com/intern/rooms")

            cy.wrap(iframeDoc)
                .find(roomsPage.roomPageTitle()) 
                .should('be.visible').invoke('text')
                .then(text => text.trim()) // Trim whitespace because it contains /n
                .should('eq', "Classic App");

            cy.wrap(iframeDoc)
                .find(roomsPage.roomDescription()) 
                .should('be.visible')
                .invoke('text')
                .then(descriptionText => {
                  const trimmedText = descriptionText.trim();
                  expect(trimmedText).to.not.be.empty; // Should not be empty
                  expect(trimmedText).to.not.equal(roomsPage.templateDescription); 
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomProperties()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Accommodates","a room must specify the number of accomodates"); //a room must specify the number of accomodates
                  expect(trimmedText).to.contain("Beds","a room must provide beds info"); //a room must provide beds info
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomAmenities()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.exist;//("room's amenities should be displayed"); 
                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomCheckInAndOut()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Check-In"); 
                  expect(trimmedText).to.contain("Check-Out"); //to contain info about check-in and check-out time

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomTerms()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Minimum nights"); //to contain terms info

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.roomTerms()) 
                .should('be.visible')
                .invoke('text') 
                .then((propertiesText) => {
                  const trimmedText = propertiesText.trim(); // Trim whitespace
                  expect(trimmedText).to.not.be.empty; 
                  expect(trimmedText).to.contain("Minimum nights"); //to contain terms info

                });

            cy.wrap(iframeDoc)
                .find(roomsPage.readPolicies())
                .should('be.visible') // button link is visible
                .then(($link) => {
                    $link.removeAttr('target');
                    cy.wrap($link).click();
                    
                    cy.wait(2000)
                    cy.url().should('not.eq', currentUrl); // Ensure URL has changed
        
                    cy.url().should('include', '/terms');
                })
            
          });
    });

  it('test standard room filters ', () => {
        cy.wait(3000)

        var priceValue, newPrice;
        const today = new Date();
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + 3);
        
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.standardRoom()) 
              .should('be.visible').first().click();
        
            cy.wait(3000);
            cy.url().should('not.eq', "https://ancabota09.wixsite.com/intern/rooms");
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomPageTitle()) 
              .should('be.visible').invoke('text')
              .then(text => text.trim()) // Trim whitespace
              .should('eq', "Standard Suite");
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomPrice()) 
              .should('be.visible').invoke('text')
              .then((priceText) => {
                priceValue = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Extract numeric value from text
                expect(priceText).to.not.be.empty; 
                expect(priceValue).to.match(/\d+/);
              });
        
            cy.wrap(iframeDoc)
              .find(roomsPage.checkInCalendar()) 
              .should('be.visible').click();
        
            selectDateCheckIn(today);
            selectDateCheckOut(nextDate);
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomFinalPrice()) 
              .should('be.visible').invoke('text')
              .then((priceText) => {
                newPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Extract numeric value from text
                expect(priceText).to.not.be.empty; 
                expect(newPrice).to.match(/\d+/);
        
                // Compare the new price with the initial price
                expect(newPrice).to.be.greaterThan(priceValue); // Check that the new price is higher
              });
          });
            
          
    });

  it('test cottage room filters ', () => {
        cy.wait(3000)

        var priceValue, newPrice;
        const today = new Date();
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + 3);
        
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.cottageRoom()) 
              .should('be.visible').first().click();
        
            cy.wait(3000);
            cy.url().should('not.eq', "https://ancabota09.wixsite.com/intern/rooms");
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomPageTitle()) 
              .should('be.visible').invoke('text')
              .then(text => text.trim()) // Trim whitespace
              .should('eq', "Cottage");
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomPrice()) 
              .should('be.visible').invoke('text')
              .then((priceText) => {
                priceValue = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Extract numeric value from text
                expect(priceText).to.not.be.empty; 
                expect(priceValue).to.match(/\d+/);
              });
        
            cy.wrap(iframeDoc)
              .find(roomsPage.checkInCalendar()) 
              .should('be.visible').click();
        
            selectDateCheckIn(today);
            selectDateCheckOut(nextDate);
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomFinalPrice()) 
              .should('be.visible').invoke('text')
              .then((priceText) => {
                newPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Extract numeric value from text
                expect(priceText).to.not.be.empty; 
                expect(newPrice).to.match(/\d+/);
        
                // Compare the new price with the initial price
                expect(newPrice).to.be.greaterThan(priceValue); // Check that the new price is higher
              });
          });
            
          
    });

  it('test classic room filters ', () => {
        cy.wait(3000)

        var priceValue, newPrice;
        const today = new Date();
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + 3);
        
        cy.get(roomsPage.iframeSelector)
          .its('0.contentDocument')
          .should('exist')
          .then((iframeDoc) => {
            cy.wrap(iframeDoc)
              .find(roomsPage.classicRoom()) 
              .should('be.visible').first().click();
        
            cy.wait(3000);
            cy.url().should('not.eq', "https://ancabota09.wixsite.com/intern/rooms");
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomPageTitle()) 
              .should('be.visible').invoke('text')
              .then(text => text.trim()) // Trim whitespace
              .should('eq', "Classic App");
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomPrice()) 
              .should('be.visible').invoke('text')
              .then((priceText) => {
                priceValue = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Extract numeric value from text
                expect(priceText).to.not.be.empty; 
                expect(priceValue).to.match(/\d+/);
              });
        
            cy.wrap(iframeDoc)
              .find(roomsPage.checkInCalendar()) 
              .should('be.visible').click();
        
            selectDateCheckIn(today);
            selectDateCheckOut(nextDate);
        
            cy.wrap(iframeDoc)
              .find(roomsPage.roomFinalPrice()) 
              .should('be.visible').invoke('text')
              .then((priceText) => {
                newPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Extract numeric value from text
                expect(priceText).to.not.be.empty; 
                expect(newPrice).to.match(/\d+/);
        
                // Compare the new price with the initial price
                expect(newPrice).to.be.greaterThan(priceValue); // Check that the new price is higher
              });
          });
            
          
    });

});
