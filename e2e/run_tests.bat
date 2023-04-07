@echo off
setlocal enabledelayedexpansion

rem environment tag
set env=%1

rem cucumber tag
set tag=%2

rem export environment variables
set COMMON_CONFIG_FILE=.\env\common.env
set NODE_ENV=%env%

rem run cucumber tests & on failure exit script
yarn run cucumber --profile %tag%
if errorlevel 1 (
    yarn run postcucumber
    exit /b 1
)