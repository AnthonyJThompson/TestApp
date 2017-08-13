var db = require('../db/datalayer');

module.exports.controller = function(app) {	
	app.post('/login', function(req, res){
		var err = '';
		console.log('req.body:' + req.body);
		// check user and password
		db.login({name: req.body.name, password: req.body.password}, function(data){
			if (data){
				req.session.name = req.body.name;
				req.session.userid = data._id;
				console.log('users id: ' + data._id);
				res.redirect('/');
			}
			else{
				err = 'user name or password is incorrect';
				res.render('account/login.html', { error: err });
			}			
		});		
	});
	
	app.get('/logout', function(req, res){		
		req.session.destroy();
		res.redirect('/');
	});
	
}