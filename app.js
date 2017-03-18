'use strict'

let express = require('express'),
    bodyParser = require('body-parser'),
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
    pool = new pg.Pool(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let connectionErrorHandler = function (err) {
    return console.error('error fetching client from pool', err);
};

let queryErrorHandler = function (err) {
    return console.error('error running query', err);
};

let clientErrorHandler = function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
    res.status(500).send({ error: err });
};

app.get('/', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            connectionErrorHandler(err);
        }

        client.query('SELECT * FROM recipes', function (err, result) {
            if (err) {
                queryErrorHandler(err);
            }

            res.status(200).send({ data: result.rows });
            done();
        });
    });

    pool.on('error', clientErrorHandler(err, client));
});

app.post('/add', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            connectionErrorHandler(err);
        }

        client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', [req.body.name, req.body.ingredients, req.body.directions], function (err, result) {
            if (err) {
                queryErrorHandler(err);
            }

            res.status(200).send({ data: result.rows });
            done();
        });
    });

    pool.on('error', clientErrorHandler(err, client));
});

app.delete('/delete/:id', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            connectionErrorHandler(err);
        }

        client.query('DELETE FROM recipes WHERE id = $1', [req.params.id], function (err, result) {
            if (err) {
                queryErrorHandler(err);
            }

            res.status(200).send({ data: result.rows });
            done();
        });
    });

    pool.on('error', clientErrorHandler(err, client));
});

app.put('/edit', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            connectionErrorHandler(err);
        }

        client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id = $4', [req.body.name, req.body.ingredients, req.body.directions, req.body.id], function (err, result) {
            if (err) {
                queryErrorHandler(err);
            }

            res.status(200).send({ data: result.rows });
            done();
        });
    });

    pool.on('error', clientErrorHandler(err, client));
});

app.listen(3006, function () {
    console.log("Server started on port 3006");
});