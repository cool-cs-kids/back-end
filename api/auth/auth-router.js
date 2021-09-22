const express = require('express');
const router = express.Router();
const User = require('../users/users-model');
const JWT_SECRET = require('../auth/secrets')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//POST to /api/auth/register
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash;
    User.add(user)
        .then(userSaved => {
            res.status(201).json(userSaved);
        })
        .catch(err => {
            console.log('ERR', err)
            res.status(500).json({message: 'Registration failed'})
        })
})

//POST to /api/auth/login
router.post('/login', (req, res) => {
    let {username, password} = req.body;

    User.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            req.session.user = user
            res.status(200).json({message: `Welcome ${user.username}!`,
            token,
        });
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(error => {

    })
})

//GET to /api/auth/logout
router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.json({message: 'cant log out'})
            } else {
                res.status(200).json({message: 'logged out'})
            }
        })
    } else {
        res.status(200).json({message: 'you were never logged in'})
    }
})

function generateToken(user) {
    const payload = {
        subject: user.users_id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }   

    return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router