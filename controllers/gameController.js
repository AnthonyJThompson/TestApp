var cService = require('../services/characterService');

module.exports.controller = function(app) {	
	app.get('/game/landing', function(req, res){
        cService.getCharacter(req.session.userid, function(char) {
            res.render('game/landing.html', {
                character: char
            });
        });
    });
}