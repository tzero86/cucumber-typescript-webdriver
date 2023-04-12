Feature: Generate accessibility report across our website

    @accessibility
    @regression
    Scenario: Generate accessibility report for the homepage
        Given I am on the "home" page
        Then I generate an accessibility analysis report



    @accessibility
    @regression
    Scenario: Generate an accessibility report for the create contact page
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        Then I generate an accessibility analysis report



    @accessibility
    @regression
    Scenario: Generate an accessibility report for the edit contact page
        Given I am on the "home" page
        And I click the 1st "edit" button
        And I am directed to the "edit contact" page
        Then I generate an accessibility analysis report

    
    @accessibility
    @regression
    Scenario: Generate an accessibility report for the playground page
        Given I am on the "home" page
        And I click the "playground" button
        And I am directed to the "playground" page
        Then I generate an accessibility analysis report