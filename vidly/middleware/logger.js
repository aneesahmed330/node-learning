const logger = (req, res ,next) => {
    console.log("Logged: The messaged logged on console!")
    next();
}

module.exports = logger;