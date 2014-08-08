App.PostsNewController = Ember.ObjectController.extend({
  needs: ['application'],

  isEditing: false,
  selectedUser: null,
  // needs: ["users"],
  // users: Ember.computed.alias('controllers.users'),

  actions: {
    save: function() {
      _this = this;
      post = this.store.createRecord('post', {

        title: this.get('title'),
        content: this.get('body'),
        user: this.get('selectedUser'),
        excerpt: this.get('excerpt'),
      });

      post.save().then(

        function(data) {

          _this.notifySuccess(post);
          _this.resetForm();
          _this.transitionToRoute('posts')
        },

        function(data) {
          _this.notifyFailure(post);
          post.deleteRecord();
        }
      );

    },
    cancel: function() {
      this.resetForm();
      this.transitionToRoute('posts');

    },
  },
  notifySuccess: function(post) {
    console.log(this.get('controllers.application').send('pushNotification', 'success', 'Saved Successfully!!', 'Post ' + post.get('title') + ' saved on server successfully.'));
  },
  notifyFailure: function(post) {
    console.log(this.get('controllers.application').send('pushNotification', 'fail', 'Failed!!!', 'Post ' + post.get('title') + ' could not be saved on server.'));
  },

  resetForm: function() {
    this.set('title', '');
    this.set('excerpt', '');
    this.set('body', '');
    this.set('selectedUser', null);
  },
})