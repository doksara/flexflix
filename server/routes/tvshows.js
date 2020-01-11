const router = require('express').Router();
const Show = require('../models/tvshow.js');
const User = require('../models/user.js');

router.route('/').get((req, res, next) => {
    Show.find()
        .then(shows => res.status(200)
            .json(shows))
        .catch(err => res.status(400)
            .json('Error: ' + err));
});

router.route('/favorites/:id').get((req, res, next) => {

    const userId = req.params.id;

    Show.find()
});

module.exports = router;