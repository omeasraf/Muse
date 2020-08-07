const express = require('express');
const config = require('../config.json')

const app = express()
const db = require('./database/db')


let collection;

app.use(express.json())
app.disable('x-powered-by');


const register = require('./Auth/routes/register')
app.use('/register', register)

var login = require('./Auth/routes/login')

app.post('/login', async (req, res) => {
    login(req, res, collection)
})



db.connect(() => {
    collection = db.get().collection(config.mongodb.collections);
    app.listen(3000, () => {
        console.log(`started the server on port: 3000`);
    });
});