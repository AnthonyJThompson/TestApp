var globals = require('../db/globals');

module.exports.controller = function(app) {	
	app.post('/login', function(req, res){
		var err = '';
		console.log('req.body:' + req.body);
		// check user and password
		globals.login({name: req.body.name, password: req.body.password}, function(data){
			if (data){
				req.session.name = req.body.name;
				req.session.userid = data._id;
				req.session.user = data.name_id;
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