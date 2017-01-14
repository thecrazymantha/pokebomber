/* Structure
{
  _id : #,
  gameID : #,
  pokeID : #,
  lastX : #,
  lastY : #,
  x : #,
  y : #,
  nextX : #,
  nextY : #,
  speed : #,
  alive : true/false,
  orient: #
}
*/

Players = new Mongo.Collection('players');