import { By, WebDriver, WebElement } from "selenium-webdriver"
import { ElementIndex, ElementLocator, InputValue, PageIndex } from "../env/global"


export const browserSleep = async (
    driver: WebDriver,
    waitSeconds: string
): Promise<void> => {
    await driver.sleep(parseInt(waitSeconds, 10) * 1000)
}


export const getElement = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<WebElement> => {
    const element = await driver.findElement(By.css(elementIdentifier))
    return element
}


export const getElements = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<WebElement[]> => {
    const elements = await driver.findElements(By.css(elementIdentifier))
    return elements
}


export const getElementWithOption = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    option: string
): Promise<WebElement> => {
    const element = await driver.findElement(By.css(`${elementIdentifier} > option[value="${option}"]`))
    return element
}



export const elementDisplayed = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean | null> => {
    try {
        await driver.findElement(By.css(elementIdentifier))
        return true
    } catch (e) {
        return false
    }
}


export const elementDisplayedAtIndex = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    elementIndex: ElementIndex
): Promise<boolean | null> => { 
    try {
        const elements = await getElements(driver, elementIdentifier)
        await elements[elementIndex].isDisplayed()
        return true
    } catch (e) {
        return false
    }
}


export const getElementText = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<string | null> => {
    const element = await getElement(driver, elementIdentifier)
    const elementText = await element.getAttribute('innerText')
    return elementText
}


export const getElementTextAtIndex = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    index: number
): Promise<string | null> => {
    const elements = await getElements(driver, elementIdentifier)
    const textAtIndex = await elements[index].getAttribute('innerText')
    return textAtIndex
}


export const clickElement = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = await getElement(driver, elementIdentifier)
    await element.click()
}


export const clickElementAtIndex = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    index: number
): Promise<void> => {
    const elements = await getElements(driver, elementIdentifier)
    await elements[index].click()
}



export const clickElementWithText = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = await driver.findElement(By.xpath(elementIdentifier))
    await element.click()
}


export const inputElementValue = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    inputValue: InputValue
): Promise<void> => {
    const element = await getElement(driver, elementIdentifier)
    await element.clear()
    await element.sendKeys(inputValue)
}


export const selectElementValue = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    const element = await getElementWithOption(driver, elementIdentifier, option)
    await element.click()
}

export const elementChecked = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean | null> => {
    const element = await getElement(driver, elementIdentifier)
    if (!await element.isSelected()) {
        return false
    } else {
        return true
    }
}


export const getElementValue = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<string> => {
    const element = await getElement(driver, elementIdentifier)
    return await element.getAttribute('value')
}

export const scrollElementIntoView = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = await getElement(driver, elementIdentifier)
    await driver.executeScript('arguments[0].scrollIntoView(false)', element)
    await driver.sleep(1500)
}


export const scrollElementIntoViewAtIndex = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    index: number
): Promise<void> => {
    const element = await getElements(driver, elementIdentifier)
    await driver.executeScript('arguments[0].scrollIntoView(false)', element[index])
    await driver.sleep(1500)
}



export const elementEnabled = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean | null> => {
    const element = await getElement(driver, elementIdentifier)
    if (!await element.isEnabled()) {
        return false
    } else {
        return true
    }
}


export const switchIframe = async (
    driver: WebDriver,
    elementIframe: ElementLocator

): Promise<void> => {
    await driver.switchTo().frame(driver.findElement(By.css(elementIframe)))
}


export const switchWindow = async (
    driver: WebDriver,
    pageIndex: PageIndex
): Promise<void> => {
    const winHandles = driver.getAllWindowHandles()
    winHandles.then((handles) => {
        const currentWindow = handles[pageIndex]
        driver.switchTo().window(currentWindow)
    })
}


export const getTitleWithinPage = async (
    driver: WebDriver,
    pageIndex: PageIndex
): Promise<string | null> => {
    await switchWindow(driver, pageIndex)
    return driver.getTitle()
}


const retrieveTableData = (
    driver: WebDriver,
    elementIdentifier: ElementLocator
) => {
    return new Promise((resolve) => {
        const cell: string[] = []
        driver.findElement(By.css(elementIdentifier+" tbody")).then(async function(rows) {
          rows.findElements(By.css("tr td")).then(async function (cells) {
                for (let i = 0; i < cells.length; i++) {
                    const cell_text = await cells[i].getText()
                    cell.push(cell_text)
                }
                resolve(cell)
            })
        })
    })
}


export const getTableData = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<string> => {
    const asyncFunction = [
        await retrieveTableData(driver, elementIdentifier)
    ]
    const tableData = await Promise.all(asyncFunction)
    return tableData.toString()
}


export const clickDismissOnDialog = async (
    driver: WebDriver,
): Promise<void> => {
    await driver.switchTo().alert().dismiss()
}


export const clickAcceptOnDialog = async (
    driver: WebDriver,
): Promise<void> => {
    await driver.switchTo().alert().accept()
}


export const getAttributeText = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    elementAttribute: string
): Promise<string | null> => {
    const element = await getElement(driver, elementIdentifier)
    const attributeText = await element.getAttribute(elementAttribute)
    return attributeText
}