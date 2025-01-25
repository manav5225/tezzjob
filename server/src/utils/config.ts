export const APP_PORT = 8080
export const ENVIRONMENT = process.env.APP_ENV || 'dev'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const DB_URI = (): string => process.env.DB_URI || "";