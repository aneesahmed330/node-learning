const express = require('express');
const Joi = require('joi');
const router = express.Router();

// temp dataStore in memory
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

router.get('/', (req, res) => {
    return res.render('genres' , {Genres :Genres})
})
router.get('/:id', (req, res) => {
    let genre = findGenre(parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre is not Found!") //if not found   
    return (res.send(JSON.stringify(genre))) //if found

})
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router