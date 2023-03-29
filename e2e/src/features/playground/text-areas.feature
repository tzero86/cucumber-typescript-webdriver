Feature: As a user I can interact with text areas


    @smoke
    @regression
    Scenario: As a user I can interact and assert on text areas
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "text area" text area
        And the "text area" should contain the value "Testing Talks Hub has been established to teach the community how to build world class automation frameworks using the latest tooling."
        And I fill in the "text area" input with "Learning to handle text areas"
        And the "text area" should contain the value "Learning to handle text areas"