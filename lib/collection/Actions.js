/* Structure
{
  _id : #,
  gameID : #,
  userID : #,
  time : #,                     => L'heure à la reception 
  axeX : #,
  axeY : #,
  bombe: true/false
}
*/

Actions = new Mongo.Collection('actions');

Meteor.methods({
    actionInsert: function(postAttributes) {
      //var user = Meteor.user();
        /*check(this.userId, String);
        check(postAttributes, {
            gameID: String,
            axeX: int,
            axeY: int,
            bombe: boolean
        });*/
      
      var speed = 0.1;
      var xMax = 15;
      var yMax = 9;
      
      var game = Games.findOne({"player.userID": postAttributes.userID}); // A changer par mongo.user
      if (!game) return false;
      
      // vérification actions
      var isOK = false;
      
      var player;
      for (var p in game.player){
        if (game.player[p].userID == 0){
          player = game.player[p];
        }
      }
      
      var block = game.block;
      var wall = game.wall;
      
      var newX = Math.ceil(player.x + postAttributes.axeX*speed);
      var newY = Math.ceil(player.y + postAttributes.axeY*speed);
      
      console.log(player.x + ", " + player.y);
      console.log(newX + ", " + newY);
      
      if (!block[newY][newX] && !wall[newY][newX]){
        player.x += postAttributes.axeX*speed;
        player.y += postAttributes.axeY*speed;
      } else {
        if (postAttributes.axeX != 0)
          player.x = Math.ceil(player.x);
        
        if (postAttributes.axeY != 0)
        player.y = Math.ceil(player.y);
      }
      
      // Sortie de map ?
      if ( player.x < 1) player.x = 1;
      if ( player.x > xMax) player.x = xMax;
      if ( player.y < 1) player.y = 1;
      if ( player.y > yMax) player.y = yMax;
      
      
      // Orientation
      if (postAttributes.axeX == 1) player.orient = 3;
      if (postAttributes.axeX == -1) player.orient = 1;
      if (postAttributes.axeY == 1) player.orient = 2;
      if (postAttributes.axeY == -1) player.orient = 0;
      
      if (Meteor.isServer) {

        var action = _.extend(postAttributes, {
            time: new Date()
        });

        var action = Actions.insert(action);
        Games.update(game._id,{
            $set: { "player.0": player}
          }
        );
        
        return {
            _id: action
        };
      }
    }
});