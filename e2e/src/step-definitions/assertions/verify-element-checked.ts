import { Then } from '@cucumber/cucumber'
import { waitFor } from '../setup/wait-for-behavior'
import { ScenarioWorld } from '../setup/world'
import { getElementLocator } from '../../support/web-element-helper'
import { ElementKey, Negate } from '../../env/global'
import { elementChecked } from '../../support/html-behavior'

Then (
    /^the "([^"]*)" radio button should( not)? be checked$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: Negate) {
        const { 
            screen: { driver },
            globalConfig
        } = this
        console.log(`the ${elementKey} check should ${negate?'not':''} be checked`)
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)

        await waitFor( async () => {
            const isElementChecked = await elementChecked(driver, elementIdentifier)
            console.log(`isElementChecked: ${isElementChecked}`)
            console.log(`negate: ${!negate}`)
            return isElementChecked === !negate
        })
    }
)