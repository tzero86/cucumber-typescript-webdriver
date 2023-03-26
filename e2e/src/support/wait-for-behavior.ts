import { By, WebDriver, ElementLocator } from 'selenium-webdriver'
import { switchIframe } from './html-behavior';

export const waitFor = async<T>(
    predicate: () => T | Promise<T>,
    options?: { timeout?: number; wait?: number }

): Promise<T> => {

    const { timeout = 15000, wait = 2000 } = options || {}
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    const startDate = new Date()

    while (new Date().getTime() - startDate.getTime() < timeout) {
        const result = await predicate()
        if (result) {
            return result
        }
        await sleep(wait)
        console.log(`⏱️ Waiting for ${wait}ms...`)
    }
    throw new Error(`⌚ Wait time of ${timeout}ms exceeded.`)
}


export const waitForSelector = async(
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await driver.switchTo().defaultContent()
        await driver.findElement(By.css(elementIdentifier))
        return true
    } catch (e) {
        return false
    }

}

export const waitForSelectorWithText = async(
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await driver.switchTo().defaultContent()
        await driver.findElement(By.xpath(elementIdentifier))
        return true
    } catch (e) {
        return false
    }

}


export const waitForSelectorInIframe = async(
    driver: WebDriver,
    elementIframe: ElementLocator,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await switchIframe(driver, elementIframe)
        await driver.findElement(By.css(elementIdentifier))
        return true
    } catch (e) {
        return false
    }
}