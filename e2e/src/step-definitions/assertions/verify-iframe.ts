import { Then } from "@cucumber/cucumber"
import { ElementKey, ExpectedElementText, IframeKey, Negate } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { ScenarioWorld } from "../setup/world"
import { waitFor, waitForResult, waitForSelector, waitForSelectorInIframe } from "../../support/wait-for-behavior"
import { elementDisplayed, getElementText } from "../../support/html-behavior"
import { logger } from "../../logger"

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        iframeKey: IframeKey,
        negate: Negate
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(
            `the ${elementKey} on the ${iframeKey} iframe should ${
                negate ? "not" : ""
            } be displayed`
        )

        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )
        const iframeIdentifier = await getElementLocator(
            driver,
            iframeKey,
            globalConfig
        )

        await waitFor(async () => {
            const iframeStable = await waitForSelector(
                driver,
                iframeIdentifier
            )

            if (iframeStable) {
                const elementStable = await waitForSelectorInIframe(
                    driver,
                    iframeIdentifier,
                    elementIdentifier
                )
                if (elementStable) {
                    const isElementVisible = await elementDisplayed(
                        driver,
                        elementIdentifier
                    )
                    if (isElementVisible === !negate) {
                        return { result: waitForResult.PASS }
                    } else {
                        return { result: waitForResult.FAIL, replace: elementKey }
                    }
                } else {
                    return { result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey}
                }
            } else {
                return { result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey}
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} in ${iframeKey} to ${negate ? "not" : ""} be displayed` 
        })
    }
)


Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        iframeKey: IframeKey,
        negate: Negate,
        expectedElementText: ExpectedElementText
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(
            `the ${elementKey} on the ${iframeKey} iframe should ${
                negate ? "not" : ""
            } contain the text ${expectedElementText}`
        )

        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )
        const iframeIdentifier = await getElementLocator(
            driver,
            iframeKey,
            globalConfig
        )

        await waitFor(async () => {
            const iframeStable = await waitForSelector(
                driver,
                iframeIdentifier
            )

            if (iframeStable) {
                const elementStable = await waitForSelectorInIframe(
                    driver,
                    iframeIdentifier,
                    elementIdentifier
                )
                if (elementStable) {
                    const elementText = await getElementText(
                        driver,
                        elementIdentifier
                    )
                    if (elementText?.includes(expectedElementText) === !negate) {
                        return { result: waitForResult.PASS }
                    } else {
                        return { result: waitForResult.FAIL, replace: elementKey }
                    }
                } else {
                    return { result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey}
                }
            } else {
                return { result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey}
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} in ${iframeKey} to ${negate ? "not" : ""} contain the text ${expectedElementText}` 
        })
    }
)



Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        iframeKey: IframeKey,
        negate: Negate,
        expectedElementText: ExpectedElementText
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(
            `the ${elementKey} on the ${iframeKey} iframe should ${
                negate ? "not" : ""
            } equal the text ${expectedElementText}`
        )

        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )
        const iframeIdentifier = await getElementLocator(
            driver,
            iframeKey,
            globalConfig
        )

        await waitFor(async () => {
            const iframeStable = await waitForSelector(
                driver,
                iframeIdentifier
            )

            if (iframeStable) {
                const elementStable = await waitForSelectorInIframe(
                    driver,
                    iframeIdentifier,
                    elementIdentifier
                )
                if (elementStable) {
                    const elementText = await getElementText(
                        driver,
                        elementIdentifier
                    )
                    if (elementText === expectedElementText === !negate) {
                        return { result: waitForResult.PASS }
                    } else {
                        return { result: waitForResult.FAIL, replace: elementKey }
                    }
                } else {
                    return { result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey}
                }
            } else {
                return { result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey}
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} in ${iframeKey} to ${negate ? "not" : ""} equal the text ${expectedElementText}` 
        })
    }
)
