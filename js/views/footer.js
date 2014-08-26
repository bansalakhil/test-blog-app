App.FooterView = Ember.View.extend({

    templateName: 'footer',
    currentTime: null,
    setCurrentTime: function(){
     // debugger
     setInterval(function(){
        this.set('currentTime', new Date())
      }.bind(this), 1000);

    }.on('didInsertElement'),

    // didInsertElement: function() {
    //     this.set('currentTime', new Date())
    // },
});