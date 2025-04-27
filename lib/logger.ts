// lib/logger.ts
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';
// import { loggerControllerExternalObject } from '@/constants';

// const {
//   useExternalLogserver,
//   loggerServerHost,
//   loggerServerPath,
//   loggerServerPort,
// } = loggerControllerExternalObject;

const logDirectory = path.join(process.cwd(), 'logs');

// Create the log directory if it doesn't exist (fix for ensuring writable directory)
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true }); // Ensure it creates the directory if it doesn't exist
}

const logFormat = format.combine(
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.printf(
    (info) =>
      `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message} ${
        info.metadata || ''
      }`
  )
);

// ✅ Info log file (info, warn, etc.)
const infoTransport = new transports.DailyRotateFile({
  filename: path.join(logDirectory, 'info-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  level: 'info',
});

// ❌ Error log file only (error)
const errorTransport = new transports.DailyRotateFile({
  filename: path.join(logDirectory, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  level: 'error',
});

// ✅ Setup logger with both local and external options
const transportsArray = [infoTransport, errorTransport];

export const systemLogger = createLogger({
  format: logFormat,
  transports: transportsArray,
});

// Error handling: Wrap logger creation inside try-catch for safety (fix)
try {
  createLogger({
    format: logFormat,
    transports: transportsArray,
  });
} catch (error) {
  console.error('Error while setting up the logger:', error);
}
