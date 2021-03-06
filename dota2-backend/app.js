
const express = require('express');
const app = express();
const axios = require('axios');
const steam = require('./api_key.json');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/matchHistory', (req, res) => {
    const steamId = req.query.steamId;
    axios.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=${steam.API_KEY}&matches_requested=10&account_id=${steamId}`)
        .then(response => {
            res.json({
                "status": 200,
                "message": "SUCCESS",
                "data": response.data
            })
        })
        .catch(error => {
            // console.log(error);
        });
})


app.get('/matchDetails', (req, res) => {
    const matchId = req.query.matchId;
    axios.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=${matchId}&key=${steam.API_KEY}`)
        .then(response => {
            res.json({
                "status": 200,
                "message": "SUCCESS",
                "data": response.data
            })
        })
        .catch(error => {
            // console.log(error);
        });
})

app.get('/heroes', (req, res) => {
    axios.get(`https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=${steam.API_KEY}`)
        .then(response => {
            res.json({
                "status": 200,
                "message": "SUCCESS",
                "data": response.data
            })
        })
        .catch(error => {
            // console.log(error);
        });
})

app.listen(3000, (req, res) => {
    console.log(`Server listening to port 3000`)
})