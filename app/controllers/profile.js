import Ember from 'ember';

var ProfileController =  Ember.Controller.extend({

authentication: Ember.inject.service('authentication'),
   
  actions: {
		
		logout: function() {
			this.get('authentication').set('authenticatedUser', null);
			this.store.unloadAll('user');
			this.transitionToRoute('home.login');
		},
		
		follow: function() {
			var userId = this.get('model.id');
			var controller = this;		
			var followUser = this.store.push('user', {
				id: userId,
				followedByCurrentUser: true,
				meta: {
					operation: 'followUser'
				}
			});
			followUser.save().then(
			function(user) {
				controller.get('model').addObject(user);
    		}, function(response) {
         		console.log(response.statusCode); // 404
  				console.log(response.responseText); // 'Error message as string'
        	});
		},
		
		unfollow: function() {
			var userId = this.get('model.id');
			var controller = this;	
			var unfollowUser = this.store.push('user', {
				id: userId,
				followedByCurrentUser: false,
				meta: {
					operation: 'unfollowUser'
				}
			});
			unfollowUser.save().then(
			function(user) {
				controller.get('model').removeObject(user);
    		}, function(response) {
         		console.log(response.statusCode); // 404
  				console.log(response.responseText); // 'Error message as string'
        	});
		}
  }		
});


export default ProfileController;