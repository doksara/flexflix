const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');
const data = require('./data');

const app = express();

const User = require('./models/user.js');
const Show = require('./models/tvshow');

data.forEach((show) => {
   let f = new Show({
       _id: new mongoose.Types.ObjectId(),
       title: show.title,
       tv_station: show.tv_station,
       duration: show.duration,
       image: show.image,
       actors: show.actors,
       type: show.type,
       plot: show.plot,
       episodes: show.episodes,
       tags: show.tags,
       likes: show.likes,
       startYear: show.startYear,
       endYear: show.endYear
   });

    f.save();
});

// Import routes 
const showsRouter = require('./routes/tvshows.js');
const usersRouter = require('./routes/users.js');

const mongo_uri = 'mongodb://localhost:27017/recommendation-db';

// Connect to DB
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Default settings
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
})

// Setup routes
app.use('/api/shows', showsRouter);
app.use('/api/users', usersRouter);

app.get('/api/secret', withAuth, function (req, res) {
    res.send('The password is potato');
});

app.post('/api/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});

app.post('/api/authenticate', (req, res) => {
    let secret = "tbp-projekt";
    let { username, password } = req.body;

    User.findOne({ username }, function (err, user) {
        if (err) {
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect username or password'
                });
        } else {
            let correct = user.isCorrectPassword(password);

            if (!correct) {
                res.status(401)
                    .json({
                        error: 'Incorrect username or password'
                    });
            } else {
                // Issue token
                const payload = { username };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                console.log(`Potpisao sam token od ${username} sa ${token}`);
                res.cookie('token', token, { httpOnly: true })
                    .json({
                        message: "Loggin successful",
                        token: token
                    })
                    .status(200);
            }
        }
    });
});

// Start the server
app.listen(5000, () => console.log("Server has started."));