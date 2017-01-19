// on the client
Template.playerStats.onRendered(function(){
  var games = 0;
  $.ajax({
    url: 'http://localhost:3000/player/'+Meteor.userId(),
    type: 'GET',
    dataType:'json',
    success:function(data){

      $.map(data, function(el) {
        console.log(el);

      });
      document.querySelector('#nbgames').innerHTML = data.length;
      games = parseInt(data.length);
    }
  });
  $.ajax({
    url: 'http://localhost:3000/player/'+Meteor.userId()+'/winrate',
    type: 'GET',
    dataType:'json',
    success:function(data){
      $.map(data, function(el) {
        console.log(el);
      });
      document.querySelector('#wins').innerHTML = data.length;
      var winrate = parseInt(((data.length/games)*100));
      document.querySelector('#winrate').innerHTML = winrate;
      document.querySelector('#winrate').style = "width:"+winrate+"%";
    }
  });

});
