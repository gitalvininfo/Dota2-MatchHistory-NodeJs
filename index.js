const express = require('express');
const app = express();
const axios = require('axios');
const steam = require('./api_key.json');
const path = require('path');

var distDir = __dirname + "/dist/";
app.use(express.static(__dirname + '/public'));
app.use(express.static(distDir));

const port = process.env.PORT || 3000;



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.json({ info: 'Node.js,Express, and Postgres API' });
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
    // const matchId = req.query.matchId;
    // axios.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=${matchId}&key=${steam.API_KEY}`)
    //     .then(response => {
    //         res.json({
    //             "status": 200,
    //             "message": "SUCCESS",
    //             "data": response.data
    //         })
    //     })
    //     .catch(error => {
    //         // console.log(error);
    //     });

    const matchId = req.query.matchId;

    axios.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=${matchId}&key=${steam.API_KEY}`)
        .then(response => {

            var context = {};
            var items = [];
            const matchObj = response.data.result;
            context.match_id = matchObj.match_id;
            context.match_start = new Date(matchObj.start_time * 1000);

            axios.get(`https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=${steam.API_KEY}`)
                .then(response => {
                    heroes = response.data.result.heroes;
                    // context.heroes = heroes;

                    if (matchObj.radiant_win) {
                        context.winner = "Radiant wins!";
                    } else {
                        context.winner = "Dire wins!";
                    }


                    context.match_duration = Math.floor(matchObj.duration / 60) + 'min ' + matchObj.duration % 60 + 'sec';
                    console.log(matchObj.players.length);
                    var radiantheroes = [];
                    for (var i = 0; i < 5; i++) {
                        var str = findByHeroId(matchObj.players[i].hero_id).replace('npc_dota_hero_', '');
                        console.log(str);
                        radiantheroes.push(`http://cdn.dota2.com/apps/dota2/images/heroes/${str}_sb.png`);
                    }
                    context.radiant = radiantheroes;
                    var direheroes = [];
                    for (var i = 5; i < 10; i++) {
                        var str = findByHeroId(matchObj.players[i].hero_id).replace('npc_dota_hero_', '');
                        console.log(str);
                        direheroes.push(`http://cdn.dota2.com/apps/dota2/images/heroes/${str}_sb.png`);
                    }
                    context.dire = direheroes;

                    res.json({
                        "status": 200,
                        "message": "SUCCESS",
                        "data": context
                    })


                })
        })
        .catch(error => {
            // console.log(error);
        });
})

app.get('/heroes', (req, res) => {
    axios.get(`https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=${steam.API_KEY}`)
        .then(response => {
            heroes = response.data;
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

app.get('/allHeroes', (req, res) => {
    var context = {};
    axios.get(`https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=${steam.API_KEY}`)
        .then(response => {
            var images = [];
            var parsedResponse = response.data.result.heroes;
            for (var i = 0; i < parsedResponse.length; i++) {
                var str = parsedResponse[i].name.replace('npc_dota_hero_', '');
                images.push(`https://cdn.dota2.com/apps/dota2/images/heroes/${str}_sb.png`)
            }
            context.dataList = images;
            res.json({
                "status": 200,
                "message": "SUCCESS",
                "data": context
            })
        })
        .catch(error => {
            // console.log(error);
        });
})


app.get('/allItems', (req, res) => {
    var context = {};
    axios.get(`https://api.steampowered.com/IEconDOTA2_570/GetGameItems/v0001/?key=${steam.API_KEY}`)
        .then(response => {
            var images = [];
            var parsedResponse = response.data.result.items;
            for (var i = 0; i < parsedResponse.length; i++) {
                var str = parsedResponse[i].name.replace('item_', '');
                images.push(`https://cdn.dota2.com/apps/dota2/images/items/${str}_lg.png`)
            }
            context.dataList = images;
            res.json({
                "status": 200,
                "message": "SUCCESS",
                "data": context
            })
        })
        .catch(error => {
            // console.log(error);
        });
})

function findByHeroId(heroId) {
    let heroName = heroes.find(hero => hero.id == heroId).name;
    return heroName;
}

app.listen(port, (req, res) => {
    console.log(`Server listening to port ${port}`)
})