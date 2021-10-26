const mongoose = require('mongoose');
// schemas
const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date , default : Date.now },
    isPublished : Boolean
})


// models
const Course = mongoose.model('Course' , courseSchema)



module.exports = { Course }