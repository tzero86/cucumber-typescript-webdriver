Feature: As a user I can interact with login forms


    @smoke
    @regression
    Scenario Outline: As a user I can populate login details leveraging environment variables
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "login form" element
        And I fill in the "email" input with "$.TEST_EMAIL"
        Then I fill in the "password" input with "$.TEST_PASSWORD"
        And the "email" should contain the value "admin@testingtalkshub.com.au"
        And the "password" should contain the value "<password>"


        @localhost
        Examples:
            | password    |
            | DaPassword! |

        @production
        Examples:
            | password     |
            | Sup3rS3cur3! |



    @smoke
    @regression
    Scenario Outline: As a user I expect validation on the login input for incorrect emails
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "login form" element
        And I fill in the "email" input with "<bad_email>"
        And the "email error" should contain the text "Please include an '@' in the email address."


        Examples:
            | bad_email        |
            | freedom.Friendly |
            | freedom:Friendly |
            | sadasd_sds       |


    @smoke
    @regression
    Scenario: As a user I am able to input a random email
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "login form" form
        And I fill in the "email" input with random "email"
        And I fill in the "password" input with random "password"
        