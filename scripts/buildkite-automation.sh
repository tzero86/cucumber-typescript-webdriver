#!/bin/bash

echo "yarn install react SUT app"
yarn install

echo "starting react SUT app"
yarn start >/dev/null 2>&1 &

echo "navigate to e2e"
cd e2e

echo "yarn install e2e"
yarn install

echo "install latest chrome driver"
# Install the latest Chrome and Chromedriver Alpine packages
# apk update
# apk add --no-cache xvfb chromium chromium-chromedriver
# LATEST_CHROMEDRIVER=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE)
# wget https://chromedriver.storage.googleapis.com/$LATEST_CHROMEDRIVER/chromedriver_linux64.zip
# unzip chromedriver_linux64.zip
# chmod +x chromedriver
# mv chromedriver /usr/bin
# rm chromedriver_linux64.zip

# Install the latest Chrome and Chromedriver Ubuntu packages
apt-get update
apt-get install -y xvfb
apt-get install -y zip
apt-get install -y wget
apt-get install -y ca-certificates
apt-get install -y libnss3-dev libasound2 libxss1 libappindicator3-1 libindicator7 gconf-service libgconf-2-4 libpango1.0-0 xdg-utils fonts-liberation libgbm1
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >/etc/apt/sources.list.d/google-chrome.list
apt-get update
apt-get install -y google-chrome-stable
LATEST_CHROMEDRIVER=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE)
wget https://chromedriver.storage.googleapis.com/$LATEST_CHROMEDRIVER/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
chmod +x chromedriver
mv chromedriver /usr/local/bin
rm chromedriver_linux64.zip
npm install -g @axe-core/webdriverjs @babel/cli @babel/preset-env @babel/preset-typescript @cucumber/cucumber @faker-js/faker @typescript-eslint/eslint-plugin @typescript-eslint/parser axe-html-reporter chromedriver cross-env cucumber-html-reporter dotenv eslint geckodriver rimraf selenium-webdriver ts-node typescript
npm install -g babel-cli
npm install -g ts-node


echo "run e2e tests"
./run_tests.sh localhost regression
