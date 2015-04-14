import Ember from 'ember';

var ProfileFollowersRoute = Ember.Route.extend({
	model: function() {
		var userId = this.modelFor('profile').get('id');
		return this.store.find("user", {follows: userId});
	}
});

export default ProfileFollowersRoute;

