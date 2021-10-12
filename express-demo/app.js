require('dotenv').config()
const express = require('express');
const app = express()
const Joi = require('joi');



// enable pasing of JSON
app.use(express.json());


// dummy data
const courses = [
    {id: 1 , name: 'chemistry'},
    {id: 2 , name: 'Physics'},
    {id: 3 , name: 'mathematics'},
    {id: 4 , name : 'computer science'}
]



app.get('/', (req , res ) => {
    res.send('HELLO ANEES AHMED')
})

app.get('/api/courses',  (req , res ) => {  
    res.send(courses)
} )

app.get('/api/courses/:id' , (req ,res ) => {
    let course = findCourse(req.params.id)
    if(!course) res.status(404).send('No Course found with this ID')
    res.send(course);
} )


app.post('/api/courses', (req ,res) => {
    
    // validate
    let {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error.message)

    // craeate course
    const course = {
        id: courses.length +1,
        name:req.body.name
    }

    //update array    
    courses.push(course);
    res.send(course);
} )


app.put('/api/courses/:id', (req ,res) => {
    
    // first i need to get course!
    let course = findCourse(req.params.id)
    if(!course) return res.status(404).send("The course with that particular 'id' doesn't exist!!")

    // first validate the user updated name
    let { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.message)

    // update the name
    course.name = req.body.name;
    return res.send(course)

} )


app.delete('/api/courses/:id' , (req , res) => {
    //first need to find that course
    let course = findCourse(req.params.id)
    if(!course) return res.status(400).send("Course with that particular id doesn't exist")
    
    let index = courses.indexOf(course);
    if(index > -1 ) 
    {
        courses.splice(index,1)
        return res.send(`The ${course.name} is deleted!`)
    }

    
})



//helper functions
const validateCourse = (course) => {
    
    // define the schema
    const schema = Joi.object({
    name : Joi.string().min(5).max(15).required()
     })
    // validate and give back result
    let result = schema.validate(course)
    return result
    
}

const findCourse = (id) => {
    let course = courses.find(c =>c.id === parseInt(id))
    return course
}


const port = process.env.PORT || 1337

app.listen(port, () => {
    console.log(`Listening on the port: ${port}`)
})