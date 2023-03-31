import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import {
    waitFor,
    waitForSelector,
    waitForSelectorInIframe,
} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey, IframeKey, InputValue } from "../env/global";
import { inputElementValue } from "../support/html-behavior";
import { logger } from "../logger";

Then(
    /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        iframeKey: IframeKey,
        inputValue: InputValue
    ) {
        const {
            screen: { driver },
            globalConfig,
        } = this;

        logger.log(
            `I fill in the ${elementKey} input on the ${iframeKey} iframe with ${inputValue}`
        );
        const elementIdentifier = await getElementLocator(
            driver,
            elementKey,
            globalConfig
        );
        const iframeIdentifier = await getElementLocator(
            driver,
            iframeKey,
            globalConfig
        );

        await waitFor(async () => {
            const iframeStable = await waitForSelector(
                driver,
                iframeIdentifier
            );

            if (iframeStable) {
                const elementStable = await waitForSelectorInIframe(
                    driver,
                    iframeIdentifier,
                    elementIdentifier
                );
                if (elementStable) {
                    await inputElementValue(
                        driver,
                        elementIdentifier,
                        inputValue
                    );
                } else {
                    return elementStable;
                }
            }

            return iframeStable;
        });
    }
);
