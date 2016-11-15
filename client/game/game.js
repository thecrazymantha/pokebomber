Template.game.onRendered(function() {
  Game();
});

Game = function (){
  // var data = Games.find({player.userID : Meteor.userID}).fetch()[0];
  var data = Games.find().fetch()[0];
  
  // Canvas
  var layer1 = document.querySelector("#L_fixe");
  var layer2 = document.querySelector("#L_move");
  
  var ground = layer1.getContext("2d");
  var ctx = layer2.getContext("2d");
  
  // Tileset
  var tileset;
  var tileSize = 16;
  var objSize = tileSize * 2;
  
  // Methodes
  function init () {
    // Chargement des ressources
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
      data.player[p].img = ressources[ressources.length -1].img;
    }
    
    Loader(ressources, [gameLoop, drawMap]);
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
    gameLoop();
  }
  
  var drawWall = function () {
    for (var r in data.wall){
      for (var c in data.wall[r]){
        if (data.wall[r][c]){
          ground.drawImage(tileset, 48, 0, objSize, objSize, (c * objSize), (r * objSize), objSize, objSize);
        }
      }
    }
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
      ctx.drawImage(data.player[p].img, 0, data.player[p].orient * objSize, objSize, objSize, (data.player[p].x * objSize), (data.player[p].y * objSize), objSize, objSize);
    }
  }
  
  var gameLoop = function() {
    drawBlock ();
    drawPoke ();
    
    requestAnimationFrame(gameLoop);
  }
  
  init();
}