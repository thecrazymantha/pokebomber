/*Application Route*/
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
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
	onBeforeAction: function(){
		if (Games.find().count() == 0)
			this.redirect('/');
		this.next();
	},
	waitOn: function(){
		return [
      Meteor.subscribe('games'),
      Meteor.subscribe('players'),
      Meteor.subscribe('bombes')
    ];
	}
 }
);

Router.route('/stats',
{
  name: 'stats',
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
