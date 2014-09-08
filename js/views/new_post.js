App.NewPostView = Ember.View.extend({
    templateName: 'new_post_form',

    didInsertElement: function(){
      Em.$('#new_post_title').focus();
    }
});