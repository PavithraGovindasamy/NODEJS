const { createLogger, format, transports } = require('winston');
require('dotenv').config()
const loggers = (loggerLevel, loggerPath) =>
    createLogger({
        transports:
            new transports.File({
                level: loggerLevel,
                filename: loggerPath,
                format: format.combine(
                    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                    format.align(),
                    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
                )
            }),
    });
const errorLogger = loggers(process.env.ERRORLEVEL, "./logs/error.log");
const warnLogger = loggers(process.env.WARNLEVEL, "./logs/warn.log");

const logger = {
    error: (params) => {
        return errorLogger.error(params);
    },
    warn: (params) => {
        return warnLogger.warn(params);
    },
};

module.exports = logger;