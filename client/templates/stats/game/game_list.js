Template.gameList.onRendered(function(){
  $.ajax({
    url: 'http://localhost:3000/games/',
    type: 'GET',
    dataType:'json',
    success:function(data){
      $.map(data, function(el) {
        var li = document.createElement("a");
        li.appendChild(document.createTextNode(el._id));
        document.querySelector('#gameslist').appendChild(li);
        li.classList.add("list-group-item");
        li.classList.add("voir");
      });
    }
  });
});


// on the client

Template.gameList.events({
  'click .voir': function(e) {
    e.preventDefault();

    //méthode REST
    var gameId = e.currentTarget.innerHTML;
    var timeUrl="http://localhost:3000/games/"+gameId+"/time";
    var winnerUrl="http://localhost:3000/games/"+gameId+"/winner";

    // requête sur le temps

    $.ajax({
      url: timeUrl,
      type: 'GET',
      dataType:'json',
      success:function(data){
        $.map(data, function(el) {
          time=el.time;
        });
        document.querySelector('#time').innerHTML = time;
      }
    });
    //requête pour le gagnant
    $.ajax({
      url: winnerUrl,
      type: 'GET',
      dataType:'json',
      success:function(data){
        $.map(data, function(el) {
          winner = el.username;
        });
        document.querySelector('#winner').innerHTML = winner;
      }
    });


    //Méthode Meteor
    //Meteor a concerver la partie dans la varible this
    /*
    document.querySelector('#time').innerHTML = this.time;
    document.querySelector('#winner').innerHTML = this.winner;
    */

  }

});
