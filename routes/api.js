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


router.get('/recipes', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.status(500).send({ error: err });
        }

        let limit = 4;
        let offset = parseInt(req.query.page) * limit;
        offset = offset > 0 ? offset - parseInt(req.query.page) : offset;
        let more = false;

        client.query('SELECT id, name, ingredients, directions FROM recipes ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset], function (err, result) {
            if (err) {
                res.status(500).send({ error: err });
            }

            if (result.rowCount > (limit - 1)) {
                more = true;
                result.rows.pop();
            }

            res.status(200).send({ recipes: result.rows, more: more });
            done();
        });
    });

    pool.on('error', function (err, client) {
        res.status(500).send({ error: err });
    });
});

router.get('/recipe', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.status(500).send({ error: err });
        }

        let id = parseInt(req.query.id)

        client.query('SELECT id, name, ingredients, directions FROM recipes WHERE id = $1', [id], function (err, result) {
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

router.post('/addRecipe', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.status(500).send({ error: err });
        }

        client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', [req.body.name, req.body.ingredients, req.body.directions], function (err, result) {
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

router.delete('/delete/:id', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.status(500).send({ error: err });
        }

        client.query('DELETE FROM recipes WHERE id = $1', [req.params.id], function (err, result) {
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

router.put('/edit', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.status(500).send({ error: err });
        }

        client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id = $4', [req.body.name, req.body.ingredients, req.body.directions, req.body.id], function (err, result) {
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

module.exports = router;