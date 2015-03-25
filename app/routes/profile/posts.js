import Ember from 'ember';

var ProfilePostsRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find("post", {author: params.user_id});
	}
});

export default ProfilePostsRoute;