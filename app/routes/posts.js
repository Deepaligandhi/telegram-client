import Ember from 'ember';

var PostsRoute = Ember.Route.extend({
	authentication: Ember.inject.service(),
	beforeModel: function() {
		if (!this.get('session.user')) {
			this.transitionTo('home.login');
		}
	},
	model: function() {
		return this.store.find("post", {dashboard: true});
	},
	setupController: function(controller, model) {
   this._super(controller, model);
   controller.set('users', this.store.find('user'));
  }
});

export default PostsRoute;
