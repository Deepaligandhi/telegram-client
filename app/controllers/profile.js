import Ember from 'ember';

var ProfileController =  Ember.Controller.extend({

  authentication: Ember.inject.service('authentication'),

});

export default ProfileController;
