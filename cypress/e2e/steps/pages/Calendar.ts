export const baseUrl = "https://ancabota09.wixsite.com/intern";

export const formatDateForSearch = (date: Date): string => {
    const day = date.getDate();
    const year = date.getFullYear();

    const monthMap = {
        0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
        6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
    };

    const month = monthMap[date.getMonth()]; // custom mapping for 3-letter month. Because cypress returns Sept instead of Sep

    return `${day} ${month} ${year}`;
};

export const formatDateForAriaLabel = (date: Date): string => {
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const monthName = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();

    return `${day}, ${dayName} ${monthName} ${year}`;
};

export const selectDateInCheckInIframe = (dayOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const formattedDate = formatDateForAriaLabel(date);

    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.checkInButton).click()

    cy.get('iframe.U73P_q')
        .its('0.contentDocument')
        .find(`button[aria-label="${formattedDate}"]`)
        .click();
};

export const selectDateInCheckOutIframe = (dayOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const formattedDate = formatDateForAriaLabel(date);

    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.checkOutButton).click()

    cy.get('iframe.U73P_q')
        .its('0.contentDocument')
        .find(`button[aria-label="${formattedDate}"]`)
        .click();
};

export const verifyCheckInDateDisplay = (dayOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const formattedDate = formatDateForSearch(date);

    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.checkInValue)
      .should('have.text', formattedDate);
};

export const verifyCheckOutDateDisplay = (dayOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const formattedDate = formatDateForSearch(date);

    cy.get(calendar.iframeSelector)
      .its('0.contentDocument')
      .find(calendar.checkOutValue)
      .should('have.text', formattedDate);
};

export const adjustGuestCount = (guestType: string, action: string) => {
    const selector = guestType === "adults" ? '#adults' : '#children';
    const button = action.includes('increase') ? '.up' : '.down';
    const toClick = selector +" > " + button;
    console.log(toClick);
    const clickCount = action.match(/\d+/) ? parseInt(action.match(/\d+/)[0]) - 1 : 1;

    for (let i = 0; i < clickCount; i++) {
    cy.wait(1000);
        cy.get(calendar.iframeSelector)
          .its('0.contentDocument')
          .find(toClick)
          .click({ force: true, multiple:true });
        }

};

export function isDisabledDate(date: Date)  {
    const formattedDate = formatDateForAriaLabel(date);
    
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(`button[aria-label="${formattedDate}"]`)
            .should('have.attr', 'disabled');
};

export const calendar = {
    quickSearchFrame: '#i6kppi75 > .nKphmK',
    iframeSelector: 'iframe.nKphmK[title="Wix Hotels"]',
    checkInButton: '#search-widget #check-in',
    checkInValue: '#search-widget #check-in-value',
    checkOutValue: '#search-widget #check-out-value',
    checkOutButton: '#search-widget #check-out',
    adultsIncreaseButton: '#adults > .up',
    adultsDecreaseButton: '#adults > .down',
    adultsValue: '#adults span.value.ng-binding',
    childrenIncreaseButton: '#children > .up',
    childrenDecreaseButton: '#children > .down',
    childrenValue: '#children span.value.ng-binding',
    searchButton: 'button[ng-click="filter($root.endpoint)"]'
};
