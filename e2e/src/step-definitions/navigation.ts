import  { Given } from '@cucumber/cucumber'
import { PageId } from '../env/global'
import { currentPathMatchesPageId, reloadPage } from '../support/navigation-behavior'
import { navigateToPage } from '../support/navigation-behavior'
import { waitFor } from '../support/wait-for-behavior'
import { ScenarioWorld } from './setup/world'

Given(
    /^I am on the "([^"]*)" page$/,
    async function(this: ScenarioWorld ,pageId: PageId){
        const { 
            screen: {driver},
            globalConfig 
        } = this
        console.log(`I am on the ${pageId} page`)
        await navigateToPage(driver, pageId, globalConfig)
        await waitFor( () => currentPathMatchesPageId(driver, pageId, globalConfig))
    }
)


Given (
    /^I am directed to the "([^"]*)" page$/,
    async function(this: ScenarioWorld ,pageId: PageId){
        const { 
            screen: {driver},
            globalConfig 
        } = this
        console.log(`I am directed to the ${pageId} page`)
        await waitFor( () => currentPathMatchesPageId(driver, pageId, globalConfig))
    }
)


Given(
    /^I refresh the "([^"]*)" page$/,
    async function(this: ScenarioWorld ,pageId: PageId){
        const { 
            screen: {driver},
            globalConfig 
        } = this
        console.log(`I refresh the ${pageId} page`)
        await reloadPage(driver)
        await waitFor( () => currentPathMatchesPageId(driver, pageId, globalConfig), {
            timeout: 30000
        })
    }
)