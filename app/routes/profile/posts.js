import Ember from 'ember';

var ProfilePostsRoute = Ember.Route.extend({
	model: function(){
		var userId = this.modelFor('profile').get('id');
		return this.store.find("post", {author: userId});
	}
});

export default ProfilePostsRoute;