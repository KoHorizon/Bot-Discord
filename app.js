require('./models-relations.js');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const discord = require('./discord');

const client = discord(io);

app.use((req, res, next) => {
    req.io = io;
    req.discord = client;
    next();
    // if (req.headers['accept-language'] && req.headers['accept-language'].includes("fr")) {
    //     next()
    // } else {
    //     res.json({status: 404, message: "Vous n'êtes pas français, donc pas le bienvenu !!! https://translate.google.com"})
    // }
});

io.on('connection', () => {
    console.log("Ah une nouvelle socket s'est connecté");
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(require('./controllers/pages'));
app.use(require('./controllers/users'));
app.use(require('./controllers/tasks'));

server.listen(3000, () => {
    console.log('listening on *:3000');
});