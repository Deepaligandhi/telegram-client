import Ember from 'ember';

var ProfileFollowersRoute = Ember.Route.extend({
	model: function() {
		return this.store.find("user", {followedByCurrentUser: true});
	}
});

export default ProfileFollowersRoute;

