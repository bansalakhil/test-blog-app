App.PostsNewController = Ember.ObjectController.extend({
  isEditing: false,
  
  // needs: ["users"],
  
  // users: Ember.computed.alias('controllers.users'),

    actions: {
        save: function() {
            _this = this;
            
            post = this.store.createRecord('post', {
                title: this.get('title'),
                content: this.get('body'),
                excerpt: this.get('excerpt'),
            });
            
            post.save().then(

              function(data){
              _this.resetForm();
              _this.transitionToRoute('posts')
              },

             function(data){
              post.deleteRecord();
              alert('Could not save record')
              }
            );
            
        },
        cancel: function() {
            this.resetForm();
            this.transitionToRoute('posts');

        },
    },
    resetForm: function() {
        this.set('title', '');
        this.set('excerpt', '');
        this.set('body', '');
    },
})