

Template.menu.helpers({
    isCurrentPage: function(pageName){
    
        return Router.current().route.getName() == pageName
    }
});
Template.menu.events({
    'click li': function(e){
      //console.log($(e.currentTarget).attr("class"));
    //  $(e.currentTarget).attr("class")="active";
    }
});
