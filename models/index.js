const { Sequelize, DataTypes } = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student.js')

// look for an enviroment variable will be called NODE_ENV and read it's value
// enviroment varaiable are set for your whole computer (or for a server)
// any application running on this computer (or server) can rad these enviroment varaible
//At azure, we'll create an envivoment varaiable for my server called NODE_ENV and set it to "production"
// if there is not NODE_ENV set, like on your computer, we'll use the value 'development'
const env = process.env.NODE_ENV || 'development'

const config = configJson[env] // read the DB configuration object for 'development' or 'production'

const sequelize = new Sequelize(config)

const database = {
    sequelize: sequelize, // how to connect to a database
    Sequelize: Sequelize // sequelize library
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name // 'Student'
database[studentModelName] = studentModel

module.exports = database