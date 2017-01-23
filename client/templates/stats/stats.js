// on the client
Template.stats.onRendered(function(){
  console.log("test");
  var pokemons_label = [];
  var pokemons_count = [];
  $.ajax({
    url: 'http://localhost:3000/games',
    type: 'GET',
    dataType:'json',
    success:function(data){
      var totaltime = 0;
      /*Boucle sur l'ensemble des parties*/
      $.map(data, function(el) {
        /*Traitement par partie*/
        totaltime += el.time;
        /*Nombre de parties*/
      });
      document.querySelector('#nbgames').innerHTML = data.length;
      document.querySelector('#averagetime').innerHTML = totaltime/data.length;
    }
  });
  
  $.ajax({
    url: 'http://localhost:3000/pokemons',
    type: 'GET',
    dataType:'json',
    success:function(data){
      var totaltime = 0;
      /*Boucle sur l'ensemble des parties*/
      $.map(data, function(el) {
        pokemons_label[el.num] = el.nom;
        pokemons_count[el.num] = 0;
      });
      $.ajax({
        url: 'http://localhost:3000/players',
        type: 'GET',
        dataType:'json',
        success:function(data){
          var totaltime = 0;
          /*Boucle sur l'ensemble des parties*/
          $.map(data, function(el) {
            pokemons_count[el.pokeID] ++;
          });
          
          var PokePick = " --- ";
          var c = t = 0;
          for (var p in pokemons_count){
			t += pokemons_count[p];
            if (pokemons_count[p] > c){
              c = pokemons_count[p];
              PokePick = pokemons_label[p];
            }
          }
          document.querySelector('#pokenom').innerHTML = PokePick + " [" + c/t*100 + "%]";

        }
      });

    }
  });
  
  
});
