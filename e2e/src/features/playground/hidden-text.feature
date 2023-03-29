Feature: As a user I can interact with hidden elements



    @smoke
    @regression
    Scenario: As a user I can interact and assert on hidden and displayed elements
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "show hide button"  button
        And the "show hide text" should be displayed
        And the "show hide text" should contain the text "This is visible"
        And I click the "show hide button" button
        And the "show hide text" should not be displayed
