var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/test';
var users = [{_id: 'abc', name: 'test', password: '', isLoggedIn: false, lastActivity: ''}];
var updateUsers = [];

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
	login: function (data, callback){
		user = getUser(data.name)
		if (user && user.name == data.name 
				 && user.password == data.password){
			//user.isLoggedIn = true;
			user.lastActivity = new Date();
			updateUsers.push(user);
			console.log(user);
			callback(user);
		}		
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