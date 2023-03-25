Feature: As a user I can interact with inputs

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


    @smoke
    @regression
    Scenario: As a user I can interact and assert on autocomplete inputs
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "outlined required" input
        And the "outlined disabled" should equal the value "Talks"
        And the "outlined read only" should contain the value "Hub"
        And the "outlined required" should be enabled
        And the "outlined disabled" should not be enabled
        And I fill in the "outlined required" input with "Testing is fun"
        And the "outlined required" should equal the value "Testing is fun"



    @smoke
    @regression
    Scenario: As a user I can interact and assert on input validation
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "validation label" input
        And the "validation label" should contain the text "Error"
        And the "validation error" should contain the text "Incorrect entry."