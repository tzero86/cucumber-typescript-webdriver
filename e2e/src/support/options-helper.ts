const optionsIncludeString = (string: string, options: readonly string[]) => {
    return options.includes(string)
}

export const stringIsOfOptions = (stringLevel: string, options: readonly string[]) => {
    if (optionsIncludeString(stringLevel, options)) {
        return stringLevel
    }
    throw Error(`🧨 '${stringLevel}' needs to be one of: ${options}`)
}