const router = require('express').Router();
const User = require('../models/user.js');
const Show = require('../models/tvshow.js');

router.route('/addFavorite').post((req, res) => {

    const { user, show } = req.body;

    User.findOneAndUpdate(
        { username: user },
        { $push: { "favorites": show } },
        { new: true, useFindAndModify: false },
        function (err, entry) {
            if (err) {
                res.status(400)
                    .json({
                        message: "Error while updating."
                    })
            } else {
                res.status(200)
                    .json({
                        message: "Successfully updated."
                    })
            }
        })
        .catch(err => res.status(400));
});

router.route('/removeFavorite').post((req, res) => {

    const { user, show } = req.body;

    User.findOneAndUpdate(
        { username: user },
        { $pullAll: { "favorites": [show] } },
        { new: true, useFindAndModify: false },
        function (err, entry) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: "Error while updating."
                    })
            } else {
                res.status(200)
                    .json({
                        message: "Successfully updated."
                    })
            }
        })
        .catch(err => res.status(400));
});

module.exports = router;