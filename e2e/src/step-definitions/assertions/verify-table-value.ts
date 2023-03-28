import { DataTable, Then } from '@cucumber/cucumber'
import { waitFor, waitForSelector } from '../../support/wait-for-behavior'
import { ElementKey, Negate } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { getTableData } from '../../support/html-behavior'

Then(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function (this: ScenarioWorld ,elementKey: ElementKey, negate: Negate, dataTable: DataTable) {
        const { 
            screen: {driver},
            globalConfig 
        } = this

        console.log(`the ${elementKey} should ${negate?"not":""} equal the following:`)

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig)
        
        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier)

            if (elementStable) {
                const tableData = await getTableData(driver, elementIdentifier)
                console.log(`tableData: ${tableData}`)
                console.log(`dataTable.raw().toString(): ${dataTable.raw().toString()}`)
                return (tableData === dataTable.raw().toString())  === !negate
            }
            return elementStable
            
        })

    }
)