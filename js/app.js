App = Ember.Application.create();
App.apiPaths = {
	'users_path': 'http://localhost:3000/users',
	'user_path': 'http://localhost:3000/users'
}

App.Router.map(function() {
  // put your routes here
  this.resource('users', function(){
  	this.resource('user', { path: ':user_id' })
  });
});



// App.IndexRoute = Ember.Route.extend({
//     model: function() {
//         return ['red', 'yellow', 'blue'];
//     }
// });




App.UsersRoute = Ember.Route.extend({
  // activate: function() {},
  // deactivate: function() {},
  // setupController: function(controller, model) {},
  // renderTemplate: function() {},
  // beforeModel: function() {},
  // afterModel: function() {},
  
  model: function() {
      return Ember.$.getJSON(App.apiPaths['users_path'] + '.json');;
  }
});


App.UserRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('users').findBy('id', Number(params.user_id));
  }
});


App.UserController = Ember.ObjectController.extend({
	isEditing: false,
	originalName: '',
	originalBio: '',

	actions: {
		edit: function (){
			this.set('isEditing', true);
			this.set('originalName', this.get('name'));
			this.set('originalBio', this.get('bio'));
		},
    doneEditing: function(){
      Ember.$.ajax({
          'url': App.apiPaths['user_path'] +'/'+ this.get('id') + '.json',
          'type': 'PUT',
          'data': { "user[name]": this.get('name'), 'user[bio]': this.get('bio')}
        }
        )
      this.set('isEditing', false);

    },    
		cancelEditing: function(){
			this.set('name', this.get('originalName'));
      this.set('bio', this.get('originalBio'));
      this.set('isEditing', false);

		},
	}
});



