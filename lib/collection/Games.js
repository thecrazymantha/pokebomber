/* Structure:
{
  _id   : #,
  time  : # ,               => Temps de la dernière mise à jour Serveur
  map   : [                 => Le sol
    [#,#,#, ... ],
    [#,#,#, ... ]
  ],
  wall  : [                 => Les murs incassable
    { x:#, y:# },
    { x:#, y:# }
  ],
  block : [                 => Les briques cassable
    { x:#, y:# },
    { x:#, y:# }
  ],
  player: [
    {
      userID : #,
      pokeID : #,
      x : #,
      y : #,
      alive : true/false,
      move : true/false
    },
    {
      userID : #,
      pokeID : #,
      x : #,
      y : #,
      alive : true/false,
      move : true/false
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