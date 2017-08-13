var db = require('../db/datalayer');

module.exports.controller = function(app) {	
	app.get('/character/new', function(req, res){
        if (req.xhr){
            res.render('character/new.html');
        }
        else{
            res.send('Oops, how did you get here?');
        }
    });
	
}