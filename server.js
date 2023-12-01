// this will be the main file that controls the web application server
const express = require('express')
const apiRoutes = require('./routes/api')

const app = express()

app.use(express.json())

app.use('/api', apiRoutes)

// anoter route handler to handle the request
app.use(function(req, res, next) {
    res.status(404).send('Sorry, not found.')
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