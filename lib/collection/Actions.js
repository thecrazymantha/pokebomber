/* Structure
{
  _id : #,
  gameID : #,
  userID : #,
  time : #,                     => L'heure à la reception 
  action : "move"/"bombe",      => L'action demandée
  param  : {                    => Param de l'action move
    from : {x:#, y:#},
    to   : {x:#, y:#}
  }
}
*/