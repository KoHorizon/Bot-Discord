/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');

const Task = require('../models/Task');
const User = require('../models/User');

const router = express.Router();

router.get('/tasks', (req, res) => {

    Task.findAll({
        include: [ User ]
    }).then((tasks) => {
        res.json({status: 200, data: tasks});
    });

});

router.post('/tasks', (req, res) => {

    Task.create({
        name: req.body.name,
        finished: false,
        UserId: req.body.user_id
    }).then((task) => {
        req.io.emit("TASKS-CREATED", task);
        req.discord.channels.cache.get('847115728087810058').send('Une tache a ete creer');
        res.json({status: 200, data: task});
    });

});

router.put('/tasks/:id(\\d+)', (req, res) => {

    Task.findOne({
        where: {
            id: req.params.id
        }
    }).then((task) => {

        if (task != null) {

            console.log(task.name);

            // Solution 1
            task.update({
                finished: true
            }).then((task) => {
                res.json({status: 200, data: task});
            });

            // Solution 2
            task.finished = true;
            task.save().then((task) => {
                res.json({status: 200, data: task});
            });

        } else {
            res.json({status: 404, data: "La tâche existe pas !!!"});
        }

    });

});

// router.delete('/tasks/:id', (req,res) => {
//     Tasks.findOne({
//         where:{
//             id: req.params.id
//         }
//     }).then((task)=>{
//         req.io.emit('TASKS-DELETED', task);

        
//     });



// });
router.delete('/tasks/:id',(req,res)=>{
    Task.findOne({
        where:{
            id: req.params.id
        }
    }).then((task)=>{
        if (task != ""){
            req.io.emit('TASKS-DELETED', task);

            Task.destroy({
                where:{
                    id: req.params.id
                }
            }).then((task)=>{
                res.json({
                    status:200,
                    data:task
                });
                req.discord.channels.cache.get('847115728087810058').send('Une tache a ete Supprimez');
            });
        }else{
            res.json({
                status:404,
                message:"task not fund"
            });
        }
    });
});




module.exports = router;