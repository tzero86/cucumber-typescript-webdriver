Feature: As a user I can interact with inputs

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on autocomplete inputs
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I fill in the "movies" input with "The G"
        And I click the element with text "The Godfather"
        And the "movies" should contain the value "The Godfather"
        And the "movies" should not contain the value "The Godfather: Part II"