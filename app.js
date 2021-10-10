const Logger = require('./logger')
const logger = new Logger()

logger.on('MessageLogged' , (args) => {
    console.log('message: ' , args.message )
})

logger.log()
