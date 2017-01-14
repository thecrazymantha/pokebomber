/* Structure
{
  _id: #,
  players: [
    {
      userID: #,
      poke : #,
      rdy : true/false,
    }, {...}
  ],
  
} */

Picks = new Mongo.Collection('picks');

Meteor.methods({
  pick : function(postAttributes) {
    var pick = Picks.findOne({'players.userID': Meteor.userId()});
    for (var p in pick.players){
      if (pick.players[p].userID == Meteor.userId()){
        if (pick.players[p].rdy)
          return false;
      }
    }
    
    if(Meteor.isServer){      
      Picks.update({'_id' : pick._id, 'players.userID': Meteor.userId()}, {$set: {
        "players.$.rdy" : true,
        "players.$.poke" : postAttributes.poke,
      }});
    }
  }
});