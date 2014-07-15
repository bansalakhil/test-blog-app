App.UsersNewController = Ember.ObjectController.extend({
    actions: {
        save: function() {
            user = this.store.createRecord('user', {
                name: this.get('name'),
                bio: this.get('bio')
            });
            _this = this;
            user.save().then(function(){
              _this.resetForm();
              _this.transitionToRoute('user', user)
            }, function(){
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