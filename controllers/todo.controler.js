const { user, todo } = require('../models')

module.exports = {
    getUserTodo: async (req, res) => {
        const userId = req.params.userId
        const userTodos = await todo.findAll({ where: { user_id: userId } });
        const getUser = await user.findOne({ where: { id: userId } });
        if (getUser && userTodos) {
            res.json({
                user: getUser.nama,
                todos: userTodos
            })
        } else {
            res.status(404).json({
                message: `User ${userId} does not exist`
            })
        }
    },
    getTodoDetail: async (req, res) => {
        const userId = req.params.userId
        const todoId = req.params.todoId
        const userTodo = await todo.findOne({ where: { id: todoId, user_id: userId } });
        const getUser = await user.findOne({ where: { id: userId } });
        if (userTodo && getUser) {
            res.json({
                user: getUser.nama,
                todos: userTodo
            })
        } else {
            if (!getUser) {
                res.status(404).json({
                    message: `User ${userId} does not exist`
                })
            } else if (!userTodo) {
                res.status(404).json({
                    message: `Todo ${todoId} does not exist in the user`
                })
            } else {
                res.status(404);
            }

        }
    },
    addTodo: async (req, res) => {
        let userId = req.params.userId
        let reqTask = req.body
        try {
            await todo.create({
                user_id: userId,
                task: reqTask.task
            })
            res.status(201).json({
                message: "Berhasil menambahkan todo baru"
            })
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    },
    deleteTodo: async (req, res) => {
        const userId = req.params.userId
        const todoId = req.params.todoId
        try {
            await todo.destroy({
                where: { id: todoId, user_id: userId }
            });
            res.status(204).json({
                message: "todo deleted successfully"
            })
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    },
    deleteAllTodo: async (req, res) => {
        const userId = req.params.userId
        try {
            await todo.destroy({
                where: { user_id: userId }
            });
            res.status(204).json({
                message: `All user ${userId} todos have been successfully deleted`
            })
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    },
    updateTodo: async (req, res) => {
        const userId = req.params.userId
        const todoId = req.params.todoId
        let updatedTask = req.body.task
        try {
            await todo.update(
                {
                    task: updatedTask, updatedAt: new Date()
                },
                { where: { id: todoId, user_id: userId } }
            )
            res.status(201).json({
                message: "todo updated successfully"
            })
        } catch (error) {
            res.jsno({
                message: error.message
            })
        }

    }
}