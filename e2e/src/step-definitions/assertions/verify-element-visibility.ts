import { Then } from '@cucumber/cucumber'
import { expect } from 'chai'
import { By } from 'selenium-webdriver'
import { waitFor } from '../setup/wait-for-behavior'
import { ElementKey, ExpectedElementText } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { elementDisplayed } from '../../support/html-behavior'


Then (
    /^the "([^"]*)" should contain the text "(.*)"$/,
    async function(this: ScenarioWorld ,elementKey: ElementKey, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalVariables,
            globalConfig 
        } = this

        console.log(`the ${elementKey} header should contain the text ${expectedElementText}`)
        const elementIdentifier = getElementLocator(driver, elementKey, globalVariables, globalConfig)
        const element = await driver.findElement(By.css(elementIdentifier))
        const elementText = await element.getAttribute("innerText")
        expect(elementText).to.contain(expectedElementText)

    }
)

Then(
    /^the "([^"]*)" should be displayed$/,
    async function (this: ScenarioWorld ,elementKey: ElementKey) {
        const { 
            screen: {driver},
            globalVariables,
            globalConfig 
        } = this
        console.log(`the ${elementKey} should be displayed`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalVariables, globalConfig)
        
        await waitFor(async () => {
            const isElementVisible = await elementDisplayed(driver, elementIdentifier)   
            return isElementVisible 
        })
    
    })


