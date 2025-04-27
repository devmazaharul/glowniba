// lib/logger.ts
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { loggerControllerExternalObject } from '@/constants';

const {
  useExternalLogserver,
  loggerServerHost,
  loggerServerPath,
  loggerServerPort,
} = loggerControllerExternalObject;

const logFormat = format.combine(
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.printf(
    (info) =>
      `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message} ${
        info.metadata || ''
      }`
  )
);

const transportsArray = [
  useExternalLogserver
    ? new transports.Http({
        host: loggerServerHost,
        port: loggerServerPort,
        path: loggerServerPath,
      })
    : new transports.Console({ level: 'info' }),
];

export const systemLogger = createLogger({
  format: logFormat,
  transports: transportsArray,
});

// Now using console logging for Vercel environment
console.log('Logger initialized successfully.');
