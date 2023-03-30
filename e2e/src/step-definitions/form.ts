import {Then} from '@cucumber/cucumber'
import {waitFor, waitForSelector} from '../support/wait-for-behavior'
import {getElementLocator} from '../support/web-element-helper'
import {ScenarioWorld} from './setup/world'
import {ElementKey, InputValue} from '../env/global'
import {inputElementValue, selectElementValue} from '../support/html-behavior'
import { parseInput } from '../support/input-helper'

Then(
    /^I fill in the "([^"]*)" input with "([^"]*)"$/i,
    async function (this: ScenarioWorld, elementKey: ElementKey, inputValue: InputValue) {

        const {
            screen: {driver},
            globalConfig
        } = this

        console.log(`I fill in the ${elementKey} input with ${inputValue}`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier)

            if (elementStable) {
                const parsedInput = parseInput(inputValue, globalConfig)
                await inputElementValue(driver, elementIdentifier, parsedInput)
            }

            return elementStable
        })
    }
)

Then(
    /^I select the "([^"]*)" option from the "([^"]*)"$/,
    async function (this: ScenarioWorld, option: string, elementKey: ElementKey) {
        const {
            screen: {driver},
            globalConfig
        } = this

        console.log(`I select the ${option} option from the ${elementKey} dropdown`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier)

            if (elementStable) {
                await selectElementValue(driver, elementIdentifier, option)
            }

            return elementStable
        })
    }
)
