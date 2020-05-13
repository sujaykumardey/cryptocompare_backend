const {createLogger,transports,format} =require('winston')
const { url } = require('../config/key');

require('winston-mongodb')
const logger= createLogger({
    transports:[
        new transports.File({
            filename:'loggerinfo.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.MongoDB({
            level:'error',
            db:url,
            options:{useUnifiedTopology: true},
            collection:'logfile',
            format:format.combine(format.timestamp(),format.json())
        })
    ]
})

module.exports=logger;