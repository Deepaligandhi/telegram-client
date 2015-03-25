import Ember from 'ember';


var HomeResetRoute = Ember.Route.extend({
	model: function(){
		return{};
	},
	renderTemplate: function(controller) {
      this.render('home.reset', {controller: controller});
    }, 
});

export default HomeResetRoute;

