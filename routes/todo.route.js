const express = require('express')
const route = express.Route()

const { getUserTodo, getTodoDetail, addTodo } = require('../controllers/todo.controler')

// route.get('/:userId', getUserTodo)
// route.get('/:userId/:id', getTodoDetail)
// route.post('/:userId', addTodo)

module.exports = route