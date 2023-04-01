import { By, WebDriver, ElementLocator } from "selenium-webdriver";
import { switchIframe, switchWindow } from "./html-behavior";
import { logger } from "../logger";
import { GlobalConfig, WaitForTarget, WaitForTargetType } from "../env/global";
import { envNumber } from "../env/parseEnv";


export const enum waitForResult {
    PASS = 1,
    FAIL = 2,
    ELEMENT_NOT_AVAILABLE = 3,
}

export type waitForResultWithContext = {
    result: waitForResult
    replace?: string
}


export const waitFor = async(
    predicate: () => 
    | waitForResult
    | Promise<waitForResult>
    | waitForResultWithContext
    | Promise<waitForResultWithContext>,
    globalConfig: GlobalConfig,

    options?: { 
        timeout?: number 
        wait?: number 
        target?: WaitForTarget 
        type?: WaitForTargetType
        failureMessage?: string 
    }

): Promise<void> => {
    const { 
        timeout = envNumber('WAITFOR_TIMEOUT'), 
        wait = envNumber('WAITFOR_POLL_WAIT'), 
        target= '', 
        type= 'element' 
    } = options || {}

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    const startDate = new Date()
    let notAvailableContext: string | undefined
    let resultAs = waitForResult.ELEMENT_NOT_AVAILABLE

    while (new Date().getTime() - startDate.getTime() < timeout) {
        const result = await predicate()

        if ((result as waitForResultWithContext).result) {
            notAvailableContext = (result as waitForResultWithContext).replace
            resultAs = (result as waitForResultWithContext).result
        } else {
            resultAs = result as waitForResult
        }

        if (resultAs === waitForResult.PASS) {
            return
        }

        await sleep(wait)
        logger.log(`⏱️ Waiting for ${wait}ms...`)
    }

    const waitForErrorMessage = 
        resultAs === waitForResult.ELEMENT_NOT_AVAILABLE
        ? `\n 🧨 Timed out after ${timeout}ms waiting for the ${notAvailableContext || target} ${type}`
        : options?.failureMessage || 'Test Assertion Failed'
    throw new Error(waitForErrorMessage)
};


export const waitForSelector = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await driver.switchTo().defaultContent();
        await driver.findElement(By.css(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
};

export const waitForSelectors = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await driver.switchTo().defaultContent();
        await driver.findElements(By.css(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
};

export const waitForSelectorWithText = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await driver.switchTo().defaultContent();
        await driver.findElement(By.xpath(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
};

export const waitForSelectorInIframe = async (
    driver: WebDriver,
    elementIframe: ElementLocator,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await switchIframe(driver, elementIframe);
        await driver.findElement(By.css(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
};

export const waitForSelectorOnPage = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    pageIndex: number
): Promise<boolean> => {
    try {
        await switchWindow(driver, pageIndex);
        await driver.findElement(By.css(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
};
