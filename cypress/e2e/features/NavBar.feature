Feature: Navigation Button Validations

  Background:
    Given the homepage is loaded successfully

  Scenario: Validate the existence and functionality of the "<button>" button
    When the page is fully loaded
    Then the "<button>" button should be displayed

  Examples:
    | button    |
    | Book      |
    | Contact   |
    | Rooms     |
    | Explore   |
    | Home      |

  Scenario: Click and navigate using the "<button>" button
    When the "<button>" button is clicked
    Then the "<button>" button color turns white
    And the "<button>" page should load successfully

  Examples:
    | button    |
    | Book      |
    | Contact   |
    | Rooms     |
    | Explore   |
    | Home      |
