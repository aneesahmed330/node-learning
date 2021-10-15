require('dotenv').config()
const express = require('express');
const logger = require('./middleware/logger')
const Joi = require('joi');
const app = express();

// parse json object in body
app.use(express.json())

//for static resourses
app.use(express.static('public'))

app.use(logger)


const Genres = [{
        id: 1,
        name: "Comedy"
    },
    {
        id: 2,
        name: "Thriller"
    },
    {
        id: 3,
        name: "Horror"
    },
    {
        id: 4,
        name: "Action"
    },
    {
        id: 5,
        name: "Sci-Fic"
    }

]

app.get('/api/genres', (req, res) => {
    return res.send(Genres)
})

app.get('/api/genres/:id', (req, res) => {
    let genre = findGenre(parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre is not Found!") //if not found   
    return (res.send(JSON.stringify(genre))) //if found

})
app.post('/api/genres', (req, res) => {
    // validate genre first
    const {
        error
    } = validateGenre(req.body)
    if (error) return res.status(400).send(error.message) //if error

    let genre = {
        id: Genres.length + 1,
        name: req.body.name
    }
    // add to the array
    Genres.push(genre);
    res.send(`The "${genre.name}" is added to the list!`)


})
app.put('/api/genres/:id', (req, res) => {
    //find that
    let genre = findGenre(parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre is not Found!") //if not found  
    // validate that
    const {
        error
    } = validateGenre(req.body)
    if (error) return res.status(400).send(error.message) //if error
    // update that
    genre.name = req.body.name
    return res.send(JSON.stringify(genre))
})
app.delete('/api/genres/:id', (req, res) => {
    //find genre
    let genre = findGenre(parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre is not Found!") //if not found 

    //find index
    let index = Genres.indexOf(genre)
    if (index > -1) {
        Genres.splice(index, 1)
        return res.send(`The ${genre.name} is deleted!`)
    }
})




app.get('/', (req, res) => {
    return res.send("<h1>Welcome to the Vidily</h1>")

})

// helper function
const findGenre = (id) => {
    let genre = Genres.find(c => c.id === id)
    return genre
}
const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(15).required()
    })
    let result = schema.validate(genre)
    return result

}


// create the server
const PORT = process.env.PORT || 1337
app.listen(PORT, () => {
    console.log(`server is listening on the port: ${PORT}`)
})