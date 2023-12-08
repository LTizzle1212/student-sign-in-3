// this will be the main file that controls the web application server
const express = require('express')
const apiRoutes = require('./routes/api')
const path = require('path')
const { stat } = require('fs')

// Create web application server
const app = express()

const staticFilePath = path.join(__dirname, 'client', 'dist')
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles) // request to home page, serve static file - the Vue app index.html

app.use(express.json())

app.use('/api', apiRoutes)

// anoter route handler to handle the request
app.use(function(req, res, next) {
    res.status(404).send('Sorry, pageaz web not found.')
// todo
})

app.use(function(err, req, res, next) { // for database errors
    console.log(err)
    res.status(500).send('Server error')
})

// Start server running
const server = app.listen(process.env.PORT || 3000, function () {
    console.log('Express server running on port ', server.address().port)
})