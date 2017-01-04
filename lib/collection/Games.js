/* Structure:
{
  _id   : #,
  time  : # ,               => Temps de la dernière mise à jour Serveur
  map   : [                 => Le sol
    [#,#,#, ... ],
    [#,#,#, ... ]
  ],
  wall  : [                 => Les murs incassable
    [#,#,#, ... ],
    [#,#,#, ... ]
  ],
  block : [                 => Les briques cassable
    [#,#,#, ... ],
    [#,#,#, ... ]
  ],
  player: [
    {
      userID : #,
      pokeID : #,
      x : #,
      y : #,
      alive : true/false,
      orient: #,
      move : true/false
    },
    {
      ...
    }
  ],
  bombe : [
    {
      bombeID : #,
      userID  : #,
      x : #,
      y : #,
      time : #
    },
    {
      bombeID : #,
      userID  : #,
      x : #,
      y : #,
      time : #
    }
  ]
} */

Games = new Mongo.Collection('games');