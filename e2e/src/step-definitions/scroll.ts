import { Then } from "@cucumber/cucumber"
import {
    waitFor,
    waitForResult,
    waitForSelector,
    waitForSelectors,
} from "../support/wait-for-behavior"
import { ScenarioWorld } from "./setup/world"
import { getElementLocator } from "../support/web-element-helper"
import { ElementKey, ElementPosition } from "../env/global"
import {
    scrollElementIntoView,
    scrollElementIntoViewAtIndex,
} from "../support/html-behavior"
import { logger } from "../logger"

Then(
    /^I scroll to the "([^"]*)" (?:.*?)$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig,
        } = this
        logger.log(`I scroll to the ${elementKey}`)
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
                await scrollElementIntoView(driver, elementIdentifier)
                return waitForResult.PASS
            }
            return waitForResult.ELEMENT_NOT_AVAILABLE
        }, globalConfig, { target: elementKey })
    }
)

Then(
    /^I scroll to the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) "([^"]*)" (?:.*?)$/,
    async function (
        this: ScenarioWorld,
        elementPosition: ElementPosition,
        elementKey: ElementKey
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(`I scroll to the ${elementPosition} ${elementKey}`)
        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )

        const elementIndex = Number(elementPosition.match(/\d/g)?.join("")) - 1

        await waitFor(async () => {
            const elementStable = await waitForSelectors(
                driver,
                elementIdentifier
            )

            if (elementStable) {
                await scrollElementIntoViewAtIndex(
                    driver,
                    elementIdentifier,
                    elementIndex
                )
                return waitForResult.PASS
            }
            return waitForResult.ELEMENT_NOT_AVAILABLE
        }, globalConfig, { target: elementKey })
    }
)
