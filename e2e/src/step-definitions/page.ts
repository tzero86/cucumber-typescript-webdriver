import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { waitFor, waitForSelectorOnPage } from '../support/wait-for-behavior';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey, InputValue, PagePosition } from '../env/global';
import { inputElementValue } from '../support/html-behavior';

Then(
    /^I fill in the "([^"]*)" input on the ([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd) (?:window|tab) with "([^"]*)"$/i,
    async function (this: ScenarioWorld, elementKey: ElementKey, pagePosition: PagePosition, inputValue: InputValue) {
        const {
            screen: { driver },
            globalConfig
        } = this

        console.log(`I fill in the ${elementKey} input on the ${pagePosition} tab with ${inputValue}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        const pageIndex = Number(pagePosition.match(/\d/g)?.join('')) - 1

        await waitFor(async () => {
            const elementStable = await waitForSelectorOnPage(driver, elementIdentifier, pageIndex)

            if (elementStable) {
                await inputElementValue(driver, elementIdentifier, inputValue)
            }

            return elementStable
        })

    }
)