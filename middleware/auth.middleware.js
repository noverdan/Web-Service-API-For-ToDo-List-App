const jwt = require('jsonwebtoken')
require('dotenv').config();

const SECRET = process.env.SECRET_KEY

function verifyToken(req, res, next) {
    const auth = req.headers.authorization

    if (!auth) {
        res.status(403).json({
            message: "unauthorized-user"
        })
        return
    } else {
        const token = auth.split(" ")[1]
        if (!token) {
            res.json({
                message: "undifined-token"
            })
            return
        } else {
            try {
                var decoded = jwt.verify(token, SECRET);
                req.payload = decoded
            } catch (err) {
                res.json({
                    status: "invalid",
                    message: err.message
                })
                return
            }
        }
    }

    next()
}
module.exports = verifyToken