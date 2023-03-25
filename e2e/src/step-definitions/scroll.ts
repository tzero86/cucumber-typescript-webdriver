import { Then } from '@cucumber/cucumber'
import { waitFor, waitForSelector } from '../support/wait-for-behavior'
import { ScenarioWorld } from './setup/world'
import { getElementLocator } from '../support/web-element-helper'
import { ElementKey} from '../env/global'
import { scrollElementIntoView } from '../support/html-behavior'


Then(
    /^I scroll to the "([^"]*)" (?:.*?)$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig
        } = this
        console.log(`I scroll to the ${elementKey}`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier)
            if (elementStable) {
                await scrollElementIntoView(driver, elementIdentifier)
                return elementStable
            }
        })
    }
)
