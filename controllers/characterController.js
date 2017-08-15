var db = require('../db/datalayer');

function createCharacter(req, callback){
    db.getCharacter(req.session.userid, function(char){
        if (!char){
            var character = {_userid: req.session.userid, name: req.body.name, race: req.body.race, class: req.body.class};
            db.addCharacter(character, function(){
                callback();
            });
        }
        else{
            callback();
        }
    });
}

module.exports.controller = function(app) {	
	app.get('/character/new', function(req, res){
        if (req.xhr){
            res.render('character/new.html', { races: db.races, classes: db.classes});
        }
        else{
            res.redirect('/');
        }
    });

    app.post('/character/new', function(req, res){
        console.log('race: '+ req.body.race);
        console.log('class: '+ req.body.class);
        console.log('name: '+ req.body.name);

        createCharacter(req, function(){
            res.redirect('/');
        });
    });
}