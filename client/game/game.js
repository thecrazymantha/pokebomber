Template.game.onRendered(function(){
  Game();
});

Game = function (){
  // var data = Games.find({player.userID : Meteor.userID}).fetch()[0];
  var data;
  
  // Canvas
  var layer1 = document.querySelector("#L_fixe");
  var layer2 = document.querySelector("#L_move");
  
  var ground = layer1.getContext("2d");
  var ctx = layer2.getContext("2d");
  
  // Tileset
  var tileset;
  var tileSize = 16;
  var objSize = tileSize * 2;
  
      
  var pokeTiles = [];
  
  
  // Game Mechanics
  var inputState;
  var inputBombe = false;
  
  // Methodes
  function init () {
    // Chargement des ressources
    data = Games.find().fetch()[0];
    
    var ressources = [];
    ressources.push({
      img : new Image(),
      src : "ressources/img/tiles/grass_00.png"
    });
    
    tileset = ressources[ressources.length -1].img;
    
    for (var p in data.player){
      ressources.push({
        img : new Image(),
        src : "ressources/img/pokemons/" + data.player[p].pokeID + ".png"
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
      userID : 0,
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
      console.log(action);
      Meteor.call('actionInsert', action, function(error, result) {
      // affiche l'erreur à l'utilisateur et s'interrompt
        if (!result){
          console.log("error");
        } else {
          console.log(result._id);
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
    for (var p in data.player){
      ctx.drawImage(pokeTiles[p], 0, data.player[p].orient * objSize, objSize, objSize, (data.player[p].x * objSize), (data.player[p].y * objSize), objSize, objSize);
    }
  }

  
  var gameLoop = function() {  
    data = Games.find().fetch()[0];
    ctx.clearRect(0,0, layer2.width, layer2.height);
    drawBlock ();
    drawPoke ();
    
    // check moves
    controlHandler();
    
    requestAnimationFrame(gameLoop);
  }
  
  init();
}