const key = require('./config.js');
const express = require('express');
const Twitter = require('twit');
const app = express();
 
app.listen(3000, () => console.log('Server running'))

// Allowing X-domain request
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);

const client = new Twitter(key);

app.get('/home_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };

    client
        .get(`statuses/home_timeline`, params)
        .then(timeline => {

            res.send(timeline);
        })
        .catch(error => {
            res.send(error);
        });

});

app.get('/mentions_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };

    client
        .get(`statuses/mentions_timeline`, params)
        .then(timeline => {

            res.send(timeline);
        })
        .catch(error => {
            res.send(error);
        });

});

app.post('/post_tweet', (req, res) => {

    tweet = req.body;

    client
        .post(`statuses/update`, tweet)
        .then(tweeting => {
            console.log(tweeting);

            res.send(tweeting);
        })

        .catch(error => {
            res.send(error);
        });


});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});