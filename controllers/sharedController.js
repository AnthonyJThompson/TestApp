var db = require('../db/datalayer.js');

module.exports.controller = function(app) {
	app.get('/shared/nav', function(req,res){
        var name_id = req.session.userid + '_' + req.session.name;

		db.getChar(name_id, function(char){
            res.render('shared/nav.html', {
                charName: char.name
            });
		})
	});
}