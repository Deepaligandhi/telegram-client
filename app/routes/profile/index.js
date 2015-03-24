import Ember from 'ember';

var ProfileIndexRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find("post", {ownedBy: params.user_id});
	}
});

export default ProfileIndexRoute;

