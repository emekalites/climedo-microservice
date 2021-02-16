import winston from 'winston';

var logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ]
});

export default logger