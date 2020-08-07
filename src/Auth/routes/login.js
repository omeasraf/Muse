const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../../../config.json')

async function login(req, res, collection) {

    try {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            collection.findOne({
                username
            }).then(async user => {

                if (user) {

                    if (await bcrypt.compare(password, user.password)) {

                        // TODO: Encrypt password before converting it into a jwt
                        const userData = {
                            username,
                            password
                        }
                        const refreshToken = jwt.sign(userData, config.REFRESH_TOKEN_SECRET)

                        collection.updateOne({
                            username
                        }, {
                            $set: {
                                username: user.username,
                                password: user.password,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                refreshToken
                            }
                        }, {
                            upsert: true
                        })
                        // Don't think I need a then statement here
                        // .then(item => {
                        //     // res.status(200).send({
                        //     //     username,
                        //     //     firstname: user.firstname,
                        //     //     lastname: user.lastname,
                        //     //     "refreshToken": item.refreshToken
                        //     // })

                        // })

                        return res.status(200).send({
                            username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            refreshToken
                        })
                    } else {
                        return res.status(401).send({
                            error: 401,
                            message: "Invalid Password"
                        })
                    }
                } else {
                    return res.status(401).send({
                        error: 401,
                        message: "User not found"
                    })
                }

            })
        } else {
            return res.status(401).send({
                error: 401,
                message: "Please enter valid information"
            })
        }
    } catch {
        res.sendStatus(500)
    }



}

module.exports = login