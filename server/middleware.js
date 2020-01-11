const jwt = require('jsonwebtoken');

const withAuth = function (req, res, next) {

    const secret = "tbp-projekt";
    const token = req.body.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                console.log(decoded);
                req.username = decoded.username;
                next();
            }
        });
    }
}

module.exports = withAuth;