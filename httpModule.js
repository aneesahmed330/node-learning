const http = require('http');
const server = http.createServer((req , res) => {

    if (req.url === '/'){
        res.write("Hello Anees")
        res.end();
    }

    if (req.url === '/api/courses'){
        res.write(JSON.stringify([1 ,2,3,4,5]))
        res.end();
    }

})
const PORT = 1337
server.listen( PORT , () => {
    console.log(`Server is listen on ${PORT}`)
} )