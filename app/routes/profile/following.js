import Ember from 'ember';

var ProfileFollowingRoute = Ember.Route.extend({
	model: function(params)
	{
		return this.store.find("user", {followedBy: params.user_id});
	}
});

export default ProfileFollowingRoute;