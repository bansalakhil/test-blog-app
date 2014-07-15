App.UserController = Ember.ObjectController.extend({
    isEditing: false,
    actions: {
        edit: function() {
            this.set('isEditing', true);
        },

        doneEditing: function() {
            var record = this.get('model')
            record.save();
            this.set('isEditing', false);
        },

        cancelEditing: function() {
            var record = this.get('model')
            record.rollback();
            this.set('isEditing', false);

        },

        deleteRecord: function() {
            var record = this.get('model')
            record.deleteRecord();
            record.save();
            this.set('isEditing', false);
            this.transitionToRoute('users');
        },        
    }
});