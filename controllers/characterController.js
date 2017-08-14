var db = require('../db/datalayer');

module.exports.controller = function(app) {	
	app.get('/character/new', function(req, res){
        if (req.xhr){
            res.render('character/new.html', { races: db.races, classes: db.classes});
        }
        else{
            res.send('Oops, how did you get here?');
        }
    });

    app.post('/character/new', function(req, res){
        console.log('race: '+ req.body.race);
        console.log('class: '+ req.body.class);
        console.log('name: '+ req.body.name);

        db.chars.push({_id: req.session.userid + '_' + req.session.name, name: req.body.name, race: req.body.race, class: req.body.class })
        res.redirect('/');
    });
}