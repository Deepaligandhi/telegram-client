import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service('authentication'),

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
      this.get('authentication').set('authenticatedUser', null);

      var self = this;
      Ember.$.get('/api/logout')
       .done(function(){
         self.get('session').set('user', null);
         self.store.unloadAll('post');
         self.store.unloadAll('user');
         self.transitionTo('home.login');
        });
    },
  }
});
