export type Negate = boolean
export type PageId = string
export type IframeKey = string
export type PagePosition = string
export type ElementPosition = string
export type ElementKey = string
export type ElementIndex = number
export type PageIndex = number
export type ElementLocator = string
export type ExpectedElementText = string
export type ExpectedElementValue = string
export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>
export type PagesConfig = Record<PageId, Record<string, string>>
export type HostsConfig = Record<string, string>
export type EmailsConfig = Record<string, string>
export type GlobalVariables = { [key: string]: string}
export type GlobalVariableKey = string
export type WaitForTarget = PageId | ElementKey
export type WaitForTargetType = string
export type InputValue = string

export type GlobalConfig = {
    hostsConfig: HostsConfig
    pagesConfig: PagesConfig
    pageElementMappings: PageElementMappings
    emailsConfig: EmailsConfig
}