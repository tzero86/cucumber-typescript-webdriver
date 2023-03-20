Testing Talks Hub React App to Practice E2E automation framework development.

To run the React App:

``yarn start`` while inside the react-app folder.

Then to work with the e2e framework:

open another terminal inside the e2e folder and run:

``yarn run cucumber:dev``


Note: Env variables are required to set the Browser and its arguments:

make sure to set UI_BROWSER_AUTOMATION to your targe browser (firefox, chrome, safari)
and also set BROWSER_ARGUMENTS env variable to null or your desired value.



Original react-app code is taken from the Udemy course: https://www.udemy.com/course/build-a-cucumber-selenium-typescript-automation-framework/
