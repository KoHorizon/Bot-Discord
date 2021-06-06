
const Task = require('./models/Task');
// const User = require('../models/User');
const config = require('./config.json')
const {CryptoAPI} = require('./apis/CryptoAPI')

module.exports = (io) => {
    

    const Discord = require("discord.js");

    const client = new Discord.Client();
    
    client.login(config.tokenDiscord);
    
    client.on("message", (message) => { 
        const prefix = "/";
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const arg = message.content.slice(prefix.length).split(' ');
        const command = arg.shift().toLowerCase()
        if (message.channel.name === "rinoshan") {
            let rates 
            let money
            if (command == "show-tasks") {

                Task.findAll().then((tasks) => {
                    message.reply(`Voilà les tasks:\r\n ${tasks.map((task) => ` ${task.name} \r\n `).join('')} `);
                });
 
            } else if(command == "task-create") {
                Task.create({
                    name: arg[1],
                    finished: false,
                    UserId: 1
                }).then((task) => {
                    message.reply(`Une tache a etait cree via discord`);
                    io.emit("TASKS-CREATED", task);
                });

            } else if (command == "task-destroy") {
                Task.destroy({
                    where: {},
                    truncate: true
                }).then(()=>{
                    message.reply(`Les taches on etait supprimez`);
                    io.emit("TASKS-DELETED");
                });
// --------------------------------------------------- BITCOIN
            } else if (command == "/btc") {  
                if (arg[1]){
                    switch (arg[1]) {
                        case 'usd':
                            CryptoAPI.getBTCUsd().then((crypto) => {
                                rates = crypto.data.rate
                                money = rates.toFixed(2);
                                message.reply(`La valeur du BTC est à ${money} dollars actuellement.`);
                            }).catch((error) => console.log(error));
                            break;
                        case 'eur':
                            CryptoAPI.getBTCEur().then((crypto) => {
                                rates = crypto.data.rate
                                money = rates.toFixed(2);
                                message.reply(`La valeur du BTC est à ${money} euro actuellement.`);
                            }).catch((error) => console.log(error));
                            break;
                        default:
                            message.reply(`Je n'ai pas compris votre message, voici les paramètre pris en compte 'eur et usd !'`);
                            break;
                    }
                }else if(arg[0]){
                    message.reply(`\r\n Le BTC, tu le veux en quoi ?  \r\n eur ? \r\n usd ? \r\n Exemple : '/btc eur'`);
                }
// --------------------------------------------------- ETHERUM
            } else if (command == "/eth"){
                if (arg[1]){
                    switch (arg[1]) {
                        case 'usd':
                            CryptoAPI.getETHUsd().then((crypto) => {
                                rates = crypto.data.rate
                                money = rates.toFixed(2);
                                message.reply(`La valeur du ETH est à ${money} dollars actuellement.`);
                            }).catch((error) => console.log(error));
                            break;
                        case 'eur':
                            CryptoAPI.geETHEur().then((crypto) => {
                                rates = crypto.data.rate
                                money = rates.toFixed(2);
                                message.reply(`La valeur du ETH est à ${money} euro actuellement.`);
                            }).catch((error) => console.log(error));
                            break;
                        default:
                            message.reply(`Je n'ai pas compris votre message, voici les paramètre pris en compte 'eur et usd !'`);
                            break;
                    }
                }else if(arg[0]){
                    message.reply(`\r\n Le ETH, tu le veux en quoi ?  \r\n eur ? \r\n usd ? \r\n Exemple : '/eth eur'`);
                }
// --------------------------------------------------- CARDANO
            } else if (message.content.startsWith("/ada")){
                if (arg[1]){
                    switch (arg[1]) {
                        case 'usd':
                            CryptoAPI.getADAUsd().then((crypto) => {
                                rates = crypto.data.rate
                                money = rates.toFixed(2);
                                message.reply(`La valeur du Cardano est à ${money} dollars actuellement.`);
                            }).catch((error) => console.log(error));
                            break;
                        case 'eur':
                            CryptoAPI.geADAEur().then((crypto) => {
                                rates = crypto.data.rate
                                money = rates.toFixed(2);
                                message.reply(`La valeur du Cardano est à ${money} euro actuellement.`);
                            }).catch((error) => console.log(error));
                            break;
                        default:
                            message.reply(`Je n'ai pas compris votre message, voici les paramètre pris en compte 'eur et usd !'`);
                            break;
                    }
                }else if(arg[0]){
                    message.reply(`\r\n Le Cardano, tu le veux en quoi ?  \r\n eur ? \r\n usd ? \r\n Exemple : '/ada eur'`);
                }

            } else if (message.content.startsWith("/Crack-Games")){
                message.reply(`Tu peux trouver des jeux crack ici: https://fitgirl-repacks.site/`);
            } else if (message.content.startsWith("/play")) {

            }
        }
    });
    return client;
};