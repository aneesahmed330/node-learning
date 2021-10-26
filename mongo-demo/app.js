require('dotenv').config()
const mongoose = require('mongoose')
const debug = require('debug')("app:debug")
const {Course} = require('./schema/course')

mongoose.connect("mongodb://localhost/playground")
    .then(() => debug("Connected to the database 🚀"))
    .catch(err => debug(`${err.message} ❌`))


let createCourse = async () =>{
    let course = new Course({
        name: "Angular Js course",
        author :"Mosh" ,
        tags : [ "forntend" ,"UI/UX" , "Component-based"],
        isPublished: false
    })
    
    
    let result = await course.save()
    debug(result)

}


let getCourses = async () =>{

    try {
        let courses = await Course.find({
            author:"mosh",
            isPublished: true
        });
        console.log(courses)
    } catch (error) {
        debug(error)
    }



}


// createCourse()
getCourses();