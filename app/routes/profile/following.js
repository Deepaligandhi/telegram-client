import Ember from 'ember';

var ProfileFollowingRoute = Ember.Route.extend({
	model: function() {
		return this.store.find("user", {followedByCurrentUser: true});
	}
});

export default ProfileFollowingRoute;

