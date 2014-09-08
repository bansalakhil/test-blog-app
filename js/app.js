App = Ember.Application.create({
  LOG_TRANSITIONS: true,
});

App.PostDefaultImageURL = 'http://lorempixel.com/1920/1920/nature/';

// Overwrite applictoin serializer so that it won't send attributes marked as readonly to server.
App.ApplicationSerializer = DS.ActiveModelSerializer.extend({
  serializeAttribute: function(record, json, key, attribute) {
    if (!attribute.options.readOnly) {
      return this._super(record, json, key, attribute);
    }
  }
});

App.Router.map(function() {
  // put your routes here
  this.resource('users', function() {
    this.resource('user', {
      path: ':user_id'
    })
    this.route('new')
    this.route('search')
  });

  this.resource('posts', function() {
    this.route('new')
  });
});


App.UsersRoute = Ember.Route.extend({
  // activate: function() {},
  // deactivate: function() {},
  // setupController: function(controller, model) {},
  // renderTemplate: function() {},
  // beforeModel: function() {},
  // afterModel: function() {},
  // beforeModel: function(){
  //   alert('beforeModel called')
  // },

  afterModel: function(users) {
    var users = users.toArray();
    if (users.length === 0) {
      this.transitionTo('users.new')
    }
  },

  model: function() {
    if (this.controller && this.controller.get('content')) {
      return this.controller.get('content');
    }

    return this.store.find('user');
  }
});


App.UsersSearchRoute = Ember.Route.extend({
  // If we want to refresh our model when query parameter change we need to do this:
  // queryParams: {
  //     query: {
  //         refreshModel: true
  //     }
  // },
  model: function(params) {
    return this.modelFor('users');
  }
});





App.PostsRoute = Ember.Route.extend({
  // activate: function() {},
  // deactivate: function() {},
  // setupController: function(controller, model) {},
  // renderTemplate: function() {},
  // beforeModel: function() {},
  // afterModel: function() {},
  // beforeModel: function(){
  //   alert('beforeModel called')
  // },

  // afterModel: function(posts){
  //   var posts = posts.toArray();
  //   if(posts.length === 0){
  //     this.transitionTo('posts.new')
  //   }
  // },

  model: function() {
    if (this.controller && this.controller.get('content')) {
      return this.controller.get('content');
    }

    return this.store.find('post');
  }
});


App.PostsNewRoute = Ember.Route.extend({
  model: function() {
    var users = this.controllerFor('users').get('content');
    if (users.get('length') == 0) {
      users = this.store.find('user');
    }

    return {
      users: users,
    };
  },


});