import Ember from 'ember';
import layout from '../templates/components/user-block';

export default Ember.Component.extend({
  layout: layout,
  	 
  actions: {
  	follow: function() {
  		this.sendAction('follow', this.get('user'));
  	},
  	unfollow: function() {
  		this.sendAction('unfollow', this.get('user'));
  	},
  }	
});
