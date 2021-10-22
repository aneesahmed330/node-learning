require('dotenv').config()
const mongoose = require('mongoose')
const debug = require('debug')("app:debug")

mongoose.connect("mongodb://localhost")
    .then(() => debug("Connected to the database 🚀"))
    .catch(err => debug(`${err.message} ❌`))