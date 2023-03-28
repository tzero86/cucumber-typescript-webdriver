Feature: As a user I can interact and assert on tooltips

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on tooltips
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "tooltip" button
        And the "tooltip" "title" attribute should contain the text "This is a tooltip"
        
        

