# NODE JS GuideLine

# Node Module System

## Global Objects

In the browswer we have `window object` to access the Globally avaliable objects and functions
for example:

`var msg = "something" ; console.log(window.msg)`

but in node we have `global object` like to access the globally avaliable object and functions
for example

`global.setTimeout()`

In node we have module system the variable and function define in file are globally avalible in that
file.we can't access it like `global object`
for example:

`var message = "something"; console.log(global.message) // undefined`

## module System

variables and functions that define in file are not globally avaliable they are only avalibale in that
module

Evey file in node consider to be module

`console.log(module)`

if we want to use the variable or function define in another module we have to `export` them

## Create a module

create new file `logger.js` and

```
function log(message){
    //send HTTP request
    console.log(message)

}
module.exports.log =log;
```

## Load a module

To load a module we need a `require()` function
which take 1 parameter path to module we want to load!
In `app.js`

const logger = require(./logger)

logger.log("my message")

for a single method we don't need to export object we can export a function

`module.exports = log`

## module wrapper function

```
node wrappes the module in wrapper function
(function(module,exports,require,__filename,__dirname){
    //module code
})
```

## Path Module

module u should aware of

> File System
> HTTP
> OS
> Path
> Process
> Querry Strings => useful in building http services
> Stream

path.parse() => used to parse path

## OS Module

os.totalmem()
os.freemem()
os.hostname()

# NPM -Node Package Manager

## create package.json

npm init -y

## installing package

npm i package-name

## installing pacakages from the package.json

npm i

## Semantic version

```
4 . 34  . 34
^   ^      ^
|   |      |
|   |      Patch version
|   |
|   minor version
|
major version

^4.34.34 = 4.x
~4.34.34 = 4.34.x
4.34.34 = 4.34.34  // exact
```

## list Dependency

npm list => list all dependencies
npm list --depth=0 => root level application dependencies listing

## view package dependencies and meta data

npm view package-name
npm view package-name dependencies
npm view package-name versions

## installing specific package

npm i mongoose@specific version

## updated packages

> npm outdated

> npm update

> sudo npm i -g npm-check-updates

> npm-check-updates

> ncu -u

> npm install

## Dev Dependencies

```
These are only those dependencies that are required during the development
like for unit testing , static analysis etc etc.It should not go in developed application

Example:
npm i jshint --save-dev

```

## Un-Install package

```
Uninstall package from project

EXample:
npm un package-name

```

## Working with Global package

```
To install a package globally we add '-g' flag with command

example:

npm i -g package@version

```

## Publish your own packages

```
added later!


```

# 4. Building the Restful Api using Express

## Introduction to Express

```
Installing Express

npm i express

```

## Building Web Server

req and res have many useful other methods

```
const express = require('express')
const app = express();

app.get('/' , (req,res) => {
    res.send('<h1>Home Page</h1>');
})

app.get('/api/courses' , (req,res) => {
    res.send([1,2,3,4,5,6,7]);
})


app.listen(3000 , () => console.log("app listening on port 3000..."))

```

nodemon can be install `npm i -g nodemon`

we can use port from the envirnment variable.

`const port = process.env.PORT || 3000`

## Route Parameter and query parameters

```
app.get('/api/courses/:id/:role' , (req,res) => {
    res.send(req.params);

})


app.get('/api/courses/:id/:role' , (req,res) => {
    res.send(req.query);

})


```

## GET Request Method

```
app.get('/' , (req,res)=> {
    res.send("<h1>Welcome to the home page!! and i love coding</h1>")
})

```

## POST Request Method:

To access / parse the request body json objects we need to use the middleware
`app.use(express.json())`

```

app.post('/api/courses', (req,res) => {
    const course =
    {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

```

## Input validation

To validate inputs in the post request we use `joi` package

> `npm i joi`

```

> For first add into your project
const Joi = require('joi');

> then create the schema object:
const schema = Joi.object(
    {
        // it would be string, min 5 character, and required!

        name: Joi.string().min(5).required()
    }
);

const  result = schema.validate(req.body);

> result will either have 'error' or 'value'
if(result.error){
    // req is bad '400'
    res.status(400).send(result.error.message);
}

```

# 5. Express Advance Topics

> Middleware,
> Configuration,
> Debugging,
> Templeting Engines

## Middleware & Middleware function

Request process pipeline we have, where each middleware either
pass the request to next middleware or replay to that request or terminate that request!

## creating custom routes

you can add custom middleware as it has `3 parameters`

```
app.use((req,res,next)=>{
    // do something
    next();
});

```

if we forget about `next()` request get's hang
and middleware work in sequence

## Buildin' Middleware

```
app.use(express.json()); => use for parsing json object in request => req.body

app.use(express.urlencoded({extended : true})); => use for parsing url encoded forms => old teachnique

app.use(express.static('public')); => use for reading static file in `public` folder

```

## 3rd party middleware

```
morgan => for logging request
helmet => protect by setting various http headers

```

## Envornment

we want to enable and disable depend upon the envirnment!

we can access in two ways:

> 1. by process
> 2. by app

```
we can do by this:

console.log(`NODE_ENV: ${ process.env.NODE_ENV}`);
console.log(`App: ${ app.get('env')} `)

```

### Example:

```
if (app.get('env') === 'development') {
    // for logging request
    app.use(morgan('dev'));
    console.log('Logging request enabled..')

}

```

## configuration

many packages can b used for managing the configuration
most popular are `rc` and `config`

installing `npm i config`

Make folder `config` and add files

> defualt.json => defualt setting goes here...

> development.json => development setting goes here...

> production.json => production setting goes here..

> custome-environment-variables.json => secrets like mail server password save here...

Example:

access it via `config.get('name')`

## Debug

we can install `debug` package

`npm i debug`

To work arround with debug module we have to set `DEBUG` environment variable
like `export DEBUG=app:startup,app:db`

-> add debug to your project

`startdebug = require('debug')('app:startup')`

-> In code

startdebug('this is debug message!')

## Templeting Engines

various templeting engine can be used:
-> pug
-> mustache
-> EJS

### How to use pug?

=> install

`npm i pug`

=> setting up in project?

`app.set('view engine', 'pug')`

=> overide the path to the templete ?

`app.use('views' , ./views)` //defualt

=> create the folder `views` and file `index.pug`

in Pug file:

```
html
    head
        title= title
    body
        h1= message

```

In app.js

```
app.get('/' , (req,res) => {
    res.render('index' , {title: 'my app', message : 'this is my message!'})

})

```

## Database Integration 😏

What are the various database integration are avaliable while using
nodejs and express? 🤔

```
    Cassandra
    Couchbase
    CouchDB
    LevelDB
    MySQL
    MongoDB
    Neo4j
    Oracle
    PostgreSQL
    Redis
    SQL Server
    SQLite
    Elasticsearch
```

A package build on the top of the mongodb -> object oriented approach
`mongoose` pacakage

# 6. Asynchronous Javascript:

In the Asynchronous Javascript its non-blocking while Synchronous Javascript
is blocking

There are 3 ways to deal with the Asynchronous code

```
-> callbacks
-> promises
-> Asyn/await

```

## callbacks:

example:

```
console.log("before");
const user = readUserFromDatabase(1, (user)=>{
  console.log(user)
  gettingGithubRepos(user.name , (repos)=>{
    console.log(repos);
  });
});



console.log("after");

function readUserFromDatabase(id, callback) {
  setTimeout(() => {
    console.log("Reading user from the database!")
  callback( {
      id: id,
      name: "Anees Ahmed"
    });
  }, 5000);

}

function gettingGithubRepos(username, callback) {

  setTimeout(() => {
    console.log(`Getting github repos...${username}`);
    callback(
      ["repo1","repo2","repo3","repo4","repo5"]
    );
  }, 3000);


}

```

### Named function

As callbacks is hell and nested structure we can solve the by named function
as it is not ideal to deal with the problem So we use `promises`
we replace the annonymous function withe the named function 🙃

```
console.log("before");
  //call back hell problem
readUserFromDatabase(1, getUser);


console.log("after");

// named function
function getCommits(commits) {
  console.log(commits);
}

function getRepos(repos) {
  console.log(repos);
  gettingAllTheCommits(repos[0], getCommits);
}


function getUser(user) {
  console.log(user)
  gettingGithubRepos(user.name ,getRepos);
}



//

function gettingAllTheCommits(repos, callback) {

  setTimeout(() => {
    console.log(`Getting all the commits for repos ${repos}`)
    callback({
      comit1 : "change the staging code",
      comit2:  "change the login functionality",
      comit3:  "notify feature is added!"
    }
);
  }, 4000);
}


function readUserFromDatabase(id, callback) {
  setTimeout(() => {
    console.log("Reading user from the database!")
  callback( {
      id: id,
      name: "Anees Ahmed"
    });
  }, 5000);

}

function gettingGithubRepos(username, callback) {

  setTimeout(() => {
    console.log(`Getting github repos...${username}`);
    callback(
      ["repo1","repo2","repo3","repo4","repo5"]
    );
  }, 3000);


}

```

## Promises:

object that holds the eventual result of a Asynchronous operation
so when Asynchronous operation complete it is either result in the
`value` or `error`.

This object can be one of the `3 State`

-> pending
-> resolve
-> reject

```
const p = new Promise((resolve,reject)=>{
 setTimeout(() => {
   console.log("Reading the user from the database");

   let user = {
     id: 1,
     name: "Anees Ahmed"
   }

   user = '';
   if(user !== ''){
     resolve(user);
   }else{
     reject(new Error("User not found!"))
   }

 }, 5000);
})
console.log("Before...")

p
 .then(result => {console.log(result.name);})
 .catch(err => console.log(err.message));

console.log("After...")

```

### Example of promises:

```
console.log("before");
readUserFromDatabase(10)
 .then(user => gettingGithubRepos(user.name))
 .then(repos => gettingRepoCommits(repos[0]))
 .then(commits => console.log(commits))
 .catch(err => console.log(err.message));
console.log("after");

function readUserFromDatabase(id) {

 return new Promise(
   (resolve,reject) => {

     setTimeout(() => {
       console.log("Reading user from the database!")
     resolve( {
         id: id,
         name: "Anees Ahmed"
       });
     }, 5000);

   }
 );
}
function gettingGithubRepos(username) {

   return new Promise(
     (resolve,reject) =>{
       setTimeout(() => {
         console.log(`Getting github repos...${username}`);
         resolve(
           ["repo1","repo2","repo3","repo4","repo5"]
         );
       }, 3000);

     }
   );


}
function gettingRepoCommits(repo) {

 return new Promise(
   (resolve , reject) => {
     setTimeout(() => {
       console.log("Reading commits...of repos ",repo)
       resolve (
             {
          c1:"adding login fadas",
          c2:"adding login fadas",
          c3:"adding login fadas",
          c4:"adding login fadas",
          c5:"adding login fadas"

     }
       );
     }, 4000);

   }
 );

}

```

## Running Asyn Operation in Parrallel (Parrallel Promise):

if we have multiple Asyn operation and we want to run in Parrallel

`Promise.all([p1,p2])` will give the result of array of resolves..

if any of the promise reject ...it doesn't give the output of other resolves.

In a situation if we have multiple Asyn operation and we want to do sometime as soon
one of asyn operation complete!!!

`Promise.race([p1,p2])` it value will be the 1st fulfilled promise!!

### Example

```
const p1 = new Promise((resolve, reject) =>{
 // some a asyn operation e.g fetch information from the twitter api
   setTimeout(() => {
     console.log("Asyn operation 1")
     resolve(1);
     // reject(new Error("sometime failed...."))
   }, 2000);
});
const p2 = new Promise((resolve) =>{
 // some a asyn operation e.g fetch information from the facebook api
   setTimeout(() => {
     console.log("Asyn operation 2")
     resolve(2);
   }, 2000);
});


// Promise.all([p1,p2])
//   .then(results => console.log(results))
//   .catch(err => console.log(err.message));

Promise.race([p1,p2])
 .then(result => console.log(result));

```

## Asyn and Wait

-> a syntactical sugar over the promise:

-> when using asyn and wait we use `try and catch`

### Example:

```
console.log("before....")
// promise approch
// gettingUser(10)
//   .then(result => gettingRepos(result.name))
//   .then(result => gettingRepoCommits(result[0]))
//   .then(result => console.log(result));


getComits();

console.log("after....")

// asyn and await approch
async function getComits() {
  try {
    const user = await gettingUser(11);
    const repos = await gettingRepos(user.name);
    const commits  = await gettingRepoCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error: ", err.message);
  }

}
function gettingUser(id) {
  // promise approch
  return new Promise(
    (resolve, reject) =>{
      // some asyn work
        setTimeout(() => {
          console.log("Connecting to github api...")
          resolve({
            id: id,
            name: "Anees Ahmed"
          });
        }, 4000);
    }
  );
}

// getting the repos of the user...right?

function gettingRepos(username) {
  // promise approch
  return new Promise(
    (resolve, reject) =>{
      // some asyn work
        setTimeout(() => {
          console.log(`getting the repos of the user: ${username}`)
          resolve([
            "repos1",
            "repos2",
            "repos3",
            "repos4",
            "repos5"
          ]);
        }, 3000);
    }
  );
}



// getting the repos of the commits...right?

function gettingRepoCommits(repo) {
  // promise approch
  return new Promise(
    (resolve, reject) =>{
      // some asyn work
        setTimeout(() => {
          console.log(`getting commits for repo: ${repo}`)
          reject(new Error("Can't fetch commits"))

          // resolve({
          //   c1: "change login feature",
          //   c2 : "add admin role",
          //   c3 : "remove add to chart feature"
          // });
        }, 5000);
    }
  );
}
```

# 7. CRUD with MongoDB

First install mongodb-community for your system, then start `mongod`

=> To start mongo-server
`sudo systemctl start mongod`

=> we now need client side software to interact with databases 😴
for this we have mongo-compass

=> the config file is `/etc/mongod.conf` which has the database-path `/var/lib/mongodb`

all set now 😊

create the new project and install `mongoose` package ..its kind of like driver
to work with the mongo database

---

## Useful method to query database object model:

```
.find()
.sort()
.count()
.select()
.or()
.and()
.limit()
.skip()
```

---

## Comparison Query Operator:

sometimes we want to have complex querry we need to compare values to get specific results

```
eq => equal
ne => not equal
gt => greater then
gte => greater then equal
lt => less then
lte => less then equal
in => value in specific values
nin => not in specific values
```

### Example:

```
 const courses = await Course
        //.find({isPublished: true, author: "Anees King"})
        .find({price: { $gte:10 ,$lte:20 } , author : { $in: ['anees', mosh]} })
        .limit(10)
        .sort({name: -1})
        .select({name:1,tags:1,author:1})

```

---

## Logical Query Operator

sometime we need to have either `condition 1` or `condition 2` should match give the result
and
sometime we need to have `condition 1` and `condition 2` should match give the result!

so we have **_`and()` `or()`_**

### Example:

`and()` is kinda same as passing filter in `find()`.

=>.and([{isPublished: true} , {auther:'anees'}])

=> .find({isPublished:true , auther:'anees'})

```
const courses = await Course
        // .find({isPublished: true, author: "Anees King"})
        .find()
        .or([{isPublished:true},{author:'anees'}])
        .limit(10)
        .sort({name: -1})
        .select({name:1,tags:1,author:1})
```

---

## Regular Expression in Query

^ => means start with

```
auther name start with 'anees'

const courses = await Course
      .find({ author: /^anees/})
```

\$ => means end with

```
auther name ends with 'anees'

const courses = await Course
      .find({ author: /anees$/})
```

i => means case insensitive

```
auther name ends with 'anees' or 'ANees' doesn't matter

const courses = await Course
      .find({ author: /anees$/i})
```

.\* => means zero or more character

```
auther name contains  'anees' word

const courses = await Course
      .find({ author: /.*anees.*/i})
```

---

## Pagination

const pageSize = 10

const pageNumber = 2

In Real world like we can get like
`/api/course?pageNumber=2&pageSize=10`

Example:

```
const courses = await Course
        .find({isPublished: true, author: "Anees King"})
        .skip((pageNumber-1) * pageSize)
        .or([{isPublished:true},{author:'anees'}])
        .limit(pageSize)
        .sort({name: -1})
        .select({name:1,tags:1,author:1})
```

---

## Crud in Mongoose:

### Create:

1. first create the schema
2. Second create the model
3. create the instance of model pass data in constructor

Example:

```
const mongoose= require('mongoose')

// connect to database

mongoose.connect('mongodb://localhost/nk', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('Connect to the database!'))
.catch(err => console.error(('Error: ', err.message )));


// once i connect i have to create the schemes


const courseSchema = mongoose.Schema({
  name:String,
  auther: String,
  price: Number,
  tags: [String],
  isPublished: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});


// create the model to interact with

const Course = mongoose.model('Course' , courseSchema);

// now we can use this 'Course Model' to creaet the new courses


async function createCourse() {
  const course = new Course({
    name: 'python',
    price: 10,
    auther: 'mosh',
    tags: ['basic', 'pythonist'],
    isPublished: true
  });

   const result = await course.save()
   console.log(result);
}


createCourse()
.then(()=>{console.log('Course created..!')})
.catch(err => {console.error('ERROR: ', err.message)});

```

### Read:

we can use `.find()` and other to retrieve from the database!

Example:

```
async function getCourses() {
      const courses = await Course
                        .find({isPublished: true})
                        .or([{price:{ $gte: 15 }} , {name: /.*by.*/i}])
                        // .or([{price:{ $gte:15 }},{ name: /.*by.*/i }]);
      console.log(courses);

}

getCourses()
  .catch(err => console.error('ERROR: ', err.message));


```

### Update:

There are two ways of updating

1. Query First
2. Update First

#### Query First

1. findById()
2. Modify its properties
3. save()

```
async  function updateCourse(id) {
  const course =  await Course.findById(id);
  if (!course) return;
  course.isPublished = false;
  course.auther = "Another Author";
  course.tags = ['a' ,'b' , 'c'];

  const  result = await course.save();
  console.log(result);

}

updateCourse('5f88cb721c968f42e3ecb3fc')
  .catch(err => console.error('ERROR: ', err.message));

```

#### Update First

1. update directly
2. optionally: get updated document

[update operator](https://docs.mongodb.com/manual/reference/operator/update/#update-operators)

it will result the information of bulkwrite

```js
async  function updateCourse(id) {
    const result =  await Course.update({_id:id},{
      $set: {
        auther: 'COOL MAAN',
        isPublished: true
      }
    });
    console.log(result);
}

updateCourse('5f88cb721c968f42e3ecb3fc')
  .catch(err => console.error('ERROR: ', err.message));

```

it will result to give the update result:

```js

async  function updateCourse(id) {
    const result =  await Course.findByIdAndUpdate(id,{
      $set: {
        auther: 'COOL MAAN 2',
        isPublished: true
      }
    },{new: true});
    console.log(result);
}

updateCourse('5f88cb721c968f42e3ecb3fc')
  .catch(err => console.error('ERROR: ', err.message));


```

### Delete:

1. deleteMany
2. deleteOne
3. findByIdAndDelete

Example:

```js
async function delCourse(id) {
  const result = await Course.deleteMany({_id: id})
  console.log(result);
}

delCourse('5f88cb721c968f42e3ecb3fc');



async function delCourse(id) {
  const course = await Course.findByIdAndDelete(id)
  console.log(course);
}
delCourse('5f88cb721c968f42e3ecb3fc');

```

---

# 8. Mongo - Data validation:

we don't have validation at database level like MySQL etc

we can validate data either with

1. mongoose validation
2. using 'joi' package

## Buildin validation

we have for 'STRINGS'

1. required
   can be set to Boolean

2. minlength
   min length of string

3. maxlength
   max length of string

4. match: /pattern/

5. enum: ['web' , 'mbl' , 'network']

```js
const courseSchema = new mongoose.Schema({

  title: {type: String ,
   required: true,
   minlength: 5,
   maxlength: 25,
   },
  catogory:{
    type: String,
    enum: ['web' , 'mbl' , 'network']
  }
  author: String,
  tags: [String],
  price: Number,
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
})
```

for number we have:

min and max

## Custom validator:

we set the validate property to an object

**Example**

before:

```json
tags:[String]
```

with Custom Validator:

```json
tags:{
type: Array,
validate: {
	validator: function(v){
		return v && v.length >0
		},
	message:"A course should have atleast one tag"	
	}
}
```



## Async Validator:

- when we have to validate data through remote server: 

**Example**

like to check the email already exist in database or not, then we have to use  ***Async validator***

All we need to add **isAsync: true** and **callback** function

```js
tags:{
type: Array,
validate: {
	isAsync: true,
	validator: function(v, callback){
		setTimeout(() => {
  		// Do Some Async work
  		const result = v && v.length >0;
        callback(result)
			}, 4000);
		},
	message:"A course should have atleast one tag"	
	}
}
```

## Validation Error:

we can get validation errors like

```js
try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    	for (field in err.errors) {
     	 	console.log(err.errors[field].message);
    	}
  }
```



## Schema Type Options:

we have useful property in Schema type objects:

```js
SomeSting: {
	type: String,
	trim: true,
	default: "Some defualt value"
	required: true,
	enum: ["web" , "mobile"],
	match: /regex expression/,
	minlength: 6,
	maxlength: 23,
	lowercase: true,
	uppercase: false,
	validate: {
      validator: function (v) {
      	// some validation logic
      },
      message: "message on validator fail"
    }
}

SomeNumber :{
    type: Number,
    min: 10,
    max:200,
    get: v => Math.round(v),
    set: v => Math.round(v)    
}

```



# 9. Mongoose Modelling Relationship between Connected Data:



## Approaches:

we have 2 approaches:

- Using References ( Normalization ) -> consistency
- Using Embedded Document ( De-normalization ) -> performance
- Hybrid  Approach




### Reference Approach

```

let author = {
	name:"something",
	city: "something",
	bio: "some-bio"
}

let course = {
	name:"Some-time",
	author : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author'
	}
}
```

### Embedded Approach

```
let course = {
	name:"Something",
    author: {
    	name: "some-name",
    	city: "some-city"
    	..
    	..
    }
}
```

## Transaction

   In mongo db we have 2 phase commit

   library that implement 2 phase commit "Fawn"

```
npm i fawn
```

**Usage:**

```js
const Fawn = require('fawn')

Fawn.init(mongoose);

// multiple transaction and changes treated as Atomic
try{
	new Fawn.Task().save('rentals' , rental)
				   .update('movies' , {_id: movie._id},{
				   	$inc:{numberInStock: -1}
				   })
	return res.send(rental);
}catch(e){
	res.status(500).send("Something failed");
}
```



## Validate object-Id

   we need to install the package:

```
npm i joi-objectid
```

######    **Usage**

```js
Joi.objectId = require(joi-objectid)(Joi)

const schema ={
	customerId: Joi.objectId().required();
}
```



# 10. Authorization and Authentication

## Password Complexity

##  Hash Password

##  JSON Web Token

For Json web token  we use `jsonwebtoken ` library:

```js
npm i jsonwebtoken
```

then add to your project:

```js
const jwt = require('jsonwebtoken')
```

for creating Json web token

````js
/* Adding method to User Model and HERE 'this' is User model
 basically jwt.sign() has 3 params
 jwt.sign( payload, Secret key, options)
 
 payload => {properties in payload part of JWT}
 Secret key => to sign Token digitally
 options => { expiresIn: '1800s' }   // 1800 seconds = 30 minutes
 */

userSchema.methods.generateAuthToken = function (payload) {
  const token = jwt.sign(_.pick(this, payload), config.get('jwtPrivateKey'));
  return token;
}
````

Setting Token in Response Header:

```js
res.header('x-auth', token)
```

For Verifying web Token:

Create an auth middleware

```js
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req , res , next) {
  
  const token = req.header('x-auth')

  if(!token) return res.status(401).send("Access denied...No token provided!")

  try {
    const decoded = jwt.verify(token , config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } 
  catch (ex) {
   return res.status(400).send("Bad Request..!")
  }
}
```


Using Middleware in Routes that require Authorization:

```js
const auth = require(''../middleware/auth')

router.post("/", auth , async (req, res) => {
	// protected by middleware
})
```

**We can save JWT token on the client side:**

When the client receives the token, they often want to store it for  gathering user information in future requests. The most popular manner  for storing auth tokens are [cookies](https://en.wikipedia.org/wiki/HTTP_cookie) and [localStorage](https://www.digitalocean.com/community/tutorials/js-introduction-localstorage-sessionstorage). Here’s an implementation for storing a cookie using client-side JavaScript code:

**In Cookies:**

````js
const token = await res.json();
document.cookie = `token=${token}`
````

**In Local storage:**

```js
const token = await res.json();
localStorage.setItem('token', token);
```



## Authorization:

Check if the user have Permission to do certain things:

let make admin middleware to see if the user is 'admin'  or not

```js
/*
In This middle if the user is authenticated and is admin then we can pass control
*/


module.exports = function(req , res , next) {
  if (!req.user.isAdmin) {
    return res.status(403).send("403 Forbidden ..Access Denied..!")
  }
  console.log("Passed admin middleware")
  next();  
}
```

​	



## Configuration

In Configuration Section ,  we use the config module to save our configuration separately instead of hard coding

`install config package`

```
npm i config
```

make config folder in project and create the `default.json` file then create the `custom-environment-variables.json` file

#### **In default.json**

```
{
  "jwtPrivateKey": ""
}
```

#### **In  custom-environment-variables.json**

```
{
  "jwtPrivateKey": "vidly_jwtPrivateKey"
}
```

SET value of `vidly_jwtPrivateKey`  environment variable: 

use in project : `config.get('jwtPrivateKey')`



# 11. Handling and Error Logging:



 In project you have configured the ***error middleware*** , so

### Handling Error:

**ERROR MIDDLEWARE:**

```js
/* AFTER ALL ROUTES USE ERROR MIDDLEWARE */
re
const error = require('./middleware/error');

/*

my all routes here

*/

app.use(error);
```

**error.js** 

```js

module.exports = function (err, req, res, next ) {
  // logging error
  res.status(500).send('Something failed!');
}
```

Use the `express-async-errors` for handling the uncaught promises:

`npm i express-async-errors`  and  import on the Top of your Project:

```js
require('express-async-errors')
```

### Logging Error:

we  can use the `winston` library for the error handling and logging:

Installing Winston: 

```
npm i winston@2.4.0
```

Add in your project:

```js
winston = require('winston')

winston.add(winston.transports.File, {filename: 'LogFile.json'})

```

In the error.js middleware:

```js
const winston = require('winston')

module.exports = function (err, req, res, next ) {
  // logging error
  winston.log('error' , err.message);  
  res.status(500).send('Something failed!');
}
```

> The Error message is Logged into the LogFile.json

### Logging Error in the Mongodb

Install the package 

`npm i winston-mongodb`

```js
const winston = require('winston');
require('winston-mongodb');


winston.add(winston.transports.File , {filename: 'logfile.json'});
winston.add(winston.transports.MongoDB, {db:'mongodb://localhost/vidly'});

```

### Handling The Uncaught Exception

winston is specific to the request processing pipe line and handle the error if something happen during processing the request,

To handle the  Uncaught Exception the application we can doo

````js

process.on('uncaughtException' , (ex) => {
  console.log("Uncaught Exception Occurred => ", ex.message);
  winston.log('error' , ex.message , ex);
})
````

### Handle Uncaught Promise Rejection

```js

process.on('unhandledRejection' , (ex) => {
  console.log("Uncaught Promise Rejection Occurred => ", ex.message);
  winston.log('error' , ex.message , ex);
})
```

 Using Winston To log Un-Handle Exception and Promise Rejection:

```js
winston.handleExceptions(
  new winston.transports.File({filename:'uncaughtExceptions.log'})
)

process.on('unhandledRejection' , (ex) =>{
  throw ex;
})
```

# 12. Deployment On the Heroku

Create an account on the heroku and install `heroku-cli` , 

In project folder , Type `git init` and add the `.gitignore` file

and add things you don't want to push on the repo

then type `git add .` 

then git commit -m "this is my message"

then git push heroku 





## To See Logs:

 type command in your project folder path `heroku logs`

or you can see via heroku dashboard 

1. view Logs options
2. run console 

you can also attached to the heroku dynos via ssh

Dynos share Environment variables



## Set up environment variable:

`````
heroku config:set vidly_jwtPrivateKey=YouCan@likeTrash
`````

see all environment variables:

```
heroku config
```



mongodb atlas for database ✔

heroku for deployment ✔ 









  

 











 