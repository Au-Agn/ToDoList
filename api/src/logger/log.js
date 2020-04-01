const { createLogger, transports } = require('winston');
const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'info.log',
      level: 'debug',
      timestamp: true
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      timestamp: true
    })
  ]
});

module.exports = logger;

