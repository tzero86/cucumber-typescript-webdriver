Feature: As a user I can interact and assert on browser alerts

    @smoke
    @regression
    Scenario: As a user I can interact and assert on alerts
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "browser alert" button
        And I click the "browser alert" button
        And I click dismiss on the alert dialog
        And I click the "browser alert" button
        And I click accept on the alert dialog
        