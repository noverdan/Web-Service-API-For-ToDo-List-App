const { user, todo } = require('../models')

module.exports = {
    getUserTodo: async (req, res) => {
        const userId = req.params.userId
        const authorizedUser = req.payload.email
        const userTodos = await todo.findAll({ where: { user_id: userId }, attributes: { exclude: ["user_id", "createdAt", "updatedAt"] } });
        const getUser = await user.findOne({ where: { id: userId } });

        if (getUser && userTodos) {
            if (authorizedUser == getUser.email) {
                res.json({
                    user: getUser.nama,
                    todos: userTodos
                })
            } else {
                res.status(403).json({
                    status: "forbidden",
                    message: "unauthorized user for access these todos"
                })
            }
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
        const authorizedUser = req.payload.email

        if (userTodo && getUser) {
            if (authorizedUser == getUser.email) {
                res.json({
                    user: getUser.nama,
                    todos: userTodo
                })
            } else {
                res.status(403).json({
                    status: "forbidden",
                    message: "unauthorized user for access this todo"
                })
            }
        } else {
            if (!getUser) {
                res.status(404).json({
                    message: `User ${userId} does not exist`
                })
            } else if (!userTodo) {
                res.status(404).json({
                    message: `Todo ${todoId} does not exist in this user`
                })
            } else {
                res.status(404);
            }
        }
    },
    addTodo: async (req, res) => {
        let userId = req.params.userId
        let reqTask = req.body
        if (!reqTask.task) {
            res.status(400).json({
                message: "Bad Request"
            })
            return
        }
        const getUser = await user.findOne({ where: { id: userId } });
        const authorizedUser = req.payload.email

        if (getUser) {
            if (authorizedUser == getUser.email) {
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
                    return
                }
            } else {
                res.status(403).json({
                    status: "forbidden",
                    message: "unauthorized user for add todo"
                })
            }
        } else {
            res.status(404).json({
                message: `User ${userId} does not exist`
            })
        }
    },
    deleteTodo: async (req, res) => {
        const userId = req.params.userId
        const todoId = req.params.todoId
        const getUser = await user.findOne({ where: { id: userId } });
        const authorizedUser = req.payload.email
        const userTodo = await todo.findOne({ where: { id: todoId, user_id: userId } });

        if (getUser && userTodo) {
            if (authorizedUser == getUser.email) {
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
                    return
                }
            } else {
                res.status(403).json({
                    status: "forbidden",
                    message: "unauthorized user for delete this todo"
                })
            }
        } else {
            if (!getUser) {
                res.status(404).json({
                    message: `User ${userId} does not exist`
                })
            } else if (!userTodo) {
                res.status(404).json({
                    message: `Todo ${todoId} does not exist in this user`
                })
            } else {
                res.status(404);
            }
        }
    },
    deleteAllTodo: async (req, res) => {
        const userId = req.params.userId
        const getUser = await user.findOne({ where: { id: userId } });
        const authorizedUser = req.payload.email

        if (getUser) {
            if (authorizedUser == getUser.email) {
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
                    return
                }
            } else {
                res.status(403).json({
                    status: "forbidden",
                    message: "unauthorized user for delete these todos"
                })
            }
        } else {
            res.status(404).json({
                message: `User ${userId} does not exist`
            })
        }
    },
    updateTodo: async (req, res) => {
        const userId = req.params.userId
        const todoId = req.params.todoId
        const getUser = await user.findOne({ where: { id: userId } });
        const userTodo = await todo.findOne({ where: { id: todoId, user_id: userId } });
        const theTodo = await todo.findOne({ where: { id: todoId } });
        const authorizedUser = req.payload.email
        let updatedTask = req.body.task

        if (getUser && theTodo) {
            if (authorizedUser == getUser.email) {
                try {
                    if (userTodo) {
                        await todo.update(
                            {
                                task: updatedTask, updatedAt: new Date()
                            },
                            { where: { id: todoId, user_id: userId } }
                        )
                        res.status(201).json({
                            message: "todo updated successfully"
                        })
                    } else {
                        res.status(404).json({
                            message: `Todo ${todoId} does not exist in this user`
                        })
                    }
                } catch (error) {
                    res.jsno({
                        message: error.message
                    })
                    return
                }
            } else {
                res.status(403).json({
                    status: "forbidden",
                    message: "unauthorized user for update this todo"
                })
            }
        } else {
            if (!getUser) {
                res.status(404).json({
                    message: `User ${userId} does not exist`
                })
            } else if (!theTodo) {
                res.status(404).json({
                    message: `Todo ${todoId} does not exist`
                })
            } else {
                res.status(404);
            }
        }

    }
}