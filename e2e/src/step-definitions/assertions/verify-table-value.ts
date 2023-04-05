import { DataTable, Then } from "@cucumber/cucumber"
import { waitFor, waitForResult, waitForSelector } from "../../support/wait-for-behavior"
import { ElementKey, Negate } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { ScenarioWorld } from "../setup/world"
import { getTableData } from "../../support/html-behavior"
import { logger } from "../../logger"

Then(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        negate: Negate,
        dataTable: DataTable
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this

        logger.log(
            `the ${elementKey} should ${
                negate ? "not" : ""
            } equal the following: ${dataTable.raw()}}`
        )

        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        )

        await waitFor(async () => {
            const elementStable = await waitForSelector(
                driver,
                elementIdentifier
            )

            if (elementStable) {
                const tableData = await getTableData(driver, elementIdentifier)
                if ((tableData === dataTable.raw().toString()) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        }, globalConfig, { 
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate ? "not" : ""}equal the following: ${dataTable.raw()}}` 
        })
    }
)
