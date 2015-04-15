import Ember from 'ember';
import layout from '../templates/components/post-block';

export default Ember.Component.extend({
  layout: layout,
  repostClicked: false,
  
  postAuthor: function(){
  		if (this.get('post.author.id') === this.get('currentUser.id')) {
  			return true;
  		}	
 	 }.property('post.author', 'currentUser'),
 	 
  actions: {
  	delete: function() {
  		var post = this.get('post');
  		this.sendAction('delete', post);
  	},
  	
  	repostClicked: function() {
  		this.set('repostClicked', true);
  	},
  	
  	repost: function() {
  		var post = this.get('post');
  		this.sendAction('repost', post);
  		this.toggleProperty('repostClicked');
  	},
  	
  	cancel: function() {
  		this.set('repostClicked', false);
  	},
  		
  },
  
});
