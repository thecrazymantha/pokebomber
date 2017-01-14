/* Structure
{
  _id : #,
  userID : #,
  userName : "",
  timeEnter : #,
  mode : #,
} */

Queue = new Mongo.Collection('queue');

Meteor.methods({
  goToQueue : function(postAttributes) {
    // Is already in Queue
    var isInQueue = Queue.find({"userID" : Meteor.userId()}).count() != 0;
    if (isInQueue){
      console.log("Vous êtes déjà inscrit.");
      return false;
    }
    if (Meteor.isServer){
      var userName = Meteor.users.findOne(Meteor.userId()).username;
      Queue.insert(
      {
        userID : Meteor.userId(),
        userName : userName,
        timeEnter : new Date(),
        mode : postAttributes.mode
      })
    }
    console.log("ok");
  }
});