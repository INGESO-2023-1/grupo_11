const express = require('express')
const app = express()
const port = 3001

const dispositivos_model = require('./dispositivos_model').default

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    dispositivos_model.getDispositivos()
        .then(response => {
        res.status(200).send(response);
        })
        .catch(error => {
        res.status(500).send(error);
        })
})

app.post('/dispositivos', (req, res) => {
    dispositivos_model.createDispositivo(req.body)
        .then(response => {
        res.status(200).send(response);
        })
        .catch(error => {
        res.status(500).send(error);
        })
})

app.delete('/dispositivos/:id', (req, res) => {
    dispositivos_model.deleteDispositivo(req.params.id)
        .then(response => {
        res.status(200).send(response);
        })
        .catch(error => {
        res.status(500).send(error);
        })
})
