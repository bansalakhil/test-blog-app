App.PostExcerptComponent = Ember.Component.extend({

  classNames: ['user_post_excerpt'],

  displayContent: false,

  actions: {
    toggleContent: function(){
      this.toggleProperty("displayContent");
    }
  }

})

