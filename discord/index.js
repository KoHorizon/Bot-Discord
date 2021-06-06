// const User = require('../models/User');
const config = require("../config.json");
const Commands = require("./commands");
const Cron = require("./cron");
// const Music = require("./music");
const Queue = require("./queue");

module.exports = (io) => {
  const Discord = require("discord.js");

  const client = new Discord.Client();

  client.login(config.tokenDiscord);

  client.on("message", (message) => {
    const rgx = /(rinoshan|bot-music)/;
    const isOk = message.channel.name.match(rgx);
    if (!isOk) return;
    // console.log(message.guild.id);
    const prefix = "!";
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const arg = message.content.slice(prefix.length).split(" ");
    const command = arg.shift().toLowerCase();

    let guildId = message.guild.id;
    if (!guildId) return;
    let serverQueue = Queue.get(guildId);
    if (!serverQueue) {
      serverQueue = Queue.newServerQueue();
      Queue.set(guildId, serverQueue);
    }

    switch (command) {
      case "show-tasks":
        Commands.showTasks(message);
        break;
      case "task-create":
        Commands.createATask(message);
        break;
      case "task-destroy":
        Commands.destroyAllTasks(message);
        break;
      case "btc":
        Commands.getBTC(message);
        break;
      case "eth":
        Commands.getETH(message);
        break;
      case "ada":
        Commands.getADA(message);
        break;
      case "crack-games":
        Commands.getCrackSite(message);
        break;
      case "donation":
        Commands.getDonation(message);
        break;
      //   case "play":
      //     Music.Play(message);
      //     break;
      case "cron1":
        if (serverQueue.cron.cron1) {
          return message.reply("Un cron est deja actif");
        }
        serverQueue.cron.cron1 = true;
        cron.schedule("*/1 * * * *", () => {
          message.channel.send("Gros test Cron");
        });
        message.reply("Tu viens de lancer le cron1");
        break;
      case "cron2":
        if (serverQueue.cron.cron2) {
          return message.reply("Un cron est deja actif");
        }
        serverQueue.cron.cron2 = true;
        cron.schedule("*/1 * * * *", () => {
          message.channel.send("Gros test Cron");
        });
        message.reply("Tu viens de lancer le cron2");
        break;

      default:
        message.reply(`Cette commande n'existe pas`);
        break;
    }
  });
  client.on("ready", () => {
    const myChannel = client.channels.cache.get("847115728087810058");
    Cron.showTasksNumber(myChannel);
    Cron.showNews(myChannel);
  });
  return client;
};
