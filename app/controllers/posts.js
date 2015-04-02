import Ember from 'ember';

var PostsController = Ember.ArrayController.extend({
	sortProperties: ['createdDate'],
	sortAscending: false,

	authentication: Ember.inject.service('authentication'),

	postContent: '',
	postSize : function() {
		var length = this.get('postContent').length;
		return(140 - length);		
	}.property('postContent'),
	
	actions: {
		
		logout: function() {
			this.get('authentication').set('authenticatedUser', null);
			this.store.unloadAll('user');
			this.transitionToRoute('home.login');
		},
		
		publish: function() {
			var thisUser = this.get('authentication.authenticatedUser');
			var postContent = this.get('postContent');
			var controller = this;
			if(postContent) {
				var post = this.store.createRecord('post',{
					body: postContent,
					createdDate:new Date(),
					author: thisUser,
					operation: 'createPost'
				});
				post.save().then(
					function(post){
						controller.get('model').pushObject(post);
						controller.set('postContent', '');
					},
					function(response) {
         				console.log(response.statusCode); // 404
  						console.log(response.responseText); // 'Error message as string'
        		 	}
				);
			}
		},
		delete: function(post){
			this.get('model').removeObject(post);
			post.deleteRecord();
			post.save();
		},
		
		repost: function(post){
			var postBody = post.get('body');
			var controller = this;
			var newPost = this.store.createRecord('post', {
				body: postBody,
				author: this.get('authentication.authenticatedUser'),
				repostedFrom: post,
				operation: 'createPost'
			});
			newPost.save().then(
				function(post) {
					controller.get('model').pushObject(post);
				},
				function(response) {
					console.log(response.statusCode); // 404
  					console.log(response.responseText); // 'Error message as string'
				}
			);
		},
	},
	
});

export default PostsController;
