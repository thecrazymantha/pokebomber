Template.menu.helpers({
  isCurrentPage: function(pageName){
    return Router.current().route.getName() == pageName
  }
});
