const bcrypt = require('bcrypt')
const { user, todo } = require('../models')

module.exports = {
    getAllUser: async (req, res) => {
        const users = await user.findAll()
        res.json({
            message: "berhasil mendapatkan data user",
            data: users
        })
    },
    getUserById: async (req, res) => {
        const { id } = req.params
        const getUser = await user.findOne({ where: { id: id } });

        if (getUser) {
            res.json({
                message: `Berhasil mendapatkan data user ${id}`,
                data: getUser
            })
        } else {
            res.json({
                message: `User ${id} not found`
            })
        }

    },
    addUser: async (req, res) => {
        let data = req.body
        try {

            // hash password
            const hashPassword = bcrypt.hashSync(data.password, 10)
            data.password = hashPassword

            // input data
            await user.create(data)

            // send response
            res.status(201).json({
                message: "berhasil menambahkan user"
            })
        } catch (err) {
            res.json({
                message: "gagal menambahkan data",
                error: err
            })
        }

    }
}