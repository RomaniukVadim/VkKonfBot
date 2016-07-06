'use strict';
let winston = require('winston');
module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      name: 'info-console',
      handleExceptions: false,
      level: 'info',
      colorize: true,
      timestamp: true,
      json: false
    }),
    new winston.transports.Console({
      name: 'error-console',
      handleExceptions: false,
      level: 'error',
      colorize: true,
      timestamp: true,
      json: false
    }),
  ]
});
