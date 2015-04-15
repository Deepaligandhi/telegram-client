import Ember from 'ember';

var ProfileController =  Ember.Controller.extend({

  authentication: Ember.inject.service('authentication'),
   
  actions: {
  		logout: function() {
			this.get('authentication').set('authenticatedUser', null);
			this.store.unloadAll('user');
			this.transitionToRoute('home.login');
		}
  }		
});

export default ProfileController;