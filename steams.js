const fs = require('fs')



const myReadStream = fs.createReadStream(__dirname + '/README.md' , 'utf8')
const myWriteStream = fs.createWriteStream(__dirname + '/sample2.txt')


myReadStream.on('data' , (chunk) => {
    console.log("Received new Chunk");
    myWriteStream.write(chunk)
})