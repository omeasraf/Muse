const express = require('express');
const config = require('../config.json')
const logger = require('./logging/logger')
const cors = require('cors')
const app = express()
const db = require('./database/db')
const log = new logger()

let collection;



app.use(express.json())
app.disable('x-powered-by');


const register = require('./Auth/routes/register')
app.use('/register', register)

var login = require('./Auth/routes/login')

app.post('/login', async (req, res) => {
    login(req, res, collection)
})

app.get('/', async (req, res) => {
    res.send({
        "code": 500,
        "message": "Invalid request type"
    })
})


db.connect(() => {
    collection = db.get().collection(config.mongodb.collections);
    app.listen(3000, () => {
        log.success(`started the server on port: 3000`);
    });
});