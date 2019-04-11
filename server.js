const express = require('express')
const path = require('path')
let serveStatic = require('serve-static')

let app = express()
app.use(serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 5000
app.listen(port)

app.get('/.well-known/acme-challenge/:content', function (req, res) {
  res.send('xxxxxxxxxxxx-yyyy.zzzzzzzzzzzzzzzzzzz')
})

console.log('Server started at ', port)
