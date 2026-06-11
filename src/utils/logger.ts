import winston from 'winston'
import 'winston-daily-rotate-file'

// Custom format — timestamp + level + message
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`
  })
)

// Development transport — console pe dikhao
const devTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    logFormat
  )
})

// Production transport — file mein save karo (sirf errors)
const prodTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',  
  datePattern: 'YYYY-MM-DD',
  level: 'error',         
  maxFiles: '30d'      
})

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: logFormat,
  transports: process.env.NODE_ENV === 'production'
    ? [prodTransport]
    : [devTransport]
})

export default logger