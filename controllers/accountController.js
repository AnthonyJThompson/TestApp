var db = require('../db/datalayer');

module.exports.controller = function(app) {	
	app.post('/login', function(req, res){
		console.log('req.body:' + req.body);
		// check user and password
		var err;
		if (!err){
			db.login({name: req.body.name, password: req.body.password}, function(data){
				if (data){
					req.session.name = req.body.name;
					req.session.userid = data._id;
					console.log('users id: ' + data._id);
				}
				else{
					err = 'user name or password is incorrect';
				}
				
				res.redirect('/');
			});		
		}
	});
	
	app.get('/logout', function(req, res){		
		req.session.destroy();
		res.redirect('/');
	});
	
}