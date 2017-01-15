Template.picksRoom.helpers( {
  "picksRdy": function(){
    return Queue.find().count() == 0;
  },
  "pokemon": function(){
    return Pokemons.find();
  },
  "isRdy": function() {
    var pick = Picks.findOne();
    
    if (pick == null) return false;
    
    for (var p in pick.players){
      if (pick.players[p].userID == Meteor.userId()){
        return pick.players[p].rdy;
      }
    }
    return false;
  },
  "allRdy": function () {
    return Games.find().count() != 0;
  },
  "players": function() {
    var pick = Picks.findOne();
    
    if (pick == null) return false;
    
    return pick.players;
  }
});

Template.picksRoom.events({
  'click .pokepicker' (event) {
    event.preventDefault();
    $('.carousel-item').each(function (i){
      var item = $(this)[0];
      if (item.style.opacity == 1){
        console.log(item.children.num.value);
        Meteor.call("pick", {poke : item.children.num.value});
      }
    });
  },
})

Template.pokeCard.onRendered( function() {
   $(document).ready(function(){
       $('.carousel').carousel({dist: -150, shift: 10});
    });
});

Template.picksList.helpers({
  'pokeNom' : function (){
  return Pokemons.findOne({"num": this.poke}).nom;
  }
})