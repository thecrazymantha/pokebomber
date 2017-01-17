import { Meteor } from 'meteor/meteor';

var dt = 10;
var waitingM1 = [];

Meteor.startup(() => {
  Meteor.setInterval(GameLoop, dt);
  Meteor.setInterval(CheckGo, dt);
});

// --- MatchMaking --- //
function CheckGo() {
  // Mode 1
  var players = Queue.find({"mode": 1}, {sort:{'timeEnter': 1}}).fetch();
  if (players.length >= 2){
    for (var i = 0; i < players.length/2; i++){
      var pls = [];
      for (var j = 2*i; j < 2*i +2; j++){
        pls.push({
          userID: players[j].userID,
          userName: players[j].userName,
          poke : "001",
          rdy : false,
        });
        Queue.remove(players[j]._id);
      }
      
      Picks.insert({
        players : pls
      });
      
    }
  }
  
  // Check Start Game
  var picks = Picks.find().fetch();
  for(var pr in picks){
    var isRDY = true;
    for (var p in picks[pr].players){
      if (!picks[pr].players[p].rdy){
        isRDY = false;
      }
    }
    
    if (isRDY){
      var gameID = Games.insert({
        time : 0,
        map : [
          [17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
          [17, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9,17],
          [17,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,16,17],
          [17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17]
        ],
        wall  : [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        block : [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
          [0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0],
          [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
          [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
          [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
          [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
          [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
          [0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0],
          [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
		ended : false,
		player : [picks[pr].players[0].userID, picks[pr].players[1].userID],
      });
      
      var p1 = Players.insert({
        userID : picks[pr].players[0].userID,
        gameID : gameID,
        pokeID : picks[pr].players[0].poke,
        lastX : 1,
        lastY : 1,
        x : 1,
        y : 1,
        nextX : 1,
        nextY : 1,
        speed : 0.05,
        alive : true,
        orient: 2
      });
      
      var p2 = Players.insert({
        userID : picks[pr].players[1].userID,
        gameID : gameID,
        pokeID : picks[pr].players[1].poke,
        lastX : 15,
        lastY : 9,
        x : 15,
        y : 9,
        nextX : 15,
        nextY : 9,
        speed : 0.05,
        alive : true,
        orient: 2
      });
      
      Picks.remove(picks[pr]._id);
    }
  }
}


function GameLoop () {
  updateEndGame();
  updateBombes();
  updatePlayers();
}

function updateEndGame(){
  var games = Games.find({"ended": false}).fetch();

  for (var g in games){
	  var players = Players.find({"gameID": games[g]._id, "alive": true}).fetch();

	  if (players.length == 1){
		Games.update(games[g]._id, {$set:{
		  "ended" : true,
		  "winner" : players[0]._id,
		}});
	  }
  }
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
  
  hit(game, bombe.x, bombe.y);
  
  // Explosion Top
  var ended = false;
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
  for (var p in players){
    if (Math.round(players[p].x) == x && Math.round(players[p].y) == y){
      Players.update(players[p]._id, {$set:{
          "alive" : false
        }

      });

    }
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
