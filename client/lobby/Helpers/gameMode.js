Template.gamemode.events({
  'click #mode1' (event){
    event.preventDefault();
    Meteor.call('goToQueue', {mode: 1}, function(error, result) {});
  }
})