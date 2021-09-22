const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const plantsRouter = require('./plants/plants-router')

const sessionConfig = {
    name: 'plonts',

    secret: process.env.session_secret || 'the mitochondria is the powerhouse of the cell',
    cookie: {
        maxAge: 1000 * 60,
        secure: false, // true in production
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
}

const server = express();

server.use(helmet());
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))


server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)
server.use('/api/plants', plantsRouter)

server.get('/', (req, res) => {
    res.status(200).json({api: 'up up and away! ballons!'})
});

module.exports = server;