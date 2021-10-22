getuser = () => {
    setTimeout(() => {
        console.log("get usr from db")
    }, 5000);
}

console.log("before")
async function getUser() {
    await getuser()
}

getUser()
console.log('after')