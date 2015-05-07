import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('home', {path: '/'}, function(){
	this.route('login', {path: '/'});
    this.route('signup', {path: '/signup'});
    this.route('reset', {path: '/reset'});
    this.route('success', {path: '/success'});
  });
  this.route('posts', {path:'/posts'});
  this.resource('profile', {path: '/profile/:user_id'}, function() {
    this.route('posts', {path: '/'});
    this.route('followers', {path: '/followers'});
  	this.route('following', {path: '/following'});    
  }); 
});

export default Router;
