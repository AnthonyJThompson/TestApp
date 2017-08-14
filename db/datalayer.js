var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/test';
var users = [{_id: 'abc', name: 'test', password: '', isLoggedIn: false, lastActivity: '', name_id: 'abc_test'},
			 {_id: 'abc1', name: 'test1', password: '', isLoggedIn: false, lastActivity: '', name_id: 'abc1_test1'},
			 {_id: 'abc2', name: 'test2', password: '', isLoggedIn: false, lastActivity: '', name_id: 'abc2_test2'},
			 {_id: 'abc3', name: 'test3', password: '', isLoggedIn: false, lastActivity: '', name_id: 'abc3_test3'},
			 {_id: 'abc4', name: 'test4', password: '', isLoggedIn: false, lastActivity: '', name_id: 'abc4_test4'},
			 {_id: 'ab123', name: 'pandorabc', password: '', isLoggedIn: false, lastActivity: '', name_id: 'ab123_pandorabc'},
			 {_id: 'ab321', name: 'sym', password: '', isLoggedIn: false, lastActivity: '', name_id: 'ab321_sym'},
			 {_id: 'ab231', name: 'ecu', password: '', isLoggedIn: false, lastActivity: '', name_id: 'ab231_ecu'},
			 {_id: 'abc5', name: 'test5', password: '', isLoggedIn: false, lastActivity: '', name_id: 'abc5_test5'}];
var chars = [{_id: 'abc_test', name: 'myName', race: 'myRace', class: 'myClass'}];
var races = [{name: 'Human', description: 'They do human stuff, pretty normal doods.  Apparently they say poot.'}, 
			 {name: 'Orc', description: 'Green and nasty, they smash good and not good much else.'},
			 {name: 'Orc', description: 'Green and nasty, they smash good and not good much else.'}, 
			 {name: 'Orc', description: 'Green and nasty, they smash good and not good much else.'}, 
			 {name: 'Orc', description: 'Green and nasty, they smash good and not good much else.'}, 
			 {name: 'Orc', description: 'Green and nasty, they smash good and not good much else.'},  
			 {name: 'Elf', description: 'Fancy guys that like trees and nature and stuff.  You know the ones.'}];
var classes = [{name: 'Warrior', description: 'Chop chop.'}, {name: 'Rogue', description: 'Sneaky chop.'}, 
			   {name: 'Mage', description: 'Magic... chop?'}, {name: 'Priest', description: "Anti-chop."}];
var updateUsers = [];

module.exports.users = users;
module.exports.chars = chars;
module.exports.races = races;
module.exports.classes = classes;

// MongoClient.connect(dbUrl, function(err, db) {
		// if (err) throw err;
		// var userCollection = db.collection('users');
		// //userCollection.update({}, {$set : {"isLoggedIn":false, "lastActivity":new Date()}},{upsert:false,multi:true});
		
		
		// cursor = userCollection.find();
		// cursor.each(function(err, item){
			// if(item != null){
				// item.isLoggedIn = false;
				// users.push(item);
			// }
		// });
		// db.close();
	// });

module.exports = {
	users: users,
	chars: chars,
	races: races,
	classes: classes,

	login: function (data, callback){
		user = getUser(data.name)
		if (user && user.name == data.name 
				 && user.password == data.password){
			//user.isLoggedIn = true;
			user.lastActivity = new Date();
			updateUsers.push(user);
			console.log(user);
		}	
		callback(user);	
	},
	getChar: function (name_id, callback){
		console.log('getChar called');
		for(var i = 0; i < chars.length; i++)
		{
			console.log('char loop');
			if(chars[i]._id == name_id)
			{
				console.log('char found');
				callback(chars[i]);
				return;
			}
		}
		callback(false);
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

function getAllUsers(){
	MongoClient.connect(dbUrl, function(err, db) {
		if (err) throw err;
		var users = db.collection('users');
		
		cursor = users.find();
		cursor.each(function(err, item){
			console.log(item);
			if(item != null){
				users.push(item);
			}
		});
	});
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
					console.log('working?');
					updateUsers.pop(updateUsers[0]);
				});
			}	
			updating = false;
		}
	}, 5000);
}

function updateUser(user, callback){
	console.log('updateUsers: user - ' + user._id);
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

//startUpdate();