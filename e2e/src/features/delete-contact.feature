Feature: As a user I expect to be able to delete a contact

    @smoke
    @regression
    Scenario: As a user I can delete a new contact
        Given I am on the "home" page
        And I fill in the "search" input with "Abraham Perry"
        Then the "contact" should be displayed
        And I click the "delete" button
        And I click accept on the alert dialog
        And I am directed to the "home" page
        And I fill in the "search" input with "Abraham Perry"
        And the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"