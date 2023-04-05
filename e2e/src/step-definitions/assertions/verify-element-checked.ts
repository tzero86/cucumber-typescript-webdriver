import { Then } from "@cucumber/cucumber"
import { waitFor, waitForResult, waitForSelector } from "../../support/wait-for-behavior"
import { ScenarioWorld } from "../setup/world"
import { getElementLocator } from "../../support/web-element-helper"
import { ElementKey, Negate } from "../../env/global"
import { elementChecked } from "../../support/html-behavior"
import { logger } from "../../logger"

Then(
    /^the "([^"]*)" (?:radio button|check box|switch) should( not)? be checked$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        negate: Negate
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this
        logger.log(
            `the ${elementKey} should ${negate ? "not" : ""}be checked`
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
                const isElementChecked = await elementChecked(driver, elementIdentifier)
                if (isElementChecked === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }

        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} radio button|check box|switch) to ${negate ? "not" : ""}be checked` 
        })
    }
)
