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
  player: [userId, userId, ... ]
} */

Games = new Mongo.Collection('games');