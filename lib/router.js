/*Application Route*/
Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', function (){
  this.layout('lobby');
  this.render('accueil');
});

Router.route('/selectMode', {
  name : 'lobby',
  onBeforeAction: function(){
    
    if (Meteor.userId() == null) this.redirect('/');
    
    this.layout('lobby');
    var isInQueue = Queue.find().count() !=0 || Picks.find().count() !=0 || Games.find().count() != 0;
    if (!isInQueue){
      this.render('gamemode');
    }
    else {
      this.render('picksRoom');
    }
  },
  waitOn: function(){
    return [
      Meteor.subscribe('queues'),
      Meteor.subscribe('picks'),
      Meteor.subscribe('pokemons'),
      Meteor.subscribe('games'),
    ];
  }
});

Router.route('/game', 
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
    path: '/games/time',
    where: 'server',
    action: function () {
      var json = Games.find({}, {fields: {_id: 0, time: 1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('games_map', {
    path: '/games/map',
    where: 'server',
    action: function () {
      var json = Games.find({}, {fields: {_id: 0, map: 1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('games_wall', {
    path: '/games/wall',
    where: 'server',
    action: function () {
      var json = Games.find({}, {fields: {_id: 0, wall: 1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('games_block', {
    path: '/games/block',
    where: 'server',
    action: function () {
      var json = Games.find({}, {fields: {_id: 0, block: 1}}).fetch(); // what ever data you want to return
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });
});
