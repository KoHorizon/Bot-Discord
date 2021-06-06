const {CryptoAPI} = require('../apis/CryptoAPI')
const Task = require('../models/Task');

module.exports.showTasks= (message) => {

    Task.findAll().then((tasks) => {
        message.reply(`Voilà les tasks:\r\n ${tasks.map((task) => ` ${task.name} \r\n `).join('')} `);
    });
}

module.exports.createATask= (io,message) => {
    const args = message.content.split(' ');

    Task.create({
        name: args[1],
        finished: false,
        UserId: 1
    }).then((task) => {
        message.reply(`Une tache a etait cree via discord`);
        io.emit("TASKS-CREATED", task);
    });
}

module.exports.destroyAllTasks = (io,message) => {
    Task.destroy({
        where: {},
        truncate: true
    }).then(()=>{
        message.reply(`Les taches on etait supprimez`);
        io.emit("TASKS-DELETED");
    });
}

module.exports.getBTC = (message) => {
    const args = message.content.split(' ');
    let rates 
    let money
    if (args[1]){
        switch (args[1]) {
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
    }else{
        message.reply(`\r\n Le BTC, tu le veux en quoi ?  \r\n eur ? \r\n usd ? \r\n Exemple : '/btc eur'`);
    }
}

module.exports.getETH = (message) => {
    const args = message.content.split(' ');
    let rates 
    let money
    if (args[1]){
        switch (args[1]) {
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
    }else if(args[0]){
        message.reply(`\r\n Le ETH, tu le veux en quoi ?  \r\n eur ? \r\n usd ? \r\n Exemple : '/eth eur'`);
    }
}

module.exports.getADA = (message) => {
    const args = message.content.split(' ');
    let rates 
    let money
    if (args[1]){
        switch (args[1]) {
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
    }else if(args[0]){
        message.reply(`\r\n Le Cardano, tu le veux en quoi ?  \r\n eur ? \r\n usd ? \r\n Exemple : '/ada eur'`);
    }
}

module.exports.getCrackSite = (message) => {
    message.reply(`Tu peux trouver des jeux crack ici: https://fitgirl-repacks.site/`);
}

module.exports.getDonation = (message) => {
    message.reply(`Please donate something 'https://www.paypal.com/paypalme/rinoshan'`);
}