Feature: Generate accessibility report across our website

    @dev
    @smoke
    @regression
    Scenario: Generate accessibility report for the homepage
        Given I am on the "home" page
        Then I generate an accessibility analysis report
