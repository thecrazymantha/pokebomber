Meteor.publish('games', function() {
  var p = Players.findOne({userID : this.userId});
  if (p == null) return Games.find(0);
  
  return Games.find(p.gameID);
});

Meteor.publish('bombes', function() {
  var p = Players.findOne({userID : this.userId});
  return Bombes.find({"gameID":p.gameID});
});

Meteor.publish('players', function() {
  var p = Players.findOne({userID : this.userId});
  return Players.find({"gameID":p.gameID});
});

Meteor.publish('queues', function() {
  return Queue.find({"userID":this.userId});
});

Meteor.publish('picks', function() {
  return Picks.find({"players.userID":this.userId});
});

Meteor.publish('pokemons', function() {
  return Pokemons.find();
});