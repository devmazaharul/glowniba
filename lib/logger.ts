// lib/logger.ts
import { createLogger, format, transports } from 'winston';
import { loggerControllerExternalObject } from '@/constants';

const {
  useExternalLogserver,
  loggerServerHost,
  loggerServerPath,
  loggerServerPort,
} = loggerControllerExternalObject;

const logFormat = format.combine(
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message} `;
  })
);

const transportsArray = [
  useExternalLogserver
    ? new transports.Http({
        host: loggerServerHost,
        port: loggerServerPort,
        path: loggerServerPath,
      })
    : new transports.Console(),
];

export const systemLogger = createLogger({
  format: logFormat,
  transports: transportsArray,
});

// Now using console logging for Vercel environment
// console.log('Logger initialized successfully.');
