const express = require('express');
const User = require('../models/User');
const Task = require('../models/Task');

const router = express.Router();

router.get('/users', (req, res) => {

    User.findAll({
        include: [ Task ]
    }).then((users) => {

        res.json({status: 200, data: users});

    });

});

router.post('/users', (req, res) => {

    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        password: req.body.password,
    }).then((user) => {

        res.json({status: 201, data: user});

    });

});

module.exports = router;