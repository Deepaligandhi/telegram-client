import Ember from 'ember';

var ProfileRoute = Ember.Route.extend({
	actions: {
		follow: function(user) {
			user.setProperties( {
				followedByCurrentUser: true,
				meta: {
					operation: 'followUser'
				}
			});
			user.save().then(
			function() {
    		}, function(response) {
         		console.log(response.statusCode); // 404
  				console.log(response.responseText); // 'Error message as string'
        	});
		},
		
		unfollow: function(user) {
			user.setProperties( {
				followedByCurrentUser: false,
				meta: {
					operation: 'unfollowUser'
				}
			});
			user.save().then(
			function() {
    		}, function(response) {
         		console.log(response.statusCode); // 404
  				console.log(response.responseText); // 'Error message as string'
        	});
		}
	}
});

export default ProfileRoute;
