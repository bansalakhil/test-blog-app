App.UsersNewController = Ember.ObjectController.extend({
  needs: ['application'],

    actions: {
        save: function() {
            _this = this;
            
            user = this.store.createRecord('user', {
                name: this.get('name'),
                bio: this.get('bio')
            });
            
            user.save().then(
              function(data){

              _this.notifySuccess(user);
              
              _this.resetForm();
              _this.transitionToRoute('user', user)
              },

             function(data){
              _this.notifyFailure(user);
              user.deleteRecord();
              // alert('Could not save record')
              }
            );
            
        },
        cancel: function() {
            this.transitionToRoute('users')
        },
    },
    notifySuccess: function(user){
      console.log(this.get('controllers.application').send('pushNotification','success', 'Saved Successfully!!', 'User '+ user.get('name') + ' saved on server successfully.'));
    },
    notifyFailure: function(user){
      console.log(this.get('controllers.application').send('pushNotification','fail', 'Failed!!!', 'User '+ user.get('name') + ' could not be saved on server.'));
    },

    resetForm: function() {
        this.set('name', '');
        this.set('bio', '');
    },

});