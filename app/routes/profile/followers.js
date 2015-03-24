import Ember from 'ember';

var ProfileFollowersRoute = Ember.Route.extend({
		model: function(params)
		{
				return this.store.find("user", {follows: params.user_id});
		}
});

export default ProfileFollowersRoute;

