import { Then } from '@cucumber/cucumber'
import { waitFor, waitForSelector } from '../../support/wait-for-behavior'
import { ElementKey, ElementPosition, Negate } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { elementDisplayed, elementDisplayedAtIndex, elementEnabled, getElements } from '../../support/html-behavior'


Then(
    /^the "([^"]*)" should( not)? be displayed$/,
    async function (this: ScenarioWorld ,elementKey: ElementKey, negate: Negate) {
        const { 
            screen: {driver},
            globalConfig 
        } = this
        console.log(`the ${elementKey} should ${negate?"not":""} be displayed`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const isElementVisible = await elementDisplayed(driver, elementIdentifier)   
            return isElementVisible  === !negate
        })
    
    })


Then(
    /^the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) "([^"]*)" should( not)? be displayed$/,
    async function (this: ScenarioWorld ,elementPosition: ElementPosition, elementKey: ElementKey, negate: Negate) {
        const { 
            screen: {driver},
            globalConfig 
        } = this
        
        console.log(`the ${elementPosition} ${elementKey} should ${negate?"not":""} be displayed`)
        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async () => {
            const isElementVisible = await elementDisplayedAtIndex(driver, elementIdentifier, elementIndex)   
            return isElementVisible  === !negate
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
        console.log(`the ${elementKey} should ${negate?"not":""} be enabled`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const isElementEnabled = await elementEnabled(driver, elementIdentifier)   
                return isElementEnabled  === !negate
            }
            return elementStable
            
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

        console.log(`I should ${negate?"not":""} see the ${elementCount} ${elementKey} displayed`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const elements = await getElements(driver, elementIdentifier)
            return Number(elementCount) === elements.length === !negate
        })
    }
)