import { Then } from "@cucumber/cucumber"
import { ElementKey, ExpectedElementText, Negate } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { ScenarioWorld } from "../setup/world"
import { waitFor } from "../setup/wait-for-behavior"
import { getElementText } from "../../support/html-behavior"



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
            const elementText = await getElementText(driver, elementIdentifier)
            return elementText?.includes(expectedElementText) === !negate
        })
        
    }
)

Then(
    /^the "([^"]*)" should( not)? equal the text "(.*)"$/,
    async function(elementKey: ElementKey, negate: Negate, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        console.log(`the ${elementKey} should ${negate?'not':''} equal the text ${expectedElementText}`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async() => {
            const elementText = await getElementText(driver, elementIdentifier)
            console.log(`elementText: ${elementText} \nexpectedElementText: ${expectedElementText}`)
            return elementText === expectedElementText === !negate
        })

    }
)

