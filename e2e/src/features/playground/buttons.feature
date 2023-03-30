Feature: As a user I can interact with buttons

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on buttons
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the 1st "my button" button
        And I click the 1st "my button" button
        Then I click the 1st "my button" button
        And the 1st "my button" should contain the text "ONE"
        And I click the 2nd "my button" button
        And the 2nd "my button" should contain the text "TWO"
        And I click the 3rd "my button" button
        And the 3rd "my button" should contain the text "THREE"