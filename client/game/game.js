Template.game.onRendered(function(){
  Game();
});

Game = function (){
  var data;
  var players;
  var balls;
  
  // Canvas
  var layer1 = document.querySelector("#L_fixe");
  var layer2 = document.querySelector("#L_move");
  
  var ground = layer1.getContext("2d");
  var ctx = layer2.getContext("2d");
  
  // Tileset
  var tileset;
  var tileSize = 16;
  var objSize = tileSize * 2;
  
  var pokeball;    
  var pokeTiles = [];
  
  
  // Game Mechanics
  var inputState;
  var inputBombe = false;
  
  // Methodes
  function init () {
    // Chargement des ressources
    data = Games.findOne();
    players = Players.find().fetch();
    
    var ressources = [];
    ressources.push({
      img : new Image(),
      src : "ressources/img/tiles/grass_00.png"
    });
    
	ressources.push({
      img : new Image(),
      src : "ressources/img/pokemons/pokeball.png"
    });
	
    tileset = ressources[0].img;
    pokeball = ressources[1].img;
    
    for (var p in players){
      ressources.push({
        img : new Image(),
        src : "ressources/img/pokemons/" + players[p].pokeID + ".png"
      });
      pokeTiles[p] = ressources[ressources.length -1].img;
    }
    
    Loader(ressources, [drawMap]);
    
    // Keys listener
    window.addEventListener('keydown', function(event){  
      if (event.keyCode === 37) {  
        inputState = 37;
        
      } else if (event.keyCode === 38) {  
        inputState = 38;
        
      } else if (event.keyCode === 39) {  
        inputState = 39;
        
      } else if (event.keyCode === 40) {  
        inputState = 40;
        
      }  else if (event.keyCode === 32) {  
        inputBombe = true;
        
      }
    }, false);  
 
    window.addEventListener('keyup', function(event){  
      if (event.keyCode === inputState) {  
        inputState = false;   
      } else if (event.keyCode === 32) {  
        inputBombe = false;  
      }
      
    }, false);   
    
  }
  
  function controlHandler () {
    // Move
    if (!inputState && !inputBombe) return;
    
    var action = {
      gameID : data._id,
      userID : Meteor.userId(),
      axeX : 0,
      axeY : 0,
      bombe: inputBombe
    };
    
    if (inputState != false){
      switch (inputState){
        case 37: action.axeX -= 1; break; // Left
        case 38: action.axeY -= 1; break; // Up
        case 39: action.axeX += 1; break; // Right
        case 40: action.axeY += 1; break; // Down
      }
    }    
    
    var act = action.axeX != 0 || action.axeY != 0 || action.bombe;

    if (act){
      // console.log(action);
      Meteor.call('actionInsert', action, function(error, result) {
      // affiche l'erreur à l'utilisateur et s'interrompt
        if (!result){
          console.log("Erreur envoie action !");
        } else {
          // console.log(result._id);
        }
      });
    }
  }
  
  var drawMap = function() {
    layer1.width = data.map[0].length * tileSize;
    layer1.height = data.map.length * tileSize;
    
    layer2.width = layer1.width;
    layer2.height = layer1.height;
    
    for (var r in data.map){
      for (var c in data.map[r]){
        var tile = data.map[r][c];
        var tbl = tileset.width / tileSize;
        var tileRow = (tile / tbl) | 0;
        var tileCol = (tile % tbl) | 0;
        
        ground.drawImage(tileset, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
      }
    }
    
    drawWall();
  }
  
  var drawWall = function () {
    for (var r in data.wall){
      for (var c in data.wall[r]){
        if (data.wall[r][c]){
          ground.drawImage(tileset, 48, 0, objSize, objSize, (c * objSize), (r * objSize), objSize, objSize);
        }
      }
    }
    
    gameLoop();
  }
  
  var drawBlock = function () {
    for(var r in data.block){
      for (var c in data.block[r]){
        if (data.block[r][c]){
          ctx.drawImage(tileset, 80, 0, objSize, objSize, (c * objSize), (r * objSize), objSize, objSize);
        }
      }
    }
  }
  
  var drawPoke = function () {
    for (var p in players){
      if (players[p].alive)
        ctx.drawImage(pokeTiles[p], 0, players[p].orient * objSize, objSize, objSize, (players[p].x * objSize), (players[p].y * objSize), objSize, objSize);
    }
  }

  var drawBall = function () {
	  for (var b in balls){
		  ctx.drawImage(pokeball, 0,0, 40,40, balls[b].x * objSize, balls[b].y * objSize, objSize, objSize);
	  }
  }
  
  var gameLoop = function() {  
    data = Games.findOne();
    balls = Bombes.find().fetch();
    players = Players.find().fetch();
    
    ctx.clearRect(0,0, layer2.width, layer2.height);
    
    drawBlock ();
    drawBall ();
    drawPoke ();
    
    // check moves
    controlHandler();
    
    requestAnimationFrame(gameLoop);
  }
  
  init();
}