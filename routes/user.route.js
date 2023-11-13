const express = require('express')
const route = express.Router()

const { getAllUser, getUserById, addUser } = require('../controllers/user.controller')

route.get('/', getAllUser)
route.get('/:id', getUserById)
route.post('/', addUser)

module.exports = route