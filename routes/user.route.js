const express = require('express')
const route = express.Router()
const todoRoute = require('./todo.route')

const { getAllUser, getUserById, addUser } = require('../controllers/user.controller')

route.get('/', getAllUser)
route.get('/:id', getUserById)
route.post('/', addUser)
route.use('/', todoRoute)

module.exports = route