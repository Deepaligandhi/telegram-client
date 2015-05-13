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
        data: {user : { meta: { operation: 'logout' } } },
        success: function(){
          self.get('session').set('user', null);
          self.store.unloadAll('post');
          self.store.unloadAll('user');
          self.transitionTo('home.login');
         },
        dataType: 'json'
      });
    },
  }
});
