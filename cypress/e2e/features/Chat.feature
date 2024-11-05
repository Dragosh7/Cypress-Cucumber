Feature: Chat form to provide assistance to a user

  Background:
    Given the home page is opened
    And the user sees the Chat icon

  Scenario: Open chat window
    When the user clicks on the chat button 
    Then the chat window is visible
    And the user can see an operator online

  Scenario: Write a message to activate the chat
    When the user clicks on the chat button 
    And the user types "<message>" in the “Write your message” field
    And the send button is clicked
    Then the message "<message>" that was sent should be displayed
  
  Scenario: Chat form for further explanations
    When the user clicks on the chat button 
    And the user types "something" in the “Write your message” field
    And the send button is clicked
    Then a form for completion is received
    

Examples:
      | message        |
      | Question 1     |
      | many questions |

@only
  Scenario: Chat message rich text
    When the user clicks on the chat button 
    And the user sends an emoji in the “Write your message” field
    And the send button is clicked
    Then a form for completion is received
    And the message contains a rich text
