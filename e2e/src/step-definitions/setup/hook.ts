import { Before, After, setDefaultTimeout } from "@cucumber/cucumber"
import * as fs from "fs"
import { ScenarioWorld } from "./world"
import { env, envNumber } from "../../env/parseEnv"
import { logger } from "../../logger"


setDefaultTimeout(envNumber("SCRIPT_TIMEOUT"))

Before(async function (scenario) {
    logger.log(`🥒 Running Cucumber Scenario: ${scenario.pickle.name}`)
    const ready = await this.init()
    return ready
})


After(async function (this: ScenarioWorld ,scenario) {
    const {
         screen: { driver },
         globalConfig
    } = this

    const scenarioStatus = scenario.result?.status
    logger.log(`Scenario Status: ${scenarioStatus}`)

    if (scenarioStatus === "FAILED") {
        driver.takeScreenshot().then((image) => {
            this.attach(image, "image/png")
            if (!fs.existsSync(env("SCREENSHOT_PATH"))) {
                fs.mkdirSync(env("SCREENSHOT_PATH"))
            }
            fs.writeFileSync(
                `${env("SCREENSHOT_PATH")}${scenario.pickle.name}.png`,
                image,
                "base64"
            )
        })
    }
    await driver.quit()
})
