// on the client

Template.gameItem.events({
  'click .voir': function(e) {
    e.preventDefault();

    //méthode REST
    var gameId=this._id;
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
          winner=el.winner;
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
