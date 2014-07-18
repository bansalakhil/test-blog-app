App.UsersSearchController = Ember.ArrayController.extend({

  queryParams: {query: 'q'}, // query is the controller property and 'q' is the key which will be displayed in url like ?q=something
  query: null,

  //Set one way binding so that whatever query is put in url, should be populated in the search box
  queryField: Ember.computed.oneWay('query'),

  filteredUsers: function() {
    var query = this.get('query');

    console.log("filter method called with query: " + query)

    var users = this.get('model');

    if (query) {
      var regex = new RegExp(query, 'i')

      var filteredUsers = users.filter(function(u) {
        return regex.test(u.get('name'))
      });
      return filteredUsers;
    } else {
      return users
    }


  }.property('query', 'model'),

  actions: {
    search: function() {
      var queryField = this.get('queryField');
      this.set('query', queryField);
    }
  }
})