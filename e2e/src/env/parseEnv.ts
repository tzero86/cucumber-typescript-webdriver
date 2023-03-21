export const getJsonFromFile = <T = Record<string, string>>(path: string): T => {
    return require(`${process.cwd()}${path}`)
}


export const env = (key: string): string => {
    const value = process.env[key]
    if (!value) {
        throw Error(`🧨 No Environment variable found for ${key}`)
    }
    return value
}

export const envNumber = (key: string): number => {
    return Number(env(key))
}