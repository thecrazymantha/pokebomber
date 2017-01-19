// on the client
Template.stats.onRendered(function(){
  console.log("test");
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
});
