require('dotenv').config()
const morgan = require('morgan')
const express = require('express');
const logger = require('./middleware/logger')
const debug = require('debug')('app:debug')
const config = require('config')
const helmet = require('helmet') // middleware
const Genres = require('./routes/genres');
const app = express();


// debug package!
debug('application starts..✌️')
app.use(express.json()) // parse json object in body
app.use(helmet()) // setting various http headers
app.use(express.static('public')) //for static resourses

// template Engines configurations
app.set('view engine' , 'ejs') 

// config
console.log(`App Name:  ${config.get('name')}`)
console.log(`Mail Server Name:  ${config.get('mail.host')}`)
console.log(`Mail server pass: ${config.get('mail.pass')}`)

// logging req in 'dev' mode 
if (process.env.NODE_ENV === 'dev') {
    app.use(logger) //custom  middle-ware
    app.use(morgan('dev')) //dev-loggig
}

// registering the genres route
app.use('/api/genres' , Genres) 

/*
two ways 
console.log(process.env.NODE_ENV) // 
console.log(app.get('env'))  // return development by default
*/


app.get('/', (req, res) => {
    return res.render('index')

})
app.get('/about', (req, res) => {
    return res.render('about')

})

// create the server
const PORT = process.env.PORT || 1337
app.listen(PORT, () => {
    console.log(`server is listening on the port: ${PORT}`)
})