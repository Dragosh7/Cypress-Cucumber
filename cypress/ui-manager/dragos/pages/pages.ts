export const homeURL = "https://ancabota09.wixsite.com/intern";

export const contactURL = "https://ancabota09.wixsite.com/intern/contact";

export const exploreURL = "https://ancabota09.wixsite.com/intern/explore";

export const roomsURL = "https://ancabota09.wixsite.com/intern/rooms";


 export const homepage = {
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

    facebookButton: () => cy.get('[href="http://www.facebook.com/wix"]'),
    twitterButton: () => cy.get('[href="http://www.twitter.com/wix"]'),
    pinterestButton: () => cy.get('[href="http://pinterest.com/wixcom/"]'),
    wixButton: () => cy.get('#i71wwqnj > :nth-child(2) > span.wixui-rich-text__text > .wixui-rich-text__text'),
    contactMailButton: () => cy.get('#i71ww6nk > p:nth-child(1) > a'),
 
    quickSearchFrame : '#i6kppi75 > .nKphmK',

    iframeSelector: 'iframe.nKphmK[title="Wix Hotels"]',
    facebookPageUrl: "https://www.facebook.com/",
    twitterPageUrl: "https://x.com/wix",
    pinterestPageUrl: "https://www.pinterest.com/wixcom/",
    wixPageUrl: "https://www.wix.com/?utm_campaign=vir_created_with",
    linkAddress: "info@mysite.com"
    
  }
  
  export const roomsPage = {
    iframeSelector: '#i6klgqap_0 > .nKphmK',
    searchButton: () => 'button.search',
    filterResults: () => 'h2.s-title.resultbar',
    clearFiltersBtn: () => '#content > div > div.clearfix.content-head > h2 > a',

    standardRoom: () => 'li:nth-child(1) button.fancy-btn.s-button',
    standardRoomTitle: () => 'li:nth-child(1) a.s-title',
    standardRoomDesc: () => 'li:nth-child(1) p.text',
    standardRoomPrice: () => 'li:nth-child(1) .price .value',
    standardRoomFeatures: () => 'li:nth-child(1) ul.features',
    
    cottageRoom: () => 'li:nth-child(2) button.fancy-btn.s-button',
    cottageRoomTitle: () => 'li:nth-child(2) a.s-title',
    cottageRoomDesc: () => 'li:nth-child(2) p.text',
    cottageRoomPrice: () => 'li:nth-child(2) .price .value',
    cottageRoomFeatures: () => 'li:nth-child(2) ul.features',
    
    classicRoom: () => 'li:nth-child(3) button.fancy-btn.s-button',
    classicRoomTitle: () => 'li:nth-child(3) a.s-title',
    classicRoomDesc: () => 'li:nth-child(3) p.text',
    classicRoomPrice: () => 'li:nth-child(3) .price .value',
    classicRoomFeatures: () => 'li:nth-child(3) ul.features',

    //on the specific room page
    roomPageTitle: () => 'h2.s-title',
    roomDescription: () => 'div.content-block.s-description > p', 
    roomProperties: () => 'div.content-block.properties', 
    roomAmenities: () => 'div.content-block.amenities', 
    roomCheckInAndOut: () => 'div.content-block.terms', 
    roomTerms: () => 'div.content-block.tac', 
    readPolicies: () => 'li.policy-link a.policies',
    roomPrice: () => '.heading .price', 
    roomFinalPrice: () => 'tr.total td[ng-bind="paymentDetails.total | currency:paymentDetails.currency"]',

    checkInCalendar: () => '#check-in', 
    checkOutCalendar: () => '#check-out', 

    adultIncrementButton: () => 'button.increment-adult',
    adultDecrementButton: () => 'button.decrement-adult', 



    templateDescription: "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you."

  }
  
  export const explorePage = {
    welcomeParagraph: () => cy.get('#i6kvh3dl > .font_8 > .wixui-rich-text__text'),
    chinaDescription: () => cy.get('#i6kv2te2 > [data-testid="inline-content"] > [data-testid="mesh-container-content"] > [data-testid="richTextElement"] > :nth-child(4)'),
    ashburyDescription: () => cy.get('#i6kvbhma > [data-testid="inline-content"] > [data-testid="mesh-container-content"] > [data-testid="richTextElement"] > :nth-child(4)'),
    goldenGateDescription: () => cy.get('#i6kvbkvz > [data-testid="inline-content"] > [data-testid="mesh-container-content"] > [data-testid="richTextElement"] > :nth-child(4)'),

    chinaImg: () => cy.get('#img_i6kv4ak9 > img'),
    ashburyImg: () => cy.get('#img_i6kvbhmc > img'),
    goldenGateImg: () => cy.get('#img_i6kvbkw0_0 > img'),

    templateWelcome: "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.",
    templateDescription: "I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you."

  }
  
  export const contactPage = {
    contactParagraph: () => cy.get('#i6ly3ckc_0'),
    mapFrame: () => cy.get('iframe[title="Google Maps"]'),
    fullscreenButton: () => cy.get('iframe[title="Google Maps"]').its('0.contentDocument').find('#map_canvas > div > div.gm-style > div:nth-child(8) > button'),
  
    nameField: () => cy.get("#input_comp-jxbsa1e9"),
    emailField: () => cy.get("#input_comp-jxbsa1em"),
    phoneField: () => cy.get("#input_comp-jxbsa1ev"),
    commentField: () => cy.get("#textarea_comp-jxbsa1f7"),
    submitField: () => cy.get("#comp-jxbsa1fi > button"),

    submitFeedback: () => cy.get('#comp-jxbsa1dm > [data-testid="inline-content"] > [data-testid="mesh-container-content"] > [data-testid="richTextElement"] > .font_8 > .color_15')
  }

  export const chatFrame = {
    iframeSelector: '#comp-jr4sqg2g > .nKphmK',
    chatBtn: '#minimized-chat',
    chat2: 'div.kBk8- button[data-hook="minimized-chat"]',
    chatTextArea: 'textarea[aria-label="Type your message. Hit enter to submit."]',
    sendBtn: 'button[data-hook="send-button"]',
    chatMessages: 'div[data-hook="chat-message"]',

    chatForm: 'form.zd18O',
    inputName: 'input#name',
    inputEmail: 'input#email',
    inputMessage: 'textarea#message',
    chatEmailError: '#email-error',
    chatNameError: '#name-error',
    submitForm: 'button[data-hook="lcf-submit"]',
    formFeedback: 'div[data-hook="lcf-thank-you"]'
    
  }