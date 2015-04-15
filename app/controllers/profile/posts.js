import Ember from 'ember';

var ProfilePostsController = Ember.ArrayController.extend({
	sortProperties: ['createdDate'],
	sortAscending: false,

	authentication: Ember.inject.service('authentication'),
	actions: {
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

export default ProfilePostsController;
