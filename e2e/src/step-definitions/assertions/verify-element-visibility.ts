import { Then } from '@cucumber/cucumber'
import { waitFor } from '../../support/wait-for-behavior'
import { ElementKey, Negate } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { elementDisplayed, elementEnabled } from '../../support/html-behavior'


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
    /^the "([^"]*)" should( not)? be enabled$/,
    async function (this: ScenarioWorld ,elementKey: ElementKey, negate: Negate) {
        const { 
            screen: {driver},
            globalConfig 
        } = this
        console.log(`the ${elementKey} should ${negate?"not":""} be enabled`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const isElementEnabled = await elementEnabled(driver, elementIdentifier)   
            return isElementEnabled  === !negate
        })
    }
)