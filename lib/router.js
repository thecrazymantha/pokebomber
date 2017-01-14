Router.route('/', 
	{name: 'game',
	waitOn: function(){
		return [
      Meteor.subscribe('games'),
      Meteor.subscribe('players'),
      Meteor.subscribe('bombes')
    ];
	}});