module.exports = (sequelize, DataTypes) => {
    // this will defind the model
    const Student = sequelize.define('Student', {
    // this will define the columns in the database - give them a name, and a type
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }
            // todo future = check for aa1234aa
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    })    
    // create or update table in database
    Student.sync( { force: false } ).then( () => { // this will create the table and database
        console.log('Synced student table') // it can take time to talk to a database
    }) 

    return Student

}