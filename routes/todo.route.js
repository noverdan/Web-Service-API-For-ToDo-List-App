const express = require('express')
const route = express.Router()

const { getUserTodo, getTodoDetail, addTodo, deleteTodo, deleteAllTodo, updateTodo } = require('../controllers/todo.controler')

route.get('/:userId/todos', getUserTodo)
route.get('/:userId/todos/:todoId', getTodoDetail)
route.post('/:userId/todos', addTodo)
route.delete('/:userId/todos/:todoId', deleteTodo)
route.delete('/:userId/todos', deleteAllTodo)
route.post('/:userId/todos/:todoId', updateTodo)

module.exports = route