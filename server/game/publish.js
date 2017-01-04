Meteor.publish('games', function() {
  return Games.find({"player.userID" : 0});
});