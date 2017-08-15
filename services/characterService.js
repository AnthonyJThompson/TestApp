var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/test';

module.exports = {
	getCharacter: function (_userid, callback){
		MongoClient.connect(dbUrl, function(err,db){
			db.collection('characters').findOne({"_userid": _userid}, function(err, res){
				callback(res);
			});
			db.close();
		});
	},
	addCharacter: function (character, callback){
		MongoClient.connect(dbUrl, function(err,db){
			db.collection('characters').insert(character, function(err, res){
				console.log('inserted character');
				callback();
			});
			db.close();
		});
	},
	updateCharacter: function (character, callback){
		MongoClient.connect(dbUrl, function(err,db){
			db.collection('characters').update({"_id": character._id},character, function(err, res){
				console.log('updated character');
				callback();
			});
			db.close();
		});
	},
	deleteCharacter: function (character, callback){
		MongoClient.connect(dbUrl, function(err,db){
			db.collection('characters').remove({"_id": character._id}, function(err, res){
				console.log('deleted character');
				callback();
			});
			db.close();
		});
	}
}