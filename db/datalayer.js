var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/test';
var users = [];
var chars = [];
var races = [];
var classes = [];
var updateUsers = [];

module.exports.users = users;
module.exports.chars = chars;
module.exports.races = races;
module.exports.classes = classes;

MongoClient.connect(dbUrl, function(err, db) {
	db.collection('users').find().forEach(function(user){
		users.push(user);
	});
	db.collection('races').find().forEach(function(race){
		races.push(race);
	});
	db.collection('classes').find().forEach(function(cl){
		classes.push(cl);
	});
	db.close();
});

module.exports = {
	users: users,
	chars: chars,
	races: races,
	classes: classes,

	login: function (data, callback){
		user = getUser(data.name)
		if (user && user.name == data.name 
				 && user.password == data.password){
		}
		else{
			user = false;
		}	
		callback(user);	
	},
	getCharacter: function (_userid, callback){
		MongoClient.connect(dbUrl, function(err,db){
			db.collection('characters').findOne({"_userid": _userid}, function(err, res){
				callback(res);
			});
			db.close();
		})
	},
	addCharacter: function (character, callback){
		MongoClient.connect(dbUrl, function(err,db){
			db.collection('characters').insert(character, function(err, res){
				console.log('inserted character');
				callback();
			});
			db.close();
		})
	}
}

function getUser(name){
	for(var i = 0; i < users.length; i++)
	{
		if(users[i].name == name)
		{
			return users[i];
		}
	}
}

function startUpdate(){
	var updating = false;
	setInterval(function() {
		console.log(updateUsers);
		if (updating == false){
			updating = true;
			while(updateUsers.length > 0)
			{
				updateUser(updateUsers[0], function(){
					updateUsers.pop(updateUsers[0]);
				});
			}	
			updating = false;
		}
	}, 60000);
}

function updateUser(user, callback){
	MongoClient.connect(dbUrl, function(err, db) {
		if (err) throw err;
		var userCollection = db.collection('users');	
		userCollection.update(
			{_id: user._id},
			user
		);
		db.close();
	});
	callback();
}

startUpdate();