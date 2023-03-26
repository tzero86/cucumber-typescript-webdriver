Feature: As a user I can interact with iframes

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on iframes
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "basic iframe" iframe
        And I fill in the "search" input on the "basic iframe" iframe with "Alvin Hamilton"
        And the "contact" on the "basic iframe" iframe should be displayed
        And the "full name label" on the "basic iframe" iframe should contain the text "Name:"
        And the "full name label" on the "basic iframe" iframe should not contain the text "Cordyceps"




    