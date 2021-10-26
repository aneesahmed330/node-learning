//testing number
module.exports.absolute = (number) => {
  return(number >= 0) ? number : -number;
}

module.exports.greeting = (name) => {
    return(`Welcome ${name}`);
}