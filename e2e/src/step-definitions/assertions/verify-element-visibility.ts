import { Then } from '@cucumber/cucumber'
import { waitFor, waitForResult, waitForSelector } from '../../support/wait-for-behavior'
import { ElementKey, ElementPosition, Negate } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { elementDisplayed, elementDisplayedAtIndex, elementEnabled, getElements } from '../../support/html-behavior'
import { logger } from '../../logger'


Then(
    /^the "([^"]*)" should( not)? be displayed$/,
    async function (this: ScenarioWorld ,elementKey: ElementKey, negate: Negate) {
        const { 
            screen: {driver},
            globalConfig 
        } = this
        logger.log(`the ${elementKey} should ${negate?"not":""} be displayed`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const isElementVisible = await elementDisplayed(driver, elementIdentifier)   
            if (isElementVisible  === !negate) {
                return waitForResult.PASS
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate ? "not" : ""}be displayed`

         })
    
    })


Then(
    /^the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) "([^"]*)" should( not)? be displayed$/,
    async function (this: ScenarioWorld ,elementPosition: ElementPosition, elementKey: ElementKey, negate: Negate) {
        const { 
            screen: {driver},
            globalConfig 
        } = this
        
        logger.log(`the ${elementPosition} ${elementKey} should ${negate?"not":""} be displayed`)
        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async () => {
            const isElementVisible = await elementDisplayedAtIndex(driver, elementIdentifier, elementIndex)   
            if (isElementVisible  === !negate) {
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
    /^the "([^"]*)" should( not)? be enabled$/,
    async function (this: ScenarioWorld ,elementKey: ElementKey, negate: Negate) {
        const { 
            screen: {driver},
            globalConfig 
        } = this
        logger.log(`the ${elementKey} should ${negate?"not":""} be enabled`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const isElementEnabled = await elementEnabled(driver, elementIdentifier)   
                if (isElementEnabled  === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
            
        }, globalConfig, { 
            target: elementKey, 
            failureMessage: `🧨 Expected ${elementKey} to ${negate ? "not" : ""}be enabled`
        })
    }
)



Then(
    /^I should( not)? see (\d*) "([^"]*)" displayed$/,
    async function (this: ScenarioWorld, negate: Negate, elementCount: number, elementKey: ElementKey) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        logger.log(`I should ${negate?"not":""} see the ${elementCount} ${elementKey} displayed`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const elements = await getElements(driver, elementIdentifier)
            if( Number(elementCount) === elements.length === !negate) {
                return waitForResult.PASS
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementCount} ${elementKey} to ${negate ? "not" : ""}be displayed` 
        })
    }
)