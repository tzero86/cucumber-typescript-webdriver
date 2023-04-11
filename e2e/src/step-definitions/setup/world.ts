import { Builder, WebDriver } from "selenium-webdriver"
import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber"
import firefox from "selenium-webdriver/firefox"
import { Options } from "selenium-webdriver/chrome"
import { env, envNumber } from "../../env/parseEnv"
import { GlobalConfig, GlobalVariables } from "../../env/global"
import { stringIsOfOptions } from "../../support/options-helper"
import { logger } from "../../logger"
import edge from "selenium-webdriver/edge"
require("chromedriver")
require("geckodriver")


export type Screen = {
    driver: WebDriver
}

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions) {
        super(options)
        this.globalConfig = options.parameters as GlobalConfig
        this.globalVariables = {}
    }

    globalConfig: GlobalConfig
    globalVariables: GlobalVariables
    screen!: Screen

    async init(): Promise<Screen> {
        const browser = await this.newBrowser()
        const browserBuilder = await this.browserBuilder(browser)
        const browserDimensions = await this.browserDimensions()
        const driver = await browserBuilder.build()
        await driver.manage().window().setRect(browserDimensions)

        this.screen = { driver }

        return this.screen
    }

    private browserDimensions = async (): Promise<{
        width: number
        height: number
    }> => {
        return {
            width: envNumber("BROWSER_WIDTH"),
            height: envNumber("BROWSER_HEIGHT"),
        }
    }

    private newBrowser = async (): Promise<string> => {
        const automationBrowser = env("UI_AUTOMATION_BROWSER")
        const automationBrowsers = ["chrome", "firefox", "safari", "edge"]
        const validAutomationBrowser = stringIsOfOptions(
            automationBrowser,
            automationBrowsers
        )
        return validAutomationBrowser
    }

    private browserBuilder = async (browser: string): Promise<Builder> => {
        logger.log(`🖥️  Executing on: ${browser} browser.`)

        let builder

        if (env('SELENIUM_GRID_ENABLED') === 'true') {
            builder = new Builder().usingServer(env('SELENIUM_GRID_URL'))
            logger.log(`🌐  Executing on: ${browser} browser using Selenium Grid.`)
        } else {
            builder = new Builder()
        }

        //const builder = new Builder()
        switch (browser) {
            case "chrome": {
                const chromeBrowserOptions = new Options()
                chromeBrowserOptions.addArguments(env("BROWSER_ARGUMENTS"))
                chromeBrowserOptions.excludeSwitches(["enable-logging"])
                return builder
                    .forBrowser(browser)
                    .withCapabilities(chromeBrowserOptions)
            }
            case "firefox": {
                const firefoxBrowserOptions = new firefox.Options()
                firefoxBrowserOptions.addArguments(env("BROWSER_ARGUMENTS"))
                firefoxBrowserOptions.set("acceptInsecureCerts", true)
                return builder
                    .forBrowser(browser)
                    .setFirefoxOptions(firefoxBrowserOptions)
            }
            case "edge": {
                const edgeBrowserOptions = new edge.Options()
                edgeBrowserOptions.addArguments(env("BROWSER_ARGUMENTS"))
                return builder.forBrowser(browser)
                    .withCapabilities(edgeBrowserOptions)
            }
            default: {
                return builder.forBrowser(browser)
            }
        }
    }
}

setWorldConstructor(ScenarioWorld)
