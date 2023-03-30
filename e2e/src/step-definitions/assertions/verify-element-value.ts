import { Then } from "@cucumber/cucumber"
import { ElementKey, ElementPosition, ExpectedElementText, ExpectedElementValue, Negate } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { ScenarioWorld } from "../setup/world"
import { waitFor, waitForSelector } from "../../support/wait-for-behavior"
import { getAttributeText, getElementText, getElementTextAtIndex, getElementValue } from "../../support/html-behavior"



Then (
    /^the "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld ,elementKey: ElementKey, negate:Negate, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        console.log(`the ${elementKey} header should ${negate?'not':''} contain the text ${expectedElementText}`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier)
                return elementText?.includes(expectedElementText) === !negate
            }
            return elementStable
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

        console.log(`the ${elementKey} should ${negate?'not':''} equal the text ${expectedElementText}`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier)
                console.log(`elementText: ${elementText} \nexpectedElementText: ${expectedElementText}`)
                return elementText === expectedElementText === !negate
            }
            return elementStable
            
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

        console.log(`the ${elementKey} should ${negate?'not':''}contain the value ${expectedElementValue}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementAttribute = await getElementValue(driver, elementIdentifier)
                return elementAttribute?.includes(expectedElementValue) === !negate
            }
            return elementStable
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

        console.log(`the ${elementKey} should ${negate?'not':''} equal the value ${expectedElementValue}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementAttribute = await getElementValue(driver, elementIdentifier)
                return (elementAttribute === expectedElementValue) === !negate
            }
            return elementStable
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

        console.log(`the ${elementPosition} ${elementKey} should ${negate?'not':''} contain the text ${expectedElementText}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementText = await getElementTextAtIndex(driver, elementIdentifier, elementIndex)
                return elementText?.includes(expectedElementText) === !negate
            }
            return elementStable
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

        console.log(`the ${elementKey} ${elementAttribute} attribute should ${negate?'not':''} contain the text ${expectedElementText}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                const elementAttributeText = await getAttributeText(driver, elementIdentifier, elementAttribute)
                return elementAttributeText?.includes(expectedElementText) === !negate
            }
            return elementStable
        })
    }
)