module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  var users = {
    'andreisoare': {
      id: 'andreisoare',
      name: 'Andrei Soare',
      email: 'andrei@abcd.com',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI1E2v28XONg6XyfvbpqWYEE-P8-xb3oiJVm4FvRMJRD6aEHZs-A',
      followedByCurrentUser : true
    },
    'vladberteanu': {
      id: 'vladberteanu',
      name: 'Vlad Berteanu',
      email: 'vlad@xyz.com',
      followedByCurrentUser : false
    },
    'dgandhi': {
      id: 'dgandhi',
      name: 'Deepali Gandhi',
      email: 'deepali@ddd.com',
      photo: 'data:image/jpeg;base64,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',
      followedByCurrentUser : true
    },
    'pgandhi': {
      id: 'pgandhi',
      name: 'P Gandhi',
      email: 'pg@ddd.com',
      followedByCurrentUser : true
    },
    'vgandhi': {
      id: 'vgandhi',
      name: 'V Gandhi',
      email: 'vg@ddd.com',
      followedByCurrentUser : false
    },
    'mrbean': {
      id: 'mrbean',
      name: 'Mr Bean',
      email: 'vg@ddd.com',
      followedByCurrentUser : true
    }
  };

  var usersAll = Object.keys(users).map(function(key) { return users[key]; });

  var following = usersAll.filter(function(user) { return user.followedByCurrentUser; });

  usersRouter.get('/:id', function(req, res) {

    res.send({
      "user": users[req.params.id]
    });
  });

  usersRouter.post('/', function(req, res) {
    if (req.body.user.meta.operation === 'signup'){
      var user = {
        id: req.body.user.id,
        name: req.body.user.name,
        email: req.body.user.email
      };
      res.send({
        "user": user
      });
    };
    if (req.body.user.meta.operation === 'login') {

      if (users[req.body.user.id]){
        res.send({
          "user": users[req.body.user.id]
        });

      }
      else {

        res.status(404).send('Invalid username/password!');
      }
    };

  });

  usersRouter.get('/', function(req, res) {
    if(req.query.following) {
      res.send({
        "users": following
      });
    }
    else {
      res.send({
        "users": usersAll
      });
    }
  });

  usersRouter.put('/:id', function(req, res) {
    var userId = req.params.id;
    console.log('userId :' + userId);
    if (req.body.user.meta.operation === 'followUser'){
      var user = {
        id: userId,
        followedByCurrentUser: req.body.user.followedByCurrentUser
      };
      res.send({
        "user": users[userId]
      });
    };

    if (req.body.user.meta.operation === 'unfollowUser'){
      var user = {
        id: userId,
        followedByCurrentUser: false
      };
      res.send({
        "user": users[userId]
      });
    };
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/users', usersRouter);
};
