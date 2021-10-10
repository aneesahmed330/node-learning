const express = require('express');
require('dotenv').config()
const app = express()


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
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('No Course found with this ID')
    res.send(course);
} )


app.post('/api/courses', (req ,res) => {

    if (!req.body.name || req.body.name <3)

    const course = {
        id: courses.length +1,
        name:req.body.name
    }
    
    courses.push(course);
    res.send(course);
} )
const port = process.env.PORT || 1337

app.listen(port, () => {
    console.log(`Listening on the port: ${port}`)
})