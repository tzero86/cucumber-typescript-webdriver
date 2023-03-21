import { Then } from "@cucumber/cucumber"
import { ElementKey, ExpectedElementText } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { ScenarioWorld } from "../setup/world"
import { waitFor } from "../setup/wait-for-behavior"
import { getElementText } from "../../support/html-behavior"



Then (
    /^the "([^"]*)" should contain the text "(.*)"$/,
    async function(this: ScenarioWorld ,elementKey: ElementKey, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        console.log(`the ${elementKey} header should contain the text ${expectedElementText}`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async() => {
            const elementText = await getElementText(driver, elementIdentifier)
            return elementText?.includes(expectedElementText)
        })
        
    }
)

