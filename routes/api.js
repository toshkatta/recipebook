let express = require('express'),
    router = express.Router(),
    pg = require('pg'),
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


router.post('/addRecipe', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.status(500).send({ error: err });
        }

        client.query('INSERT INTO recipes(name, ingredients, directions, "userId") VALUES($1, $2, $3, $4)', [req.body.name, req.body.ingredients, req.body.directions, req.body.userId], function (err, result) {
            if (err) {
                res.status(500).send({ error: err });
            }

            res.status(200).send({ data: result.rows });
            done();
        });
    });

    pool.on('error', function (err, client) {
        res.status(500).send({ error: err });
    });
});

router.get('/recipes', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.status(500).send({ error: err });
        }

        client.query('SELECT * FROM recipes', function (err, result) {
            if (err) {
                res.status(500).send({ error: err });
            }

            res.status(200).send({ data: result.rows });
            done();
        });
    });

    pool.on('error', function (err, client) {
        res.status(500).send({ error: err });
    });
});

/*
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

        client.query('INSERT INTO recipes(name, ingredients, directions, userId) VALUES($1, $2, $3, $4)', [req.body.name, req.body.ingredients, req.body.directions, req.body.userId], function (err, result) {
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
*/

module.exports = router;