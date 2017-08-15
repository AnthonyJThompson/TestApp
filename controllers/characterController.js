var cService = require('../services/characterService');
var globals = require('../db/globals');

function createCharacter(req, callback){
    cService.getCharacter(req.session.userid, function(char){
        if (!char){
            var character = {_userid: req.session.userid, name: req.body.name, race: req.body.race, class: req.body.class};
            cService.addCharacter(character, function(){
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
            res.render('character/new.html', { races: globals.races, classes: globals.classes});
        }
        else{
            res.redirect('/');
        }
    });

    app.post('/character/new', function(req, res){
        createCharacter(req, function(){
            res.redirect('/');
        });
    });
 
    app.post('/character/delete', function(req, res){
        cService.getCharacter(req.session.userid, function(char){
            if (char){
                cService.deleteCharacter(char, function(){
                    res.redirect('/');
                });
            }
            else{
                res.redirect('/');
            }
        });
    });
}