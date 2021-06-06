const express = require('express');

const Task = require('../models/Task');
const User = require('../models/User');

const router = express.Router();

router.get('/pages/index', (req, res) => {

    Task.findAll({
        include: [ User ]
    }).then((tasks) => {

        res.render('index', { 
            tasks: tasks,
            title: "La page des mes tâches."
        });

    });

});

module.exports = router;