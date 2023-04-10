#!/bin/bash

echo "yarn install react SUT app"
yarn install

echo "starting react SUT app"
yarn start > /dev/null 2>&1 &

echo "navigate to e2e"
cd e2e

echo "yarn install e2e"
yarn install

echo "install latest chrome driver"
# Install the latest Chrome and Chromedriver
apk update
apk add --no-cache xvfb chromium chromium-chromedriver
LATEST_CHROMEDRIVER=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE)
wget https://chromedriver.storage.googleapis.com/$LATEST_CHROMEDRIVER/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
chmod +x chromedriver
mv chromedriver /usr/bin
rm chromedriver_linux64.zip

echo "run e2e tests"
./run_tests.sh localhost regression
