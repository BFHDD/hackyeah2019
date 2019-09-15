const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://dialogflow.googleapis.com',
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        'Content-Type': 'application/json'
    }
})

module.exports = instance