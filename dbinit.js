var users = [{name: 'test', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'test1', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'test2', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'test3', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'test4', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'test5', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'test6', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'shiva', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'jimmy', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'pandorabc', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'sym', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'ecu', password: '', isLoggedIn: false, lastActivity: ''},
            {name: 'lyre', password: '', isLoggedIn: false, lastActivity: ''}];
var chars = [];
var races = [{name: 'Human', description: 'They do human stuff, pretty normal doods.  Apparently they say poot.'}, 
            {name: 'Orc', description: 'Green and nasty, they smash good and not good much else.'},
            {name: 'Goblin', description: 'Stuff about goblins.'}, 
            {name: 'Gnome', description: 'Lots of words and things that describe gnomes.'}, 
            {name: 'Undead', description: 'A few quick remarks about what undead people do.'}, 
            {name: 'Half-Orc', description: 'Insert joke here about half-orcs.'},  
            {name: 'Elf', description: 'Fancy guys that like trees and nature and stuff.  You know the ones.'}];
var classes = [{name: 'Warrior', description: 'Chop chop.'}, {name: 'Rogue', description: 'Sneaky chop.'}, 
            {name: 'Mage', description: 'Magic... chop?'}, {name: 'Priest', description: "Anti-chop."}];

var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/test';

MongoClient.connect(dbUrl, function(err, db) {
    users.forEach(function(user){
        db.collection('users').insert(user);
    });
    races.forEach(function(race){
        db.collection('races').insert(race);
    });
    classes.forEach(function(cl){
        db.collection('classes').insert(cl);
    });
    var use = db.collection('users').find();
    use.forEach(function(user){
        console.log(user.name);
    });
    var r = db.collection('races').find();
    r.forEach(function(race){
        console.log(race.name);
    });
    var c = db.collection('classes').find();
    c.forEach(function(cla){
        console.log(cla.name);
    });
    db.close();
});