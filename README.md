# node-learning
The repository contain node learning material and Guideline

# Introduction
Node app are highly scalable and real time app because of NON-BLOCKING and Asyncronous Nature of 
node

The Frameworks like ASP.net and ruby on Rails are Syncronous By Default 
like whenever new request we need to allocate new thread , Its possibly some time we can run out of threads, we can make ASP.net 'Async' but we have to do extra work, So node is Async and Non-Blocking by Default

# Node-Archieture:
 Node is Runtime Environment For executing JS code

# Asyncronous Work Flow:
same single thread is used to serve multiple requests
sometime req like fetch data from database needs some time to excute, in mean while same thread is serving the other request.

when the data is ready , it put a message in what we call 'EVENT QUEUE'.

Node is continously monitoring this QUEUE in Background, when it will find event in this Queue
take it out , processes it

Node is IDEAL for I/O Intensive Apps, File system, Network apps

# Contrast:
Node is node good for CPU Intensive Applications
video encoding and Image manipulation Service

# POINTS:
-> In node we don't have 'document' or 'window' Objects
-> function and variable defined in the file are not added to the global object because of Node Modular system

# Node Module System:

## Global Objects:
`console.log() => to console text` 
`setTimeout() => to call specific func. after specific time`
`clearTimeout() => clear the time`
`setInterval() => Repeat fuc. after specific time`
`clearInterval() => stop that func. for being called repeatly`

i.e global.console.log()



