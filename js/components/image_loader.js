App.ImageLoaderComponent = Ember.Component.extend({
  src: '',
  classNames: ['img_wrapper'],
  classNameBindings: ['loaded'],
  loaded: false,
 
  handleLoad: function() {
    this.$().children('img').on('load', function() {
      this.set('loaded', true);
    }.bind(this));
  }.on('didInsertElement')
});