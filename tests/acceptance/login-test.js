import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'telegram-client/tests/helpers/start-app';
import Pretender from 'pretender';
import md5 from 'md5';

var application;

module('Acceptance: Login', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

function buildJSON(status, json) {
  return [status, {"Content-Type": "application/json"}, JSON.stringify(json)];
}

test('visiting the login page at path /', function(assert) {
    var username = "varun";
    var password = "pass123";
    var hashedPassword = md5(password);
    // Pretender is a very simple mocking server used in unit tests.
  // Install it with: ember install:addon ember-cli-pretender
    var server = new Pretender(function() {
    this.post('/api/users', function(req) {
      var data = JSON.parse(req.requestBody);
      assert.equal(data.user.id, username);
      assert.equal(data.user.meta.password, hashedPassword);
      assert.equal(data.user.meta.operation, "login");
      return buildJSON(200, {user: {
        id: username
      }});
    });
    // Your client will make an initial request for the authenticated user object.
    // Let's assume you're not authenticated.
    // You should also create another test that assumes you are authenticated.
    this.get('/api/users', function(req) {
      return buildJSON(200, {users: []});
    });

    this.get('/api/posts', function(req) {
      return buildJSON(200, {posts: []});
    });
  });
  visit('/');
  andThen(function() {
    assert.equal(currentPath(), 'home.login');

    // Ideally inputs should have a name attribute defined, so that you can
    // select it by name and not by type="text", which is too generic.
    fillIn('input[type="text"]', username);
    fillIn('input[type="password"]', password);
    click('button');
  });

  andThen(function() {
    assert.equal(currentPath(), 'posts');

    // Don't forget to kill the server, so that it doesn't influence
    // other tests from this file.
    server.shutdown();
  });
});
