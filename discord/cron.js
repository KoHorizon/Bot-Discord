const Task = require("../models/Task");
const cron = require("node-cron");
const newsAPI = require("../apis/NewsAPI");
const Discord = require("discord.js");

module.exports.showTasksNumber = (channel) => {
  cron.schedule("* */1 * * *", () => {
    Task.findAll().then((tasks) => {
      channel.send(
        `Il y a actuellement ${tasks.length} tache${
          tasks.length > 1 ? "s" : ""
        } en cours. `
      );
    });
  });
};

module.exports.showNews = (channel) => {
  cron.schedule("* */1 * * *", () => {
    newsAPI.getRandomNews().then((res) => {
      const articles = res.data.articles;
      const n = Math.floor(Math.random() * 100) % articles.length;
      const article = articles[n];

      const Embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(article.title)
        .setURL(article.url)
        .setDescription(article.description)
        .setThumbnail(article.urlToImage);
        
      channel.send("Un petit article pour passer le temps ?");
      channel.send(Embed);
    });
  });
};
