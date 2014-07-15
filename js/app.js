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


// App.UserRoute = Ember.Route.extend({
//   // model: function(params) {
//   //   return this.modelFor('users').findBy('id', Number(params.user_id));
//   // }
// });

App.UserAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000'
});

App.User = DS.Model.extend({
  name: DS.attr('string'),
  bio: DS.attr('string'),
  url: DS.attr('string', {readOnly: true})
})


// App.UsersController = Ember.ArrayController.extend({

// })

App.UserController = Ember.ObjectController.extend({
	isEditing: false,
	actions: {
		edit: function (){
			this.set('isEditing', true);
		},

    doneEditing: function(){
      var record = this.get('model')
      record.save();
      this.set('isEditing', false);
    },    

		cancelEditing: function(){
      var record = this.get('model')
      record.rollback();
      this.set('isEditing', false);

		},
	}
});

App.UsersNewController = Ember.ObjectController.extend({
  actions: {
    save: function(){
      user = this.store.createRecord('user',{
        name: this.get('name'),
        bio: this.get('bio')
      });

      user.save()
      
    },    

    cancel: function(){
      this.transitionToRoute('users')

    },
  }
});

