import { Then } from "@cucumber/cucumber"
import { ExpectedElementText, Negate, PagePosition } from "../../env/global"
import { ScenarioWorld } from "../setup/world"
import { waitFor, waitForSelectorOnPage} from "../../support/wait-for-behavior"
import { getElementText, getTitleWithinPage } from "../../support/html-behavior"
import { getElementLocator } from "../../support/web-element-helper"


Then(
    /^the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) should( not)? contain the title "(.*)"$/,
    async function(this: ScenarioWorld, pagePosition: PagePosition, negate: Negate, expectedTitle: ExpectedElementText) {
        const { 
            screen: {driver}
        } = this

        console.log(`the ${pagePosition} tab should ${negate?'not':''} contain the title ${expectedTitle}`)

        const pageIndex =  Number(pagePosition.match(/\d/g)?.join('')) - 1

        await waitFor(async() => {
            const pageTitle = await getTitleWithinPage(driver, pageIndex)
            return pageTitle?.includes(expectedTitle) === !negate
        })

    }
)


Then(
    /^the "([^"]*)" on the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: string, pagePosition: PagePosition, negate: Negate) {

        const {
            screen: {driver},
            globalConfig
        } = this

        console.log(`the ${elementKey} on the ${pagePosition} tab should ${negate?'not':''} displayed`)

        const pageIndex =  Number(pagePosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async() => {
            const isElementVisible = await waitForSelectorOnPage(driver, elementIdentifier, pageIndex)
            return isElementVisible === !negate
        })

    }
)

Then(
    /^the "([^"]*)" on the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: string, pagePosition: PagePosition, negate: Negate, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        console.log(`the ${elementKey} on the ${pagePosition} tab should ${negate?'not':''} contain the text ${expectedElementText}`)
        const pageIndex =  Number(pagePosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async() => {
            const elementStable = await waitForSelectorOnPage(driver, elementIdentifier, pageIndex)
            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier)
                return elementText?.includes(expectedElementText) === !negate
            }
            return elementStable
        })
    }
)

Then(
    /^the "([^"]*)" on the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) should( not)? equal the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: string, pagePosition: PagePosition, negate: Negate, expectedElementText: ExpectedElementText) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        console.log(`the ${elementKey} on the ${pagePosition} tab should ${negate?'not':''} equal the text ${expectedElementText}`)
        const pageIndex =  Number(pagePosition.match(/\d/g)?.join('')) - 1
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async() => {
            const elementStable = await waitForSelectorOnPage(driver, elementIdentifier, pageIndex)
            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier)
                return (elementText === expectedElementText) === !negate
            }
            return elementStable
        })
    }
)
