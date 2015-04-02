import Ember from 'ember';

var HomeLoginController = Ember.Controller.extend({
	authentication: Ember.inject.service(),
	actions: {
		login: function() {
			var username = this.get('username');
			var password = this.get('password');
			var name = this.get('name');
			var controller = this;
			var newUser = this.store.createRecord('user', {
				id: username,
				password: password,
				name: name,
				operation: 'login'
			});
			newUser.save().then(function(user) {
				controller.get('authentication').set('authenticatedUser', user);
    	  		controller.transitionToRoute('posts');
    		}, function(response) {
         		console.log(response.statusCode); // 404
  				console.log(response.responseText); // 'Error message as string'
        	});
	},
	}
});


export default HomeLoginController;
