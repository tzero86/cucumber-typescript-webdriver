import { Then } from "@cucumber/cucumber"
import { ElementKey, ElementPosition, ExpectedElementText, ExpectedElementValue, Negate } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { ScenarioWorld } from "../setup/world"
import { waitFor, waitForResult, waitForSelector } from "../../support/wait-for-behavior"
import { getAttributeText, getElementText, getElementTextAtIndex, getElementValue } from "../../support/html-behavior"
import { logger } from "../../logger"



Then (
    /^the "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld ,elementKey: ElementKey, negate:Negate, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        logger.log(`the ${elementKey} header should ${negate?'not':''} contain the text ${expectedElementText}`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier)
                logger.debug(`elementText: ${elementText} \nexpectedElementText: ${expectedElementText}`)
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
    /^the "([^"]*)" should( not)? equal the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        logger.log(`the ${elementKey} should ${negate?'not':''} equal the text ${expectedElementText}`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier)
                logger.log(`elementText: ${elementText} \nexpectedElementText: ${expectedElementText}`)
                if (elementText === expectedElementText === !negate) {
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


Then(
    /^the "([^"]*)" should( not)? contain the value "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, expectedElementValue: ExpectedElementValue) {
        const { 
            screen: {driver},
            globalConfig
        } = this

        logger.log(`the ${elementKey} should ${negate?'not':''}contain the value ${expectedElementValue}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementAttribute = await getElementValue(driver, elementIdentifier)
                if (elementAttribute?.includes(expectedElementValue) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate ? "not" : ""}contain the value ${expectedElementValue}`
         })

    }
)



Then(
    /^the "([^"]*)" should( not)? equal the value "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, expectedElementValue: ExpectedElementValue) {
        const { 
            screen: {driver},
            globalConfig
        } = this

        logger.log(`the ${elementKey} should ${negate?'not':''} equal the value ${expectedElementValue}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementAttribute = await getElementValue(driver, elementIdentifier)
                if ((elementAttribute === expectedElementValue) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate ? "not" : ""}equal the value ${expectedElementValue}`
         })

    }
)



Then(
    /^the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementPosition: ElementPosition, elementKey: ElementKey, negate: Negate, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig
        } = this

        logger.log(`the ${elementPosition} ${elementKey} should ${negate?'not':''} contain the text ${expectedElementText}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementText = await getElementTextAtIndex(driver, elementIdentifier, elementIndex)
                if  (elementText?.includes(expectedElementText) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey, 
            failureMessage: `🧨 Expected ${elementPosition} ${elementKey} to ${negate ? "not" : ""}contain the text ${expectedElementText}`
        })
    }
)


Then(
    /^the "([^"]*)" "([^"]*)" attribute should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, elementAttribute: string, negate: Negate, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig
        } = this

        logger.log(`the ${elementKey} ${elementAttribute} attribute should ${negate?'not':''} contain the text ${expectedElementText}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementAttributeText = await getAttributeText(driver, elementIdentifier, elementAttribute)
                if (elementAttributeText?.includes(expectedElementText) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey, 
            failureMessage: `🧨 Expected ${elementKey} ${elementAttribute} attribute to ${negate ? "not" : ""}contain the text ${expectedElementText}`
        })
    }
)