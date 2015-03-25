/* jshint ignore:start */

/* jshint ignore:end */

define('telegram-client/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTAdapter.extend({
    namespace: "api"
  });

});
define('telegram-client/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'telegram-client/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('telegram-client/controllers/home/login', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var HomeLoginController = Ember['default'].ObjectController.extend({
		actions: {
			login: function login() {
				var username = this.get("username");
				var password = this.get("password");
				var name = this.get("name");
				var controller = this;
				var newUser = this.store.createRecord("user", {
					id: username,
					password: password,
					name: name,
					operation: "login"
				});
				newUser.save().then(function () {
					controller.transitionToRoute("posts");
				}, function (response) {
					//var response = res.status(404).send('Error message as string');
					console.log(response.statusCode); // 404
					console.log(response.responseText); // 'Error message as string'
				});
			} }
	});

	exports['default'] = HomeLoginController;

});
define('telegram-client/controllers/home/reset', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
define('telegram-client/controllers/home/signup', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var HomeSignupController = Ember['default'].ObjectController.extend({
		actions: {

			signup: function signup() {
				var username = this.get("username");
				var password = this.get("password");
				var name = this.get("name");
				var controller = this;

				var newUser = this.store.createRecord("user", {
					id: username,
					password: password,
					name: name,
					operation: "signup"
				});
				newUser.save().then(function () {
					controller.transitionToRoute("posts");
				}, function (response) {
					console.log(response.statusCode); // 404
					console.log(response.responseText); // 'Error message as string'
				});
			}
		}
	});

	exports['default'] = HomeSignupController;

});
define('telegram-client/initializers/app-version', ['exports', 'telegram-client/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function initialize(container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('telegram-client/initializers/export-application-global', ['exports', 'ember', 'telegram-client/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('telegram-client/models/post', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    var Post = DS['default'].Model.extend({
        author: DS['default'].belongsTo("user", { async: true }),
        body: DS['default'].attr("string"),
        createdDate: DS['default'].attr("string", {
            defaultValue: function defaultValue() {
                return new Date();
            }
        }),
        repostedFromAuthor: DS['default'].attr("string") });

    Post.reopenClass({
        FIXTURES: [{
            id: 1,
            author: "deepali",
            body: "rrrrrrasfdsfds"
        }, {
            id: 2,
            author: "prashant",
            body: "shfjdsfkjdshkdsa"
        }, {
            id: 3,
            author: "deepali",
            body: "sdfdsdkkkkllkdfldsdf"
        }]
    });

    exports['default'] = Post;

});
define('telegram-client/models/user', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    var User = DS['default'].Model.extend({
        name: DS['default'].attr("string"),
        email: DS['default'].attr("string"),
        photo: DS['default'].attr("string"),
        followedByCurrentUser: DS['default'].attr("boolean", { defaultValue: false }),
        followingCurrentUser: DS['default'].attr("boolean", { defaultValue: false }) });

    User.reopenClass({
        FIXTURES: [{
            id: "deepali",
            name: "Deepali Gandhi" }, {
            id: "prashant",
            name: "PG" }, {
            id: "varun",
            name: "Varun" }]
    });

    exports['default'] = User;

});
define('telegram-client/router', ['exports', 'ember', 'telegram-client/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.resource("home", { path: "/" }, function () {
      this.route("login", { path: "/" });
      this.route("signup", { path: "/signup" });
      this.route("reset", { path: "/reset" });
    });

    this.route("posts", { path: "/posts" });

    this.resource("profile", { path: "/profile/:user_id" }, function () {
      this.route("posts", { path: "/posts" });
      this.route("followers", { path: "/followers" });
      this.route("followers", { path: "/following" });
    });
  });

  exports['default'] = Router;

});
define('telegram-client/routes/home', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('telegram-client/routes/home/login', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var HomeLoginRoute = Ember['default'].Route.extend({
		model: function model() {
			return {};
		},
		renderTemplate: function renderTemplate(controller) {
			this.render("home.login", { controller: controller });
		} });

	exports['default'] = HomeLoginRoute;

});
define('telegram-client/routes/home/reset', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var HomeResetRoute = Ember['default'].Route.extend({
		model: function model() {
			return {};
		},
		renderTemplate: function renderTemplate(controller) {
			this.render("home.reset", { controller: controller });
		} });

	exports['default'] = HomeResetRoute;

});
define('telegram-client/routes/home/signup', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var HomeSignupRoute = Ember['default'].Route.extend({
		model: function model() {
			return {};
		},
		renderTemplate: function renderTemplate(controller) {
			this.render("home.signup", { controller: controller });
		} });

	exports['default'] = HomeSignupRoute;

});
define('telegram-client/routes/posts', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var PostsRoute = Ember['default'].Route.extend({
		model: function model() {
			return this.store.find("post");
		}
	});

	exports['default'] = PostsRoute;

});
define('telegram-client/routes/profile', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var ProfilePostsRoute = Ember['default'].Route.extend({
		model: function model(params) {
			return this.store.find("post", { author: params.user_id });
		}
	});

	exports['default'] = ProfilePostsRoute;

});
define('telegram-client/routes/profile/followers', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var ProfileFollowersRoute = Ember['default'].Route.extend({
			model: function model(params) {
					return this.store.find("user", { follows: params.user_id });
			}
	});

	exports['default'] = ProfileFollowersRoute;

});
define('telegram-client/routes/profile/following', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var ProfileFollowingRoute = Ember['default'].Route.extend({
		model: function model(params) {
			return this.store.find("user", { followedBy: params.user_id });
		}
	});

	exports['default'] = ProfileFollowingRoute;

});
define('telegram-client/routes/profile/posts', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var ProfilePostsRoute = Ember['default'].Route.extend({
		model: function model(params) {
			return this.store.find("post", { author: params.user_id });
		}
	});

	exports['default'] = ProfilePostsRoute;

});
define('telegram-client/serializers/user', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    serialize: function serialize(record, options) {
      var data = this._super(record, options);

      data.meta = {
        operation: record.get("operation"),
        password: record.get("password")
      };

      return data;
    }
  });

});
define('telegram-client/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"id","telegram");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("header");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),2,3);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/home', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","left");
        var el3 = dom.createTextNode("\n              ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3,"src","/images/telegram-logo.png");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","vline");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","right");
        var el3 = dom.createTextNode("\n            ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","postmark");
        var el4 = dom.createTextNode("\n              ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/images/postmark.png");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n            ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n          ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 5]),4,5);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/home/login', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createTextNode("Recover password");
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createTextNode("Sign up");
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n                ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","p2");
        var el4 = dom.createTextNode("Get going ...");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  Enter your username ...");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                 ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.setAttribute(el3,"color","#EEEEEE");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  Enter your password ...");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.setAttribute(el3,"color","#EEEEEE");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","button");
        dom.setAttribute(el3,"type","submit");
        var el4 = dom.createTextNode("Log in");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","p1");
        var el4 = dom.createTextNode("\n                  	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        var el5 = dom.createTextNode(" or ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n                  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, get = hooks.get, inline = hooks.inline, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [11]);
        var morph0 = dom.createMorphAt(element1,2,3);
        var morph1 = dom.createMorphAt(element1,5,6);
        var morph2 = dom.createMorphAt(element2,0,1);
        var morph3 = dom.createMorphAt(element2,1,2);
        element(env, element0, context, "action", ["login"], {"on": "submit"});
        inline(env, morph0, context, "input", [], {"type": "text", "placeholder": "Your username", "value": get(env, context, "username")});
        inline(env, morph1, context, "input", [], {"type": "password", "placeholder": "Your password", "value": get(env, context, "password")});
        block(env, morph2, context, "link-to", ["home.reset"], {}, child0, null);
        block(env, morph3, context, "link-to", ["home.signup"], {}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/home/reset', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode(" ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n                ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","p2");
        var el4 = dom.createTextNode("Reset password");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  Enter your email ...");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                 ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.setAttribute(el3,"color","#EEEEEE");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  \n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","button");
        dom.setAttribute(el3,"type","submit");
        var el4 = dom.createTextNode("Reset password");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  \n                ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),2,3);
        element(env, element0, context, "action", ["reset"], {"on": "submit"});
        inline(env, morph0, context, "input", [], {"type": "text", "placeholder": "Your email", "value": get(env, context, "email")});
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/home/signup', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createTextNode("Log in");
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n            ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","p2");
        var el4 = dom.createTextNode("Get going ...");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  Enter your name ...");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                 ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.setAttribute(el3,"color","#EEEEEE");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  Enter your username ...");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                 ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.setAttribute(el3,"color","#EEEEEE");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  Enter your password ...");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.setAttribute(el3,"color","#EEEEEE");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","button");
        dom.setAttribute(el3,"type","submit");
        var el4 = dom.createTextNode("Sign up");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","p1");
        var el4 = dom.createTextNode("\n                  	");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n                  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n            ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, get = hooks.get, inline = hooks.inline, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morph0 = dom.createMorphAt(element1,2,3);
        var morph1 = dom.createMorphAt(element1,5,6);
        var morph2 = dom.createMorphAt(element1,8,9);
        var morph3 = dom.createMorphAt(dom.childAt(element1, [14]),0,1);
        element(env, element0, context, "action", ["signup"], {"on": "submit"});
        inline(env, morph0, context, "input", [], {"type": "text", "placeholder": "Your name", "value": get(env, context, "name")});
        inline(env, morph1, context, "input", [], {"type": "text", "placeholder": "Your username", "value": get(env, context, "username")});
        inline(env, morph2, context, "input", [], {"type": "password", "placeholder": "Your password", "value": get(env, context, "password")});
        block(env, morph3, context, "link-to", ["home.login"], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/home/success', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n                ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n                  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","p2");
        var el4 = dom.createTextNode("Check your inbox");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n                  We've sent you a recovery password in your email inbox.\n                ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/posts', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            if (this.cachedFragment) { dom.repairClonedNode(fragment,[0,1]); }
            var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
            content(env, morph0, context, "post.author.name");
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  		");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(": ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
          var morph1 = dom.createMorphAt(fragment,1,2,contextualElement);
          block(env, morph0, context, "link-to", ["profile", get(env, context, "post.author")], {}, child0, null);
          content(env, morph1, context, "post.body");
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createTextNode("Home");
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Latest posts :\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(element0,2,3);
        var morph1 = dom.createMorphAt(element0,5,6);
        var morph2 = dom.createMorphAt(fragment,1,2,contextualElement);
        block(env, morph0, context, "each", [get(env, context, "controller")], {"keyword": "post"}, child0, null);
        block(env, morph1, context, "link-to", ["home"], {}, child1, null);
        content(env, morph2, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/profile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createTextNode("Home");
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createTextNode("Posts");
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Profile page");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,1,2,contextualElement);
        var morph1 = dom.createMorphAt(fragment,2,3,contextualElement);
        var morph2 = dom.createMorphAt(fragment,3,4,contextualElement);
        block(env, morph0, context, "link-to", ["home"], {}, child0, null);
        block(env, morph1, context, "link-to", ["posts"], {}, child1, null);
        content(env, morph2, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/profile/followers', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/profile/following', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/profile/posts', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Profile page");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,1,2,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('telegram-client/templates/todos/login', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('telegram-client/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nadapters/application.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 3, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 4, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 16, col 1, \'export\' is only available in ES6 (use esnext option).\n\n5 errors'); 
  });

});
define('telegram-client/tests/controllers/home/login.jshint', function () {

  'use strict';

  module('JSHint - controllers/home');
  test('controllers/home/login.js should pass jshint', function() { 
    ok(false, 'controllers/home/login.js should pass jshint.\ncontrollers/home/login.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/home/login.js: line 32, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/controllers/home/reset.jshint', function () {

  'use strict';

  module('JSHint - controllers/home');
  test('controllers/home/reset.js should pass jshint', function() { 
    ok(false, 'controllers/home/reset.js should pass jshint.\ncontrollers/home/reset.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/home/reset.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/controllers/home/signup.jshint', function () {

  'use strict';

  module('JSHint - controllers/home');
  test('controllers/home/signup.js should pass jshint', function() { 
    ok(false, 'controllers/home/signup.js should pass jshint.\ncontrollers/home/signup.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/home/signup.js: line 32, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/helpers/resolver', ['exports', 'ember/resolver', 'telegram-client/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('telegram-client/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('telegram-client/tests/helpers/start-app', ['exports', 'ember', 'telegram-client/app', 'telegram-client/router', 'telegram-client/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('telegram-client/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('telegram-client/tests/models/post.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/post.js should pass jshint', function() { 
    ok(false, 'models/post.js should pass jshint.\nmodels/post.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/post.js: line 33, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/models/user.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/user.js should pass jshint', function() { 
    ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/user.js: line 28, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 27, col 1, \'export\' is only available in ES6 (use esnext option).\n\n3 errors'); 
  });

});
define('telegram-client/tests/routes/home.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/home.js should pass jshint', function() { 
    ok(false, 'routes/home.js should pass jshint.\nroutes/home.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/home.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/routes/home/login.jshint', function () {

  'use strict';

  module('JSHint - routes/home');
  test('routes/home/login.js should pass jshint', function() { 
    ok(false, 'routes/home/login.js should pass jshint.\nroutes/home/login.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/home/login.js: line 12, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/routes/home/reset.jshint', function () {

  'use strict';

  module('JSHint - routes/home');
  test('routes/home/reset.js should pass jshint', function() { 
    ok(false, 'routes/home/reset.js should pass jshint.\nroutes/home/reset.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/home/reset.js: line 13, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/routes/home/signup.jshint', function () {

  'use strict';

  module('JSHint - routes/home');
  test('routes/home/signup.js should pass jshint', function() { 
    ok(false, 'routes/home/signup.js should pass jshint.\nroutes/home/signup.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/home/signup.js: line 13, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/routes/posts.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/posts.js should pass jshint', function() { 
    ok(false, 'routes/posts.js should pass jshint.\nroutes/posts.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/posts.js: line 9, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/routes/profile.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/profile.js should pass jshint', function() { 
    ok(false, 'routes/profile.js should pass jshint.\nroutes/profile.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/profile.js: line 9, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/routes/profile/followers.jshint', function () {

  'use strict';

  module('JSHint - routes/profile');
  test('routes/profile/followers.js should pass jshint', function() { 
    ok(false, 'routes/profile/followers.js should pass jshint.\nroutes/profile/followers.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/profile/followers.js: line 10, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/routes/profile/following.jshint', function () {

  'use strict';

  module('JSHint - routes/profile');
  test('routes/profile/following.js should pass jshint', function() { 
    ok(false, 'routes/profile/following.js should pass jshint.\nroutes/profile/following.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/profile/following.js: line 10, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/routes/profile/posts.jshint', function () {

  'use strict';

  module('JSHint - routes/profile');
  test('routes/profile/posts.js should pass jshint', function() { 
    ok(false, 'routes/profile/posts.js should pass jshint.\nroutes/profile/posts.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/profile/posts.js: line 9, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/serializers/user.jshint', function () {

  'use strict';

  module('JSHint - serializers');
  test('serializers/user.js should pass jshint', function() { 
    ok(false, 'serializers/user.js should pass jshint.\nserializers/user.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nserializers/user.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('telegram-client/tests/test-helper', ['telegram-client/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('telegram-client/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:application", "ApplicationAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('telegram-client/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/controllers/home/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:home/login", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('telegram-client/tests/unit/controllers/home/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers/home');
  test('unit/controllers/home/login-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/home/login-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/controllers/home/reset-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:home/reset", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('telegram-client/tests/unit/controllers/home/reset-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers/home');
  test('unit/controllers/home/reset-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/home/reset-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/controllers/home/signup-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:home/signup", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('telegram-client/tests/unit/controllers/home/signup-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers/home');
  test('unit/controllers/home/signup-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/home/signup-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/models/post-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("post", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('telegram-client/tests/unit/models/post-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/post-test.js should pass jshint', function() { 
    ok(true, 'unit/models/post-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/models/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("user", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('telegram-client/tests/unit/models/user-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/user-test.js should pass jshint', function() { 
    ok(true, 'unit/models/user-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/routes/home/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:home/index", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('telegram-client/tests/unit/routes/home/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/home');
  test('unit/routes/home/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/home/index-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/routes/home/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:home/login", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('telegram-client/tests/unit/routes/home/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/home');
  test('unit/routes/home/login-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/home/login-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/routes/profile/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:profile/index", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('telegram-client/tests/unit/routes/profile/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/profile');
  test('unit/routes/profile/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/profile/index-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/routes/profile/posts-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:profile/posts", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('telegram-client/tests/unit/routes/profile/posts-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/profile');
  test('unit/routes/profile/posts-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/profile/posts-test.js should pass jshint.'); 
  });

});
define('telegram-client/tests/unit/serializers/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("serializer:user", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var serializer = this.subject();
    assert.ok(serializer);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('telegram-client/tests/unit/serializers/user-test.jshint', function () {

  'use strict';

  module('JSHint - unit/serializers');
  test('unit/serializers/user-test.js should pass jshint', function() { 
    ok(true, 'unit/serializers/user-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('telegram-client/config/environment', ['ember'], function(Ember) {
  var prefix = 'telegram-client';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("telegram-client/tests/test-helper");
} else {
  require("telegram-client/app")["default"].create({"name":"telegram-client","version":"0.0.0.80712ca9"});
}

/* jshint ignore:end */
//# sourceMappingURL=telegram-client.map