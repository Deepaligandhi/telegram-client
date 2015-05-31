import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var route = this;
    var promise = this.store.find('user', {isAuthenticated: true});
    return promise.then(function(users) {
      if (users && users.get('length') > 0) {
        var user = users.get('firstObject');
        route.set('session.user', user);
      }
      return users;
    });
  },

  actions: {
    logout: function() {
      var self = this;
      Ember.$.ajax({
        type: "POST",
        url: '/api/users',
        data: {user: { meta: { operation: "logout" } } },
        dataType: 'json',
        success: function(){
          self.get('session').set('user', null);
          self.store.unloadAll('post');
          self.store.unloadAll('user');
          self.transitionTo('home.login');
         }
      });
    },

    openModal: function(name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
     });
   },

   closeModal: function() {
     this.disconnectOutlet({
       outlet: 'modal',
       parentView: 'application'
     });
   },
   
   follow: function(user) {
     user.setProperties( {
       followedByCurrentUser: true,
       meta: {
         operation: 'followUser'
       }
     });
     user.save().then(
       function(user) {
         console.log("Followed User:", user);
       }, function(response) {
         console.log(response.statusCode); // 404
         console.log(response.responseText); // 'Error message as string'
       });
     },

     unfollow: function(user) {
       user.setProperties( {
         followedByCurrentUser: false,
         meta: {
           operation: 'unfollowUser'
         }
       });
       user.save().then(
         function(user) {
           console.log("Unfollowed User:", user);
         }, function(response) {
           console.log(response);
           console.log(response.statusCode); // 404
           console.log(response.responseText); // 'Error message as string'
         });
       }

  }
});
