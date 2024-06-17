const fs = require("fs")
const os = require('os')

console.log(os.cpus().length)

// Sync call
fs.writeFileSync('./textSynch.txt', 'Hello World from sync')

// Async call
fs.writeFile('./textASynch.txt', 'Hello World from Async', (err) => {})

const result = fs.readFileSync('./contacts.txt', 'utf-8')
console.log(result)

fs.readFile('./contacts.txt', 'utf-8', (err, result) => {
    if(err) {
        console.log('Error: ', err)
    } else {
        console.log(result)
    }
})

fs.appendFileSync('./textSynch.txt', '\nHey there')

fs.cpSync('./textSynch.txt', './copy.txt')

