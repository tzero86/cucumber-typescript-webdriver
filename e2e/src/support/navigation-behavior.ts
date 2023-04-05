import { WebDriver } from 'selenium-webdriver'
import { GlobalConfig, PageId } from '../env/global'
import { waitForResult } from './wait-for-behavior'

export const navigateToPage = async (
    driver: WebDriver,
    pageId: PageId,
    { pagesConfig, hostsConfig }: GlobalConfig
): Promise<void> => {
    
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost'
    } = process.env

    const hostPath = hostsConfig[`${hostName}`]
    const url = new URL(hostPath)
    const pageConfigItem = pagesConfig[pageId]
    url.pathname = pageConfigItem.route
    await driver.get(url.href)
}

export const currentPathMatchesPageId = async (
    driver: WebDriver,
    pageId: PageId,
    globalConfig: GlobalConfig
): Promise<waitForResult> => {
    const currentURL = await driver.getCurrentUrl()
    const { pathname: currentPath } = new URL(currentURL)

    if (pathMatchesPageId(currentPath, pageId, globalConfig)){
        return waitForResult.PASS
    }
    return waitForResult.ELEMENT_NOT_AVAILABLE 
}


const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig

): boolean => {
    let pageRegexString 
    try {
        pageRegexString = pagesConfig[pageId].regex
    } catch (e) {
        throw Error(`🧨 Failed to get regex mapping for page ${pageId}`)
    }
    const pageRegex = new RegExp(pageRegexString)
    return pageRegex.test(path)
}


export const getCurrentPageId = async (

    driver: WebDriver,
    globalConfig: GlobalConfig

): Promise<PageId> => {
    const { pagesConfig } = globalConfig
    const currentURL: string = await driver.getCurrentUrl()
    const pageConfigPageIds = Object.keys(pagesConfig)
    const { pathname: currentPath } = new URL(currentURL)
    const currentPageId = pageConfigPageIds.find((pageId) => pathMatchesPageId(currentPath, pageId, globalConfig))

    if (!currentPageId) {
        throw Error(`🧨 Failed to get page name from current route ${currentPath}, \
        Possible pages are: ${JSON.stringify(pagesConfig)}
        `)
    }

    return currentPageId
}

export const reloadPage = async (
    driver: WebDriver,

): Promise<void> => {
    await driver.navigate().refresh()
}