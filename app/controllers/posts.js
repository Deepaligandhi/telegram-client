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
		publish: function() {
			var postContent = this.get('postContent');
			var controller = this;
			if(postContent) {
				var post = this.store.createRecord('post',{
					body: postContent,
					createdDate:new Date(),
					author: controller.get('authentication.authenticatedUser'),
					meta: {
						operation: 'createPost'
					}
				});
				post.save().then(
					function(post){
						controller.get('model').addObject(post);
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
			var controller = this;
			var newPost = this.store.createRecord('post', {
				body: post.get('body'),
				author: controller.get('authentication.authenticatedUser'),
				repostedFrom: post,
				meta: {
						operation: 'createPost'
				}
			});
			newPost.save().then(
				function(post) {
					controller.get('model').addObject(post);
				},
				function(response) {
					console.log(response.statusCode); // 404
  				console.log(response.responseText); // 'Error message as string'
				}
			);
		}
	}
});

export default PostsController;
