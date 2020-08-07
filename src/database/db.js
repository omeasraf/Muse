const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const config = require('../../config.json');
let mongodb;

function connect(callback) {
    mongoose.connect(config.mongodb.mongoURi, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })

    MongoClient.connect(config.mongodb.mongoURi, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error, client) => {
        if (error) {
            console.error(error);
        }

        mongodb = client.db(config.mongodb.dbName);

        callback();
    });
}

function get() {
    return mongodb;
}

function close() {
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};