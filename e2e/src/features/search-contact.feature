Feature: As a user I want to be able to search for a new contact

    @smoke
    @regression
    Scenario: As a user I can search for a contact that does not exist
        Given I am on the "home" page
        And I fill in the "search" input with "Funky Name"
        Then the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"



    @regression
    Scenario: As a user I can search on a newly created and edited contact and see our searched contact details
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
        And I fill in the "name" input with "Homer Simpson"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "666-555-6666"
        And I fill in the "street" input with "Avenida Siempre Viva 742"
        And I fill in the "city" input with "Springfield"
        And I click the "save" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Terry Barks"
        And the "contact" should not be displayed
        And I fill in the "search" input with "Homer Simpson"
        And the "contact" should be displayed