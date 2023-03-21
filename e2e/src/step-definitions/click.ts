import { When } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { clickElement } from '../support/html-behavior';
import { waitFor, waitForSelector } from './setup/wait-for-behavior';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey } from '../env/global';


When(
    /^I click the "([^"]*)" button$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig
        } = this

        console.log(`I click the ${elementKey} button`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier)

            if (elementStable) {
                await clickElement(driver, elementIdentifier)
            }

            return elementStable
        })

    }
)