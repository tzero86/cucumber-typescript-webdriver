Feature: As a user I expect to be able to navigate the home page

    @dev
    @smoke
    @regression
    Scenario: As a user I expect to be able to see the contacts header
        Given I am on the "home" page
        And the "contacts header" should contain the text "Contactss"
        Then the "header logo" should be displayed

