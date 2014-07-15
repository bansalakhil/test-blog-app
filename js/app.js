App = Ember.Application.create();

// Overwrite applictoin serializer so that it won't send attributes marked as readonly to server.
App.ApplicationSerializer = DS.RESTSerializer.extend({
  serializeAttribute: function(record, json, key, attribute) {
    if (!attribute.options.readOnly) {
      return this._super(record, json, key, attribute);
    }
  }
});

App.Router.map(function() {
  // put your routes here
  this.resource('users', function(){
  	this.resource('user', { path: ':user_id' })
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

  model: function() {
      return this.store.find('user');
  }  
});



