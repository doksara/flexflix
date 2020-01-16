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

router.route('/favorites/:user').get((req, res, next) => {
    User.findOne({ username: req.params.user })
        .populate({
            path: 'favorites',
            model: 'TvShow'
        })
        .exec((err, shows) => {
            if (err) {
                console.log(err);
            } else {
                const distinct = [...new Set(shows.favorites)];

                res.status(200)
                    .json(distinct);
            }
        });
});

module.exports = router;