import Ember from 'ember';


var HomeSignupRoute = Ember.Route.extend({
	model: function(){
		return{};
	},
	renderTemplate: function(controller) {
      this.render('home.signup', {controller: controller});
    }, 
});

export default HomeSignupRoute;

