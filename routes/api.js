const express = require('express')
const database = require('../models/index') // will require the index.js file from this directory
const Student = database.Student // the student model

const router = express.Router()

router.get('/students', function(req, res, next) { // /students is the second part of the URL
    // query database, get all rows from DB,
    // convert to JSON form
    // available in the then function
    Student.findAll( { order: ['name'] } ).then(students => {
        return res.json(students)
    })
})

// create a API route to the database
router.post('/students', function(req, res, next){
    const newStudent = req.body // works with HTTPie
    console.log(newStudent)
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!') //200 everything is okay, 201 something was created successfully, 404 not good, somethnig isn't correct, 500 server error
    }).catch( err => {
        // 400 = bad request
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        } else {
            next(err)
        }
    })
})

router.patch('/students/:id', function(req, res, next) {
    // matches requests to /student/1
    // students/2
    // students/100
    // req.params stores the id value
    // stores any placeholders in the URL
    const studentID = req.params.id
    const updatedStudent = req.body //updated data about this student
    console.log(updatedStudent)
    Student.update( updatedStudent, { where: { id: studentID} }).then( ( result ) => {
    
        const rowsModified = result[0] 
        // if 1 row was changed, we found student and they were updated
        if (rowsModified === 1) {
            res.send('OK')
        }
        // student id that doesn't exist
        else {
            // if 0 rows were updated, student was not found
            res.status(404).send('Student not found')
        }

        res.send('ok') // status is 200 by default
    }).catch( err => { // database error - can't connect, or database reports error

        // invalid data in the updatedStudnet - eg. no name
        // 400 = bad request
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        } else {
            next(err) // can't connect to db
        }
    })
}) // this will respond to requests 

router.delete('/students/:id', function(req, res, next) {
    // delete request  to /api/students/4 will delete student id with 4
    const studentID = req.params.id
    Student.destroy( { where: { id: studentID } } ). then( (rowsDeleted) => {
        if (rowsDeleted === 1) {
            return res.send('Student deleted')
        } else { // 0 rows deleted - the studnet with this id is not in the DB
            return res.status(404).send('Student not found')
        }
        return res.send('Student deleted')
    }).catch( err => {
        return nexxt(err)
    })
})


module.exports = router // this will export it