const axios = require('axios');
const config = require('../config.json')
const axiosInstance = axios.create({
    baseURL: 'https://newsapi.org/v2'
});
const topics = ["gaming","crypto","apple","sony","microsoft","javascript"]

module.exports.getRandomNews = () => {
    
    const n = Math.floor(Math.random()*100) % topics.length
    const randomTopic = topics[n];

        return axiosInstance.request({
            method: "GET", 
            url: `/everything?q=${randomTopic}&apiKey=${config.apiNewsKey}`,
        });
};  

