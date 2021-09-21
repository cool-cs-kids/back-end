const Users = require('../auth/auth-model')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./secrets')



const restricted = (req,res,next) => {
    const token = req.headers.authorization;
    if(!token) {
        res.status(401).json({
            message:"Token required"
        })
    } else {
        jwt.verify(token, JWT_SECRET,(err, decoded) => {
            if(err) {
                res.status(401).json({
                    message:"Token Invalid"
                })
            } else {
                req.decodedToken = decoded
                next();
            }
        })
    }
}

const checkUsernameExists = async (req,res,next) => {
    try {
        const rows = await Users.findBy({username: req.body.username})
        if(!rows.length){
            res.status(401).json({message:"invalid Credentials"})
        } else {
            req.usersData=rows[0]
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function checkIdUsers(req,res,next) {
    try{
        const users = await Users.findById(req.params.id)
        if(users){
            req.users = users
            next()
        } else{
            res.status(404).json("User not found")
        }
    }catch(err) {
        next(err)
    }
}

module.exports = {restricted, checkUsernameExists, checkIdUsers}