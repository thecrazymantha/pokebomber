/*Application Route*/
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/',
{name: 'game',
waitOn: function(){
  return [
    Meteor.subscribe('games'),
    Meteor.subscribe('players'),
    Meteor.subscribe('bombes')
  ];
}
}
);

Router.route('/games_stat',
{
  name: 'gamesstat',
});
Router.route('/gameStats',
{
  name: 'gameStats',
});
Router.route('/playerStats',
{
  name: 'playerStats',
});
Router.route('/rank',
{
  name: 'rank',
});

/*API REST*/
/* Autour de la collection GAMES */
Router.map(function () {
  this.route('games', {
    path: '/games',
    where: 'server',
    action: function () {
      var json = Games.find().fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('games_time', {
    path: '/games/:idgame/time',
    where: 'server',
    action: function () {
      var json = Games.find(this.params.idgame, {fields: {_id:0, time:1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });
  
  this.route('games_winner', {
    path: '/games/:idgame/winner',
    where: 'server',
    action: function () {
      var json = Games.find(this.params.idgame, {fields: {_id:0, winner:1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('games_map', {
    path: '/games/:idgame/map',
    where: 'server',
    action: function () {
      var json = Games.find(this.params.idgame, {fields: {_id: 0, map: 1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('games_wall', {
    path: '/games/:idgame/wall',
    where: 'server',
    action: function () {
      var json = Games.find(this.params.idgame, {fields: {_id: 0, wall: 1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('games_block', {
    path: '/games/:idgame/block',
    where: 'server',
    action: function () {
      var json = Games.find(this.params.idgame, {fields: {_id: this.params.idgame, block: 1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('player', {
    path: '/player/:iduser',
    where: 'server',
    action: function () {
      id = parseInt(this.params.iduser);
      var json = Players.find({userID:id}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

});
