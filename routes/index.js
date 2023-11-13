const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.json({
        message: "You're on Web Service & RESTful API for ToDoList Application - Made by galangarsandy"
    })
})

module.exports = route