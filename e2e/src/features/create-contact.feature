Feature: As a user I expect to be able to create contacts

    @smoke
    @regression
    Scenario: As a user I expect to be able to create a new contact
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
        And the "search" should not equal the text "Terry Bark"
        And the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should equal the text "Terry Barks"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should equal the text "Male"
        And the "address label" should contain the text "Address:"
        And the "address" should equal the text "123 Main St, New York"
        And the "edit" should be displayed
        And the "delete" should be displayed



    @regression
    Scenario: As a user I do not expect a saved contact to persirst after a page refresh
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        And the "create contact header" should contain the text "Create Contact"
        Then I fill in the "name" input with "Mery Duharty"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "555-555-5555"
        And I fill in the "street" input with "70 810"
        And I fill in the "city" input with "Buenos Aires"
        And I click the "save" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Mery Duharty"
        And the "contact" should be displayed
        And I refresh the "home" page
        And I fill in the "search" input with "Mery Duharty"
        And the "contact" should not be displayed


    @regression
    Scenario: As a user I can cancel creating a new contact
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        And the "create contact header" should contain the text "Create Contact"
        Then I fill in the "name" input with "Mery Duharty"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "555-555-5555"
        And I fill in the "street" input with "70 810"
        And I fill in the "city" input with "Buenos Aires"
        And I click the "cancel" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Mery Duharty"
        And the "contact" should not be displayed


    @regression
    Scenario: As a user I can delete a newly created user
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
        And I click the "delete" button
        And I click accept on the alert dialog
        And I am directed to the "home" page
        And I fill in the "search" input with "Terry Barks"
        And the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"

         