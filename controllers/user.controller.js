const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { user, todo } = require('../models')

module.exports = {
    getAllUser: async (req, res) => {
        const users = await user.findAll()
        const para = req.params.email
        const getUser = await user.findOne({ where: { email: para } });
        res.json({
            message: "berhasil mendapatkan data user",
            data: getUser
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
            res.status(404).json({
                message: `User ${id} does not exist`
            })
        }

    },
    addUser: async (req, res) => {
        let data = req.body
        if (!data.nama || !data.email || !data.password) {
            res.status(400).json({
                message: "bad request"
            })
            return
        }
        try {
            const isEmailUsed = await user.findOne({ where: { email: data.email } });
            if (isEmailUsed) {
                res.json({
                    message: "Email user already exsist"
                })
            } else {
                const hashPassword = bcrypt.hashSync(data.password, 10)
                data.password = hashPassword

                await user.create(data)

                const getUser = await user.findOne({ where: { email: data.email } });

                res.status(201).json({
                    message: "Berhasil membuat user baru",
                    data: {
                        userId: getUser.id,
                        nama: getUser.nama,
                        email: getUser.email
                    }
                })
            }
        } catch (err) {
            res.json({
                message: "gagal menambahkan data",
                error: err.message
            })
        }

    },
    userLogin: async (req, res) => {
        let data = req.body
        if (!data.email || !data.password) {
            res.status(400).json({
                message: "bad request"
            })
            return
        }

        let getUser = await user.findOne({ where: { email: data.email } })

        try {
            if (!getUser) {
                res.json({
                    message: "user-not-found"
                })
            } else {
                let isPwdCorrect = bcrypt.compareSync(data.password, getUser.password)
                if (!isPwdCorrect) {
                    res.json({
                        message: "wrong-password"
                    })
                } else if (isPwdCorrect) {
                    const token = jwt.sign({ email: data.email }, "Gja7qha76TmBVi39Jhg51jB", { expiresIn: '1d' })
                    res.json({
                        message: "login-successful",
                        token
                    })
                } else {
                    res.json({
                        message: "There is something wrong"
                    })
                }
            }
        } catch (err) {
            res.json({
                message: "Login Failed",
                error: err.message
            })
        }


    }
}