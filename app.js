var express = require('express');
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');
var session = require('express-session');
var bodyparser = require('body-parser');
var cookie = require('cookie');
var MongoStore = require('connect-mongo')(session);
var mongoStore = new MongoStore({ url: 'mongodb://localhost:27017/test'});
var connections = [];

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: true}));

app.set('trust proxy', 1); // trust first proxy
app.use(session({
	store: mongoStore,
	secret: 'testing secret',
	resave: false,
	saveUninitialized: true
}));

app.use('/', function(req, res, next){
	if(!req.session.userid && req.originalUrl != '/login'){
		res.render('account/login.html', { error: '' });
	}
	else{
		next();
	}
});

fs.readdirSync('./controllers').forEach(function (file) {
	if(file.substr(-3) == '.js') {
		route = require('./controllers/' + file);
		route.controller(app);
	}
});

http.listen(51978, function(){
	console.log('listening on *:51978');
});

//var sio = io.listen(http);

// sio.set('authorization', function(data, accept){
// 	if(!data.headers.cookie){
// 		return accept('No cookie', false);
// 	}	
// 	accept(null, true);
// });

// sio.sockets.on('connection', function(socket){
// 	var id = cookie.parse(socket.handshake.headers.cookie)['connect.sid'];
// 	socket.sessionId = id.split(".")[0].split(":")[1];

// 	console.log('added: ' + socket.sessionId);
// 	connections.push(socket);
// 	sio.sockets.emit('sync', connections.length)

// 	socket.on('disconnect', function(data){
// 		console.log('user DC, userid: ' + socket.userid);
// 		for(var i = 0; i < connections.length; i++)
// 		{
// 			if(connections[i].sessionId == socket.sessionId)
// 			{
// 				console.log('removed: ' + connections[i].sessionId);
// 				connections.splice(i, 1);
// 			}
// 		}
// 		sio.sockets.emit('sync', connections.length)
// 	});
// });