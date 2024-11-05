Feature: Chat form completion

  Background:
    Given the home page is opened
    And the user sees the Chat icon
    And the user clicks on the chat button 
    And the user types "something" in the “Write your message” field
    And the send button is clicked

  Scenario: Chat form completion with correct data
    Given a form for completion is received
    When the user enters a name "<name>"
    And enters a email "<email>"
    And writes the message "<message>" between 1-80 characters
    And clicks on the submit button
    Then the form is submitted successfully with a confirmation

 Examples:
      | message        | name  | email         | 
      | Question 1     | john  | john@mail.com | 
      | many questions | Jean  | jean@mail.com | 


  Scenario: Chat form completion with incorrect name
    Given a form for completion is received
    When the user enters a name "<wrongName>"
    And enters a email "<email>"
    And writes the message "<message>" between 1-80 characters
    Then the NAME field provides a failure message

 Examples:
      | message        | wrongName | email         | 
      | Question 1     | 9385      | john@mail.com | 
      | many questions | !!!!!!!   | jean@mail.com | 


  Scenario: Chat form completion with incorrect email
    Given a form for completion is received
    When the user enters a name "<name>"
    And enters a email "<wrongEmail>"
    And writes the message "<message>" between 1-80 characters
    Then the EMAIL field provides a failure message

 Examples:
      | message        | name  | wrongEmail     | 
      | Question 1     | john  | john#mail.com  | 
      | many questions | Jean  | john.com       | 

  Scenario: Chat form completion with long message
    Given a form for completion is received
    When the user enters a name "<name>"
    And enters a email "<email>"
    And writes the message "<message>" between 1-80 characters
    Then the message field stops at exactly 80 characters

 Examples:
      | name  | email         | message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
      | john  | john@mail.com | I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you. |
      | Jean  | jean@mail.com | I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you. |
