import Ember from 'ember';

var PostsRoute = Ember.Route.extend({
	authentication: Ember.inject.service(),
	beforeModel: function() {
		if (!this.get('authentication.authenticatedUser')) {
			this.transitionTo('home.login');
		}
	},
	model: function() {
		return this.store.find("post", {dashboard: true});
	}
});

export default PostsRoute;
