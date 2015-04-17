import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service('authentication'),

  actions: {
    logout: function() {
      this.get('authentication').set('authenticatedUser', null);
      this.store.unloadAll('user');
      this.store.unloadAll('post');
      this.transitionTo('home.login');
    },
  }
});
