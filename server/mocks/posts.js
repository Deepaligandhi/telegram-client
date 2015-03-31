module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  postsRouter.get('/', function(req, res) {
    res.send({
      'posts': [
        {
        id: "p1",
        author: "andreisoare",
        body: "post 1 body",
        repostedFrom: ""
      },
      {
        id: "p2",
        author: "vladberteanu",
        body: "post 2 body",
        repostedFrom: "p1"
      }
      ]
    });
  });

  postsRouter.post('/', function(req, res) {
  	if(req.body.post.meta.operation === 'createPost'){
  		var post = {
    		id: req.body.post.id,
    		author: req.body.post.author,
        	body: req.body.post.body,
        	repostedFrom: req.body.post.repostedFrom
    	};
    	res.send({
			"post": post
    	});
  	}
  });

  postsRouter.get('/:id', function(req, res) {
    	res.send({
      		'posts': {
        	id: req.params.id
      		}
    	});
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
