import { Then } from "@cucumber/cucumber"
import { ExpectedElementText, Negate, PagePosition } from "../../env/global"
import { ScenarioWorld } from "../setup/world"
import {
    waitFor,
    waitForResult,
    waitForSelectorOnPage,
} from "../../support/wait-for-behavior"
import {
    getElementText,
    getTitleWithinPage,
} from "../../support/html-behavior"
import { getElementLocator } from "../../support/web-element-helper"
import { logger } from "../../logger"

Then(
    /^the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) should( not)? contain the title "(.*)"$/,
    async function (
        this: ScenarioWorld,
        pagePosition: PagePosition,
        negate: Negate,
        expectedTitle: ExpectedElementText
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(
            `the ${pagePosition} tab should ${
                negate ? "not" : ""
            } contain the title ${expectedTitle}`
        )

        const pageIndex = Number(pagePosition.match(/\d/g)?.join("")) - 1

        await waitFor(async () => {
            const pageTitle = await getTitleWithinPage(driver, pageIndex)
            if (pageTitle?.includes(expectedTitle) === !negate) {
                return waitForResult.PASS
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: expectedTitle,
            failureMessage: `🧨 Expected ${expectedTitle} to ${negate ? "not" : ""}contain the title ${expectedTitle}` 
        })
    }
)


Then(
    /^the "([^"]*)" on the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) should( not)? be displayed$/,
    async function (
        this: ScenarioWorld,
        elementKey: string,
        pagePosition: PagePosition,
        negate: Negate
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(
            `the ${elementKey} on the ${pagePosition} tab should ${
                negate ? "not" : ""
            } displayed`
        )

        const pageIndex = Number(pagePosition.match(/\d/g)?.join("")) - 1
        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )

        await waitFor(async () => {
            const isElementVisible = await waitForSelectorOnPage(driver, elementIdentifier,pageIndex)
            if (isElementVisible === !negate) {
                return waitForResult.PASS
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey, 
            failureMessage: `🧨 Expected ${elementKey} to ${negate ? "not" : ""}be displayed`
        })
    }
)

Then(
    /^the "([^"]*)" on the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) should( not)? contain the text "(.*)"$/,
    async function (
        this: ScenarioWorld,
        elementKey: string,
        pagePosition: PagePosition,
        negate: Negate,
        expectedElementText: ExpectedElementText
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(
            `the ${elementKey} on the ${pagePosition} tab should ${
                negate ? "not" : ""
            } contain the text ${expectedElementText}`
        )
        const pageIndex = Number(pagePosition.match(/\d/g)?.join("")) - 1
        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )

        await waitFor(async () => {
            const elementStable = await waitForSelectorOnPage(
                driver,
                elementIdentifier,
                pageIndex
            )
            if (elementStable) {
                const elementText = await getElementText(driver,elementIdentifier)
                if (elementText?.includes(expectedElementText) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey, 
            failureMessage: `🧨 Expected ${elementKey} to ${negate ? "not" : ""}contain the text ${expectedElementText}`
        })
    }
)

Then(
    /^the "([^"]*)" on the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) should( not)? equal the text "(.*)"$/,
    async function (
        this: ScenarioWorld,
        elementKey: string,
        pagePosition: PagePosition,
        negate: Negate,
        expectedElementText: ExpectedElementText
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(
            `the ${elementKey} on the ${pagePosition} tab should ${
                negate ? "not" : ""
            } equal the text ${expectedElementText}`
        )
        const pageIndex = Number(pagePosition.match(/\d/g)?.join("")) - 1
        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )

        await waitFor(async () => {
            const elementStable = await waitForSelectorOnPage(
                driver,
                elementIdentifier,
                pageIndex
            )
            if (elementStable) {
                const elementText = await getElementText(driver,elementIdentifier)
                if ((elementText === expectedElementText) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate ? "not" : ""}equal the text ${expectedElementText}` 
        })
    }
)
