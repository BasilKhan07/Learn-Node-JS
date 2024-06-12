const http = require('http')

const express = require('express')

const app = express()

app.get('/', (req, res) => {
    return res.send('Hello from Home Page')
})

app.get('/about', (req, res) => {
    return res.send('Hello from About Page' + ', Hey ' + req.query.myname)
})

// function myHandler(req, res) {
//     if (req.url === "/favicon.ico") return res.end()
//     const log = `${Date.now()}: ${req.url} New Request Recieved\n`
//     const myUrl = url.parse(req.url, true)
//     console.log(myUrl)
//     fs.appendFile('log.txt', log, (err, data) => {
//         switch (myUrl.pathname) {
//             case '/': 
//                 res.end('HomePage')
//                 break;
//             case '/about': 
//                 const username = myUrl.query.myname
//                 res.end(`Hi, ${username}`)
//                 break;
//             case '/search': 
//                 const search = myUrl.query.search_query
//                 res.end("Here are your results for " + search)
//                 break;
//             default: 
//                 res.end('404 Not Found')
//         }
        
//     })
// }

app.listen(8000, () => console.log('Server Started'))

// const myServer = http.createServer(app) 

// myServer.listen(8000, () => console.log('Server Started'))