const router = require('express').Router();
let Show = require('../models/tvshow.js');

router.route('/').get((req, res, next) => {
    Show.find()
        .then(shows => res.status(200)
            .json(shows))
        .catch(err => res.status(400)
            .json('Error: ' + err));
});

module.exports = router;