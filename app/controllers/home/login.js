import Ember from 'ember';

var HomeLoginController = Ember.Controller.extend({
	username: '',
	password: '',
	name: '',
	error: '',

	actions: {
		login: function() {
			this.set('error', null);
			var username = this.get('username');
			if (!username) {
				return (this.set('error', 'Username cannot be blank! Please enter your username'));
			}
			var password = this.get('password');

			if (!password) {
				return (this.set('error', 'Password cannot be blank! Please enter your password'));
			}
			var name = this.get('name');
			var controller = this;
			var newUser = this.store.createRecord('user', {
				id: username,
				name: name,
				meta: {
					password: md5(password),
					operation: 'login'
				}
			});
			newUser.save().then(function(user) {
				controller.set('session.user', user);
				controller.set('username', '');
				controller.set('password', '');
				controller.set('name', '');
				controller.transitionToRoute('posts');
			}, function(response) {
				console.log(response.statusCode); // 404
				console.log(response.responseText); // 'Error message as string'
				var errText = response.responseText;
				controller.store.unloadAll('user');
				return (controller.set('error', errText));
			});

		},
	}
});


export default HomeLoginController;
