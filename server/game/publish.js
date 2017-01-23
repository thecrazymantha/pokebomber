Meteor.publish('games', function() {
  return Games.find({"player" : this.userId, "ended" : false});
});

Meteor.publish('bombes', function() {
  var g = Games.findOne({"player" : this.userId, "ended" : false});
  
  if (g == null) return Bombes.find(0);
  
  return Bombes.find({"gameID" : g._id}, {time: 0});
});

Meteor.publish('players', function() {
  var g = Games.findOne({"player" : this.userId, "ended" : false});
  
  if (g == null) return Players.find(0);
  
  return Players.find({"gameID":g._id});
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