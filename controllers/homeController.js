module.exports.controller = function(app) {
	app.get('/', function(req, res){
		console.log('/ called - logged in');
		res.render('home/index.html');
	});
	
	app.get('/test', function(req, res){		
		res.render('home/test.html');
	});
}