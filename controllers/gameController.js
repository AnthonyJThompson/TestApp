var db = require('../db/datalayer');

module.exports.controller = function(app) {	
	app.get('/game/landing', function(req, res){
        db.getCharacter(req.session.userid, function(char) {
            res.render('game/landing.html', {
                character: char
            });
        });
    });
}