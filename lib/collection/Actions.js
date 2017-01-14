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
      if (postAttributes.userID != Meteor.userId())
        return false;
      
      var player = Players.findOne({"userID" : postAttributes.userID});
      var game = Games.findOne(player.gameID); // A changer par mongo.user
      if (!game) return false;
      
      if (Meteor.isServer) {
        // Vérification Bombe
        if (postAttributes.bombe && checkFree(Math.round(player.x), Math.round(player.y), game)){
          Bombes.insert({
            gameID: game._id,
            userID: Meteor.userId(),
            x: Math.ceil(player.x),
            y: Math.ceil(player.y),
            time: 3
          });
        } else {
          postAttributes.bombe = false;
        }
      }
      
      
      // Orientation
      if (postAttributes.axeX == 1) player.orient = 3;
      if (postAttributes.axeX == -1) player.orient = 1;
      if (postAttributes.axeY == 1) player.orient = 2;
      if (postAttributes.axeY == -1) player.orient = 0;
      
      var currentMX = player.nextX - player.lastX;
      var currentMY = player.nextY - player.lastY;
      
      // New move ?
      if (currentMX == 0 && currentMY == 0){
        // Calcule de la destination
        var newX = player.lastX + postAttributes.axeX;
        var newY = player.lastY + postAttributes.axeY;
        
        // Vérification Déplacement
        if (!checkFree (newX, newY, game)){
          return false;
        }
        
        Players.update(player._id, {$set:{
          "nextX" : newX,
          "nextY" : newY,
          "orient" : player.orient
        }});
        
        return true;
      }
      
      // Check move dir
      if (currentMX != 0 && postAttributes.axeX == 0) return false;
      if (currentMY != 0 && postAttributes.axeY == 0) return false;
      
      // Keep in move
      var keepMX = currentMX == postAttributes.axeX;
      var keepMY = currentMY == postAttributes.axeY;
      
      // Switch move
      if (!keepMX || !keepMY){
        Players.update(player._id, {$set:{
          "nextX" : player.lastX,
          "nextY" : player.lastY,
          "lastY" : player.nextY,
          "lastX" : player.nextX,
          "orient" : player.orient
        }});
        
        return true;
      }
      
      /*     
      
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
      }*/
    }
});

function checkFree (x,y,game){
  // vérification actions
  var isOK = true;
  var xMax = 15;
  var yMax = 9;
  
  // Sortie de map ?
  if ( x < 1 ) return false;
  if ( x > xMax )  return false;
  if ( y < 1 )  return false;
  if ( y > yMax )  return false;
  
  var block = game.block;
  var wall = game.wall;
  
  // Vérification bombe
  var bombes = Bombes.find({"gameID":game._id}).fetch();
  for (var b in bombes){
    isOK = isOK && !(x == bombes[b].x && y == bombes[b].y);
  }
  
  // Vérification Map
  isOK = isOK && !block[y][x] && !wall[y][x];

  return isOK;
}