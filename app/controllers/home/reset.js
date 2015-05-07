import Ember from 'ember';

var HomeResetController = Ember.Controller.extend({
  email: '',
  actions: {
    reset: function() {
      this.set('error', null);
      var email = this.get('email');
      if (!email) {
        return (this.set('error', 'Please enter a valid email address'));
      }
      var controller = this;
      var newUser = this.store.createRecord('user', {
        email: email,
        meta: {
          operation: 'reset'
        }
      });
      newUser.save().then(function(user) {
        console.log("Email sent to user: ", user);
        controller.transitionToRoute('home.success');
      }, function(response) {
        console.log(response.statusCode); // 404
        console.log(response.responseText); // 'Error message as string'
        var errText = response.responseText;
        return (controller.set('error', errText));
      });
    }
  }

});

export default HomeResetController;
