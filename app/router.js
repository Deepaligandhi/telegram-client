import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('home', { path: '/' }, function(){
		this.route('signup', { path: '/signup' });
		this.route('reset', { path: '/reset' });
	});
	
	this.route('posts', {path:'/posts'});
	
	this.resource('profile', { path: '/:user_id' }, function() {
		this.route('posts', { path: '/' });
		this.route('followers', { path: '/followers' });
		this.route('followers', { path: '/following' });
	});
});

export default Router;
