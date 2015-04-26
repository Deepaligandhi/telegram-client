import Ember from 'ember';

export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  var Session = Ember.Object.extend({
      isAuthenticated: false
  });
  application.register('session:main', Session);
  application.inject('route', 'session', 'session:main');
  application.inject('controller', 'session', 'session:main');
}

export default {
  name: 'session',
  initialize: initialize
};
