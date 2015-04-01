import Ember from 'ember';
import layout from '../templates/components/post-block';

export default Ember.Component.extend({
  layout: layout,
  
  postAuthor: function(){
  		if (this.get('post.author.id') === this.get('user.id'))
  		{
  			return true;
  		}	
 	 }.property('post.author.id', 'user.id'),
  actions: {
  	delete: function() {
  		var post = this.get('post');
  		this.sendAction('delete', post);
  	},
  	repostClicked: function() {
  		this.set('repostClicked', true);
  	},
  	repost: function() {
  		this.toggleProperty('repostConfirm');
  		var post = this.get('post');
  		if (this.get('repostConfirm')){
  			this.sendAction('repost', post);
  			this.toggleProperty('repostClicked');
  		}
  	},
  	
  	cancel: function() {
  		this.set('repostConfirm', false);
  		this.set('repostClicked', false);
  	},
  },
  
});
