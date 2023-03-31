import { env } from "../env/parseEnv"
import { stringIsOfOptions } from "../support/options-helper"

const DEBUG = 'debug'
const LOG = 'log'
const OFF = 'off'


const LOG_LEVELS = [DEBUG, LOG, OFF] as const

export type LogLevel = typeof LOG_LEVELS[number]


type LogFunction = (...msg: any[]) => void

type Logger = {
    debug: LogFunction
    log: LogFunction
}


const getLogLevel = (logLevel: LogLevel): LogLevel[] => {
    const dynamicLogLevelIndex = LOG_LEVELS.indexOf(logLevel)
    return LOG_LEVELS.slice(dynamicLogLevelIndex)
}


const logFuncAtLevels =
    (logLevels: LogLevel[], logFunction: Logger = console) =>
        (logLevel: LogLevel, ...msg: any[]) => {
            if (logLevel !== OFF && logLevels.indexOf(logLevel) !== -1 && msg.length > 0) {
                logFunction[logLevel](...msg)
            }
        }



const createLogger = (logLevel: LogLevel): Logger => {
    const activeLogLevel = getLogLevel(logLevel)
    const logger = logFuncAtLevels(activeLogLevel)

    return LOG_LEVELS.reduce(
        (accumulator: Record<string, LogFunction>, level: LogLevel) => ({
            ...accumulator,
            [level]: (...msg: any[]) => logger(level, ...msg),
        }),

        {}
    ) as Logger
}


let loggerSingleton: Logger | null = null
export const getLogger = (): Logger => {
    if(!loggerSingleton){
        const logLevel = env('LOG_LEVEL')
        const validLogLevel = stringIsOfOptions<LogLevel>(logLevel, LOG_LEVELS)
        loggerSingleton = createLogger(validLogLevel)
    }
    return loggerSingleton
}

