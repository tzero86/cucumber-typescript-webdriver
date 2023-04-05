import { Then } from '@cucumber/cucumber'
import  AxeBuilder from '@axe-core/webdriverjs'
import { ScenarioWorld } from './setup/world'
import { getCurrentPageId } from '../support/navigation-behavior'
import { createHtmlReport } from 'axe-html-reporter'
import { env } from '../env/parseEnv'
import { logger } from '../logger'


Then(
    /^I generate an accessibility analysis report$/,
    async function(this: ScenarioWorld) {
        const {
            screen: { driver },
            globalConfig
        } = this
        
        const pageId = await getCurrentPageId(driver, globalConfig)
        logger.log(`I generate an accessibility analysis report for ${pageId} page.`)
        
        await new AxeBuilder(driver).analyze( (error, results) => {
            createHtmlReport({results: { violations: results?.violations},
                options: {
                    outputDir: `${env('ACCESSIBILITY_REPORT_PATH')}`,
                    reportFileName: `${pageId}_${env('HTML_ACCESSIBILITY_FILE')}`,
                }
            })
        })
    }
)