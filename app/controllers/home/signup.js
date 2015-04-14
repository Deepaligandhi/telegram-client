import Ember from 'ember';

var HomeSignupController = Ember.Controller.extend({
	authentication: Ember.inject.service(),
	username: '',
	password: '',
	name: '',
	email: '',
	error: '',
	
	actions: {

		signup: function() {
			this.set('error', null);
			var name = this.get('name');
			var email = this.get('email');
			if (!email) {
				return (this.set('error', 'Email cannot be blank! Please enter a valid email'));
			}
			var username = this.get('username');
			if (!username) {
				return (this.set('error', 'Username cannot be blank! Please enter your username'));
			}
			var password = this.get('password');
			if (!password) {
				return (this.set('error', 'Password cannot be blank! Please enter your password'));
			}
			var controller = this;
			var newUser = this.store.createRecord( 'user', {
				id: username,
				password: password,
				name: name,
				email: email,
				meta: {
					operation: 'signup'
				}
			});
			newUser.save().then(function(user) {
    	  		controller.get('authentication').set('authenticatedUser', user);
    	  		controller.transitionToRoute('posts');
    		}, function(response) {
         		console.log(response.statusCode); // 404
  				console.log(response.responseText); // 'Error message as string'
        	});
		}
	}
});


export default HomeSignupController;
