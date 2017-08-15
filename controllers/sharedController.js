var cService = require('../services/characterService');

module.exports.controller = function(app) {
	app.get('/shared/nav', function(req,res){
		cService.getCharacter(req.session.userid, function(char){
            res.render('shared/nav.html', {
                char: char
            });
		})
	});
}