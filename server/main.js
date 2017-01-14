import { Meteor } from 'meteor/meteor';

var dt = 10;

Meteor.startup(() => {
  Meteor.setInterval(GameLoop, dt);
});

function GameLoop () {
  updateBombes();
  updatePlayers();
}

// --- BOMBES --- //
function updateBombes(){
  // Pour chaque Bombe
  var bombes = Bombes.find().fetch();
  for (var b in bombes){
    // Decrease timer
    var newTime = bombes[b].time - dt/1000;
    if (newTime <= 0){
      boum(bombes[b]);
    } else {
      Bombes.update(bombes[b]._id, {$set:{"time":newTime}});
    }
  }
}

function boum(bombe){
  Bombes.remove(bombe._id);
  console.log("Boum !");
  var game = Games.findOne(bombe.gameID);
  var rMax = 2;
  var rTop = rBot = rL = rR = 1;
  var ended = false;

  // Explosion Top
  while (!ended && rTop <= rMax){
    if (hit(game, bombe.x, bombe.y - rTop)){
      ended = true;
    }
    rTop ++;
  }

  // Explosion Left
  ended = false;
  while (!ended && rL <= rMax){
    if (hit(game, bombe.x - rL, bombe.y)){
      ended = true;
    }
    rL ++;
  }

  // Explosion Bot
  ended = false;
  while (!ended && rBot <= rMax){
    if (hit(game, bombe.x, bombe.y + rBot)){
      ended = true;
    }
    rBot ++;
  }

  // Explosion Rigth
  ended = false;
  while (!ended && rR <= rMax){
    if (hit(game, bombe.x + rR, bombe.y)){
      ended = true;
    }
    rR ++;
  }
}

function hit(game, x, y){
  // Vérification Map
  if (x <= 0 || x >= 15 || y <= 0 || y >= 9) return true;

  // Vérification Mur
  if (game.wall[y][x]) return true;

  // Casse Brique ?
  if (game.block[y][x]){
    game.block[y][x] = 0;
    Games.update(game._id, {$set: {"block":game.block}});
    return true;
  }

  // Other Ball ?
  var bombes = Bombes.find({"gameID": game._id}).fetch();
  for (var b in bombes){
    if (bombes[b].x == x && bombes[b].y == y){
      boum(bombes[b]);
      return true;
    }
  }

  // Players
  var players = Players.find({"gameID": game._id, "alive": true}).fetch();
  var countAlive = 0;
  for (var p in players){
    if (Math.round(players[p].x) == x && Math.round(players[p].y) == y){
      Players.update(players[p]._id, {$set:{
          "alive" : false
        }

      });

    }
    countAlive ++;
  }

  if (countAlive <= 1){
    Games.update(game._id, {$set:{
      "ended" : true
    }});

    console.log("t'es mort");
    game.init();

  }

  return false;
}

// --- PLAYERS --- //
function updatePlayers(){
  // pour chaque player
  var players = Players.find().fetch();
  for(var p in players){
    // En mouvement ?
    var moveX = players[p].nextX - players[p].lastX;
    var moveY = players[p].nextY - players[p].lastY;

    if (moveX != 0){
      players[p].x += players[p].speed*moveX;

      if (Math.abs(players[p].nextX - players[p].x) <= players[p].speed/2){
        players[p].x = players[p].lastX = players[p].nextX;
      }
    }

    if (moveY != 0){
      players[p].y += players[p].speed*moveY;

      if (Math.abs(players[p].nextY - players[p].y) <= players[p].speed/2){
        players[p].y = players[p].lastY = players[p].nextY;
      }
    }


    Players.update(players[p]._id, {$set:{
      x : players[p].x,
      y : players[p].y,
      lastX : players[p].lastX,
      lastY : players[p].lastY
    }});
  }
}
