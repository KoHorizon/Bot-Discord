const axios = require('axios');
const config = require('../config.json')
const axiosInstance = axios.create({
    baseURL: 'https://rest.coinapi.io'
});

module.exports.CryptoAPI = {
    getBTCEur:() => {
        return axiosInstance.request({
            method: "GET", 
            url: `/v1/exchangerate/BTC/EUR`,
            headers: {'X-CoinAPI-Key': config.tokenAPI}
        });
    },
    getBTCUsd:() => {
        return axiosInstance.request({
            method: "GET", 
            url: `/v1/exchangerate/BTC/USD`,
            headers: {'X-CoinAPI-Key': config.tokenAPI}
        });
    },
// ---------------------------------------------------------------
    geETHEur:() => {
        return axiosInstance.request({
            method: "GET", 
            url: `/v1/exchangerate/ETH/EUR`,
            headers: {'X-CoinAPI-Key': config.tokenAPI}
        });
    },
    getETHUsd:() => {
        return axiosInstance.request({
            method: "GET", 
            url: `/v1/exchangerate/ETH/USD`,
            headers: {'X-CoinAPI-Key': config.tokenAPI}
        });
    },
// ---------------------------------------------------------------
    geADAEur:() => {
        return axiosInstance.request({
            method: "GET", 
            url: `/v1/exchangerate/ADA/EUR`,
            headers: {'X-CoinAPI-Key': config.tokenAPI}
        });
    },
    getADAUsd:() => {
        return axiosInstance.request({
            method: "GET", 
            url: `/v1/exchangerate/ADA/USD`,
            headers: {'X-CoinAPI-Key': config.tokenAPI}
        });
    }
};