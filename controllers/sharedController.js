var db = require('../db/datalayer.js');

module.exports.controller = function(app) {
	app.get('/shared/nav', function(req,res){
		db.getCharacter(req.session.userid, function(char){
            res.render('shared/nav.html', {
                char: char
            });
		})
	});
}