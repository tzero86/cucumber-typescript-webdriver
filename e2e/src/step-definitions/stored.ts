import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { waitFor, waitForResult, waitForSelector } from "../support/wait-for-behavior"
import { getElementLocator } from "../support/web-element-helper"
import { ElementKey, GlobalVariableKey } from "../env/global"
import { getElementText } from "../support/html-behavior"
import { logger } from "../logger"

Then(
    /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        globalVariableKey: GlobalVariableKey
    ) {
        const {
            screen: { driver },
            globalConfig,
            globalVariables,
        } = this

        logger.log(
            `I Retrieve the text of the element with key: ${elementKey} and storing it as ${globalVariableKey} in global variables.`
        )

        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )

        await waitFor(async () => {
            const elementStable = await waitForSelector(
                driver,
                elementIdentifier
            )

            if (elementStable) {
                const elementText = await getElementText(
                    driver,
                    elementIdentifier
                )
                if (elementText != null) {
                    globalVariables[globalVariableKey] = elementText
                    return waitForResult.PASS
                }
            }
            return waitForResult.ELEMENT_NOT_AVAILABLE
        }, globalConfig, { target: elementKey })
    }
)
