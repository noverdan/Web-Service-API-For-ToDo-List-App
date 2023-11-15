const express = require('express')
const route = express.Router()

const { getUserTodo, getTodoDetail, addTodo, deleteTodo, deleteAllTodo, updateTodo } = require('../controllers/todo.controler')
const verifyToken = require('../middleware/auth.middleware')

route.get('/:userId/todos', verifyToken, getUserTodo)
route.get('/:userId/todos/:todoId', verifyToken, getTodoDetail)
route.post('/:userId/todos', verifyToken, addTodo)
route.delete('/:userId/todos/:todoId', verifyToken, deleteTodo)
route.delete('/:userId/todos', verifyToken, deleteAllTodo)
route.post('/:userId/todos/:todoId', verifyToken, updateTodo)

module.exports = route