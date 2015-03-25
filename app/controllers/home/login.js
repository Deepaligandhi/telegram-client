import Ember from 'ember';

var HomeLoginController = Ember.ObjectController.extend({
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
		newUser.save().then(
       	 function() {
    	      controller.transitionToRoute('posts');
    	 },
         function(response) {
         	//var response = res.status(404).send('Error message as string');
         	console.log(response.statusCode); // 404
  			console.log(response.responseText); // 'Error message as string'
			
         }
      	);
	},
	}	
});


export default HomeLoginController;