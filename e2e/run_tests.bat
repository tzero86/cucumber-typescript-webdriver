@echo off
setlocal enabledelayedexpansion
set -ueo pipefail

rem environment tag
set env=%1

rem cucumber tag
set tag=%2

rem export environment variables
set COMMON_CONFIG_FILE=.\env\common.env
set NODE_ENV=%env%

rem run cucumber tests & on failure exit script

rimraf dist && babel --extensions .ts --out-dir dist src
cucumber-js --profile %tag%
if errorlevel 1 (
    ts-node ./src/reporter/cucumber-report.ts
    exit /b 1
)