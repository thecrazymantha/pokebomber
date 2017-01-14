Meteor.publish('games', function() {
  var p = Players.findOne({userID : 0});
  return Games.find(p.gameID);
});

Meteor.publish('bombes', function() {
  var p = Players.findOne({userID : 0});
  return Bombes.find({"gameID":p.gameID});
});

Meteor.publish('players', function() {
  var p = Players.findOne({userID : 0});
  return Players.find({"gameID":p.gameID});
});