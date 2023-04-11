#!/bin/bash

echo "yarn install react SUT app"
yarn install

echo "start selnium grid"
yarn run grid >/dev/null 2>&1 &

echo "starting react SUT app"
yarn start >/dev/null 2>&1 &

echo "navigate to e2e"
cd e2e

echo "yarn install e2e"
yarn install

echo "run e2e tests"
./run_tests.sh localhost regression
