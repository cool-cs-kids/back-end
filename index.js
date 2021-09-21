require('dotenv').config();
const server = require('./api/server')

const PORT = process.env.PORT || 1234;

server.listen(PORT, ()=> {
    console.log(`API Running on port ${PORT}`)
});