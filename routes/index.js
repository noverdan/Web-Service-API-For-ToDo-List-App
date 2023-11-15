const express = require('express')
const route = express.Router()

const userRoute = require('./user.route')

route.get('/', (req, res) => {
    res.json({
        message: "You're on Web Service & RESTful API for ToDoList Application - Made by galangarsandy"
    })
})

route.use('/users', userRoute)

module.exports = route