module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();
  var postId = 0;
  
  var posts = [
        {
        id: "p1",
        author: "andreisoare",
        body: "post 1 body"
      },
      {
        id: "p2",
        author: "vladberteanu",
        body: "post 2 body"
      },
      {
        id: "p3",
        author: "vladberteanu",
        body: "post 3 body"
      },
      {
        id: "p4",
        author: "vladberteanu",
        body: "post 4 body"
      }
    ];
      
  postsRouter.get('/', function(req, res) {
    console.log(req.query.author);
    if (req.query.dashboard){
    	res.send({
      		"posts": posts
    	});
    };
    if (req.query.author) {
    	var authorPosts = posts.filter(function(post) {
    		return post.author === req.query.author;
    	});
    	res.send({
      		"posts": authorPosts
    	});
    };
  });

  postsRouter.post('/', function(req, res) {
  	if(req.body.post.meta.operation === 'createPost'){
  		postId++;
  		var post = {
    		id: postId,
    		author: req.body.post.author,
        	body: req.body.post.body,
        	repostedFrom: req.body.post.repostedFrom
    	};
    	res.send({
			"post": post
    	});
    	posts.push(post);
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
