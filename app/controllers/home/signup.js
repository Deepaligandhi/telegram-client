import Ember from 'ember';

var HomeSignupController = Ember.Controller.extend({
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
			var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

			if (!regex.test(email)) {
				return (this.set('error', 'Please enter a valid email'));
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
				name: name,
				email: email,
				meta: {
					password: md5(password),
					operation: 'signup'
				}
			});
			newUser.save().then(function(user) {
				controller.set('session.user', user);
				controller.set('username', '');
				controller.set('password', '');
				controller.set('email', '');
				controller.set('name', '');
				controller.transitionToRoute('posts');
			}, function(response) {
				console.log(response.statusCode); // 404
				console.log(response.responseText); // 'Error message as string'
				var errText = response.responseText;
				return (controller.set('error', errText));
			});
		}
	}
});

export default HomeSignupController;
