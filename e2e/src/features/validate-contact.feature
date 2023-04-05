Feature: As a user I expect to be able to validate a new contact


    @smoke
    @regression
    Scenario: As a user I can hit a validation error on each field and then create a new contact
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        And I click the "save" button
        And the "error message" should contain the text "Error: The "name" field can't be empty."
        Then I fill in the "name" input with "Terry Barks"
        And I select the "Male" option from the "gender"
        And I click the "save" button
        And the "error message" should contain the text "Error: The "phone" field can't be empty."
        And I fill in the "phone" input with "555-555-5555"
        And I click the "save" button
        And the "error message" should contain the text "Error: The "street" field can't be empty."
        And I fill in the "street" input with "123 Main St"
        And I click the "save" button
        And the "error message" should contain the text "Error: The "city" field can't be empty."
        And I fill in the "city" input with "New York"
        And I click the "save" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Terry Barks"
        And the "contact" should be displayed
