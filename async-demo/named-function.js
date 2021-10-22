getUser = (id , callback) => {
    setTimeout(() => {
        console.log('Reading user from the database')
        user = callback({id: id , name: "Anees ahmed"});
    }, 2000);
}
getRepos =  (username , callback) => {
    setTimeout(() => {
        console.log(`Reading ${username} Repos..`)
        callback(['repos1' , 'repos2' , 'repos3' , 'repos4' , 'repos5'])
    }, 2000);   
}

getRepos = (user) => {
    getRepos(user.name , (Repos) => {
        console.log( `Repos:` , Repos)
    })
}


console.log('before')
getUser(1 , getRepos);
console.log('after')


// call backs

// promises

//async and await