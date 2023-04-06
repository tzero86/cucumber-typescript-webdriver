Feature: As a user I can interact with drop down menus so that I can select and assert an option from a list of options.

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on drop down menus
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the 1st "dropdown button" component
        And I click the "dropdown button" button
        And the "dropdown profile" should contain the text "Profile"
        And the "dropdown my account" should contain the text "My account"
        And the "dropdown logout" should contain the text "Logout"
        And I click the "dropdown logout" button
        And the "dropdown logout" should not be displayed
        And the "dropdown my account" should not be displayed
        And the "dropdown profile" should not be displayed


