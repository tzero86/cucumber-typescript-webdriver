import { When } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import { clickElement } from "../support/html-behavior";
import { waitFor, waitForResult, waitForSelector } from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import { logger } from "../logger";

When(
    /^I (check)?(uncheck)? the "([^"]*)" (?:radio button|check box|switch)$/,
    async function (
        this: ScenarioWorld,
        checked: boolean,
        uncheck: boolean,
        elementKey: ElementKey
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this;

        logger.log(
            `I ${
                uncheck ? "uncheck" : "check"
            } the ${elementKey} radio button|check box|switch`
        );
        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        );

        await waitFor(async () => {
            const elementStable = await waitForSelector(
                driver,
                elementIdentifier
            );

            if (elementStable) {
                await clickElement(driver, elementIdentifier)
                return waitForResult.PASS
            }

            return waitForResult.ELEMENT_NOT_AVAILABLE
        }, globalConfig, { target: elementKey });
    }
);
