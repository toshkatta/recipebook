'use strict'

let express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    pg = require('pg'),
    app = express(),
    config = {
        user: 'zoro',
        database: 'recipebook',
        password: '123123',
        host: 'localhost',
        port: 5432,
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    },
    pool = new pg.Pool(config),
    mainRouter = require('./routes/index.js'),
    apiRouter = require('./routes/api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'client')));

app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('*', apiRouter);

app.listen(3006, function () {
    console.log("Server started on port 3006");
});