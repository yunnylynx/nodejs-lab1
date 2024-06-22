const express = require('express');
const axios = require('axios');
const convict = require('convict');
require('dotenv').config();

const config = convict({
    apiUrl: {
        doc: "The API base URL",
        format: String,
        default: 'http://localhost:3000',
        env: 'API_URL'
    },
    port: {
        doc: "The port to bind",
        format: 'port',
        default: 3001,
        env: 'PORT'
    }
});

const app = express();

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${config.get('apiUrl')}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from API');
    }
});

app.listen(config.get('port'), () => {
    console.log(`Proxy server running on port ${config.get('port')}`);
});
