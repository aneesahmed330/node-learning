const EventEmitter = require('events')

class Logger extends EventEmitter {
    
    log() {
        console.log("messaged logged on server")
        // raise event
        this.emit('MessageLogged', { id : 1 , url : 'http://..' , message: "Hello anees ahmed"})
    }

}




module.exports = Logger