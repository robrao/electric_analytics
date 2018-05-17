'use strict';
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const express = require('express');
const app = express();

let db;

//app.use('/assets', express.static(`${__dirname}/public`));

app.get('*', (req, res) => {
    //res.sendFile(`${__dirname}/public/index.html`);
    if (db) {
        db.collection('electric_analytics').find({}).toArray((err, results) => {
            if (err) return console.warn(err);
            res.send(results);
        });
    } else {
        console.warn(`NO DB DB DB!!!`);
    }
});

MongoClient.connect('mongodb://172.18.0.2:27017', (err, client) => {
    if (err) return console.log(err)
    db = client.db('test') // whatever your database name is
    app.listen(3000, () => {
        console.warn('listening on 30000000000000000000000000000000')
    });
});

//const port = process.env.PORT || 3000;
//app.listen(port);
