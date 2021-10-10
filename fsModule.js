const fs = require('fs')


fs.readFile('./README.md' , 'utf8' , (err , data) => {
   if (err) throw err;
   fs.writeFile('sample.txt' , data , (err) => {
      if(err) throw err;
       console.log("file is written")
   })

    

})