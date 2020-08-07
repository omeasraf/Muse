const express = require('express')
const router = express.Router()
var User = require('../models/users')
const bcrypt = require('bcrypt')
const checkEmail = require('../../Validation/email')
const logger = require('../../logs/logger')
const log = new logger();
router.post('/', async (req, res) => {

    const username = req.body.username;

    if (username && username.length < 4) {
        return res.status(500).send("Username is too short")
    }
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthday = new Date(req.body.birthday);
    const email = req.body.email;
    if (password && username && firstname && lastname && birthday && email) {

        if (checkEmail(email)) {
            if (birthday != "Invalid Date") {
                const hashedPassword = await bcrypt.hash(password, 10)
                var register = new User();
                // There probably is a better way of doing this. I will try to clean this up later
                register.username = username.toLowerCase();
                register.email = email.toLowerCase();
                register.password = hashedPassword;
                register.firstname = firstname;
                register.lastname = lastname;
                register.birthday = birthday;
                register.save((err, saved) => {
                    if (err) {

                        if (err.code == 11000) {
                            return generateError(res, 403, "Email/UserName already exists");
                        }

                        return res.status(500).send(err)
                    }
                    return generateError(res, 200, "Success");
                })
            } else {
                return generateError(res, 400, "Invalid Birthday");
            }
        } else {
            return generateError(res, 403, "Please enter a valid email address");

        }
    } else {
        // TODO: Add more meaningful errors
        return generateError(res, 403, "Missing Value");
    }
})

router.get('/', (req, res) => {
    res.status(403).send({
        error: 403,
        message: "Post only page"
    })
})



function generateError(res, code, message) {
    return res.status(code).send({
        "code": code,
        "message": message
    });
}

module.exports = router;