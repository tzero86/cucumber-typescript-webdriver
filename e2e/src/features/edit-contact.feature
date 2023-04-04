Feature: As a user I expect to be able to edit a new contact

    @dev
    @smoke
    @regression
    Scenario: As a user I can edit a new contact
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        And the "create contact header" should contain the text "Create Contact"
        Then I fill in the "name" input with "Terry Barks"
        And I select the "Male" option from the "gender"
        And I fill in the "phone" input with "555-555-5555"
        And I fill in the "street" input with "123 Main St"
        And I fill in the "city" input with "New York"
        And I click the "save" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Terry Barks"
        And the "contact" should be displayed
        And I click the "edit" button
        And I am directed to the "edit contact" page
        And I select the "Female" option from the "gender"
        And I click the "save" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Terry Barks"
        And the "contact" should be displayed
        And the "gender" should contain the text "Female"

