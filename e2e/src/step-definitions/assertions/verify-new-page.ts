import { Then } from "@cucumber/cucumber"
import { ElementKey, ExpectedElementText, Negate, PagePosition } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { ScenarioWorld } from "../setup/world"
import { waitFor, waitForSelector} from "../../support/wait-for-behavior"
import { elementDisplayed, getElementText, getTitleWithinPage } from "../../support/html-behavior"


Then(
    /^the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) tab should( not)? contain the title "(.*)"$/,
    async function(this: ScenarioWorld, pagePosition: PagePosition, negate: Negate, expectedTitle: string) {
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