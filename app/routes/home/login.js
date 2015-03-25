import Ember from 'ember';

var HomeLoginRoute = Ember.Route.extend({
	model: function(){
		return{};
	},
	renderTemplate: function(controller) {
      this.render('home.login', {controller: controller});
    },    
});

export default HomeLoginRoute;