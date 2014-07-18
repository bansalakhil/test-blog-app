App.UsersNewController = Ember.ObjectController.extend({
    actions: {
        save: function() {
            _this = this;
            
            user = this.store.createRecord('user', {
                name: this.get('name'),
                bio: this.get('bio')
            });
            
            user.save().then(

              function(data){
              _this.resetForm();
              _this.transitionToRoute('user', user)
              },

             function(data){
              user.deleteRecord();
              alert('Could not save record')
              }
            );
            
        },
        cancel: function() {
            this.transitionToRoute('users')
        },
    },
    resetForm: function() {
        this.set('name', '');
        this.set('bio', '');
    },

});