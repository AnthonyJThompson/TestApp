var db = require('../db/datalayer');

module.exports.controller = function(app) {	
	app.get('/character/new', function(req, res){
        if (req.xhr){
            console.log();
            res.render('character/new.html', { races: db.races});
        }
        else{
            res.send('Oops, how did you get here?');
        }
    });
	
}