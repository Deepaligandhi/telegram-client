import Ember from 'ember';

var HomeSignupController = Ember.ObjectController.extend({
	authentication: Ember.inject.service(),

	actions: {

		signup: function() {
			var username = this.get('username');
			var password = this.get('password');
			var name = this.get('name');
			var email = this.get('email');
			var controller = this;
			var newUser = this.store.createRecord( 'user', {
				id: username,
				password: password,
				name: name,
				email: email,
				operation: 'signup'
			});

			newUser.save().then(
       	 		function(user) {
    	  		    controller.get('authentication').set('authenticatedUser', user);
    	  		    controller.transitionToRoute('posts');
    			 },
        		 function(response) {
         			console.log(response.statusCode); // 404
  						console.log(response.responseText); // 'Error message as string'
        		 }
      		);
		}
	}
});


export default HomeSignupController;
