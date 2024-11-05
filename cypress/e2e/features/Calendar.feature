Feature: Calendar and Room Selection Functionality

  Background:
    Given the user navigates to the homepage

  Scenario: Check-in Date Selection
    When the user selects a check-in date "<dayOffset>" days from today
    Then the check-in field should display the selected date "<dayOffset>"
  
    Examples:
    | dayOffset |
    | 5         |
    | 1         |
    | 2         |

  Scenario: Check-out Date Selection
    When the user selects a check-in date "<dayOffset>" days from today
    And the user selects a check-out date "<next>" days from today
    Then the check-in field should display the selected date "<dayOffset>"
    And the check-out field should display the selected date "<next>"

    Examples:
      | dayOffset | next |
      | 5         | 10   |
      | 1         | 4    |
      | 2         | 7    |

  Scenario: Disabled Past Date Selection
    When the user attempts to select a past check-in date 2 days before today
    Then the past date should be grayed out and not selectable

  Scenario: Adjusting Number of Adults
    When the user changes the number of adults "<action>"
    Then the adults field should display "<expected>"

    Examples:
      | action                  | expected |
      | increase                | 2        |
      | decrease                | 1        |
      | increase to 5           | 5        |

@only
  Scenario: Adjusting Number of Kids
    When the user changes the number of kids "<action>"
    Then the kids field should display "<expected>"

    Examples:
      | action                  | expected |
      | increase                | 1        |
      | decrease                | 0        |
      | increase to 3, decrease | 2        |

  Scenario: Room Search with Valid Inputs
    Given the user has entered valid check-in and check-out dates
    And the default adult value is at least 1
    When the user clicks the search button
    Then the user should be redirected to the rooms page
