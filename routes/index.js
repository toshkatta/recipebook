let express = require('express');
let router = express.Router();

const routes = [
    '/',
    '/recipes',
    '/drinks',
    '/recipe/:id',
    '/drink/:id'
]

router.get(routes, function (req, res) {
    res.render('index');
});

module.exports = router;