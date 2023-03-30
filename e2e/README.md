# React App

Install react app packages

Inside root directory  you need to first Install project dependencies:

`yarn install`

Start sample application:

`yarn start`

## E2E Tests

All the e2e test files and framework lives inside the e2e folder.

Make sure to rename the environment example files and populate them accordingly:

e2e\env\sample.localhost.env -> e2e\env\localhost.env
e2e\env\sample.production.env -> e2e\env\production.env


On Mac/Linux:

````
cd e2e
yarn install
./run_tests.sh environment tag

e.g ./run_tests.sh localhost regression
````

On Windows:

````
cd e2e
yarn install
./run_tests.bat environment tag

e.g ./run_tests.bat localhost regression
````


