import Ember from 'ember';
import layout from '../templates/components/nav-bar';

export default Ember.Component.extend({
  layout: layout,
  actions: {
  	logout: function() {
  		this.sendAction('logout');
  	},
    openModal: function(modalName, model) {
      console.log(modalName, model);
      this.sendAction('openModal', modalName, model);
    }
  },
});
