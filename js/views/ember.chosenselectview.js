/**
 * Ember.ChosenSelectView
 * Version: 1.1.0
 * 
 * Dependancies:
 * jQuery - Tested on 1.11.0+,
 * Ember.js - Tested on 1.6.0+,
 * Chosen: http://harvesthq.github.io/chosen/
 *    
 * Creates a Chosen Select Box if the library is available.
 * If Chosen is not included. A default select box is created.
 */

Ember.ChosenSelectView = Ember.Select.extend(
  Ember.TargetActionSupport,
  {
    classNames: ["ember-chosenselect"],

    ///////////////
    //! Settings //
    ///////////////
    
    /**
     * Ember.ChosenSelectView#content
     * Content for the <option> in the select box.
     * Must be an array of objects or simple array.
     * Recommended object structure: {"label": "Some Label", "value": "Some Value"}
     */
    content: [],

    /**
    * Ember.ChosenSelectView#settings
    * Holder for initialized settings.
    */
    settings: null,

    /**
    * Ember.ChosenSelectView@commitAction
    * A named action on the view's controller.
    */
    commitAction: null,

    /**
    * Chosen Options
    * Reference: http://harvesthq.github.io/chosen/options.html
    */
    allow_single_deselect: false,
    disable_search: false,
    disable_search_threshold: 0,
    enable_split_word_search: true,
    inherit_select_classes: true,
    max_selected_options: "Infinity",
    no_results_text: "No matching results",
    placeholder_text_multiple: "Select Some Options",
    placeholder_text_single: "Select an Option",
    search_contains: true,
    single_backstroke_delete: true,
    width: "100%",
    display_disabled_options: true,
    display_selected_options: true,
    
    
    /**
     * Ember.ChosenSelectView#init
     * Initialized plugin by altering the content property to ensure that there is a blank option
     */
    init: function(){
      this._super();
      
      // Add an empty item as the first content item for the placeholder and `allow_single_deselect` option
      var currentContent = this.get("content");
      
      if( typeof currentContent[0] === "object" ){
        var emptyItem = {};
        for(var property in currentContent[0]){
          if( currentContent[0].hasOwnProperty(property) ){
            emptyItem[property] = "";
          }
        }
      } else {
        var emptyItem = "";
      }
      
      this.set("content", [emptyItem].concat(currentContent));
    },

    /**
    * Ember.ChosenSelectView#valueTracker
    * Observes the set value on the view to automatically trigger a chosen:updated event.
    */
    valueTracker: function(){
      // User Ember.run.next to ensure the update doesn't happen too early.
      Ember.run.next(this, function(){
        this.$().trigger("chosen:updated");
      });
    }.observes("value", "disabled"),


    /////////////
    //! Events //
    /////////////

    /**
    * Ember.ChosenSelectView#willInsertElement
    * Populates #settings for later initialization.
    */
    willInsertElement: function(){
      this.set("settings", this.getProperties(
        "allow_single_deselect",
        "disable_search",
        "disable_search_threshold",
        "enable_split_word_search",
        "inherit_select_classes",
        "max_selected_options",
        "no_results_text",
        "placeholder_text_multiple",
        "placeholder_text_single",
        "search_contains",
        "single_backstroke_delete",
        "width",
        "display_disabled_options",
        "display_selected_options"
      ));

      return this.get("settings");
    },

    /**
    * Ember.ChosenSelectView#willInsertElement
    * Initializes the chosen select box.
    */
    didInsertElement: function(){
      var that = this;

      if( this.$().chosen === undefined ){
        console.error("Ember.ChosenSelectView: Unable to initialize. jQuery Chosen not found. Please aquire Chosen plugin: https://github.com/harvesthq/chosen");
      } else {
        this.$().chosen(this.get("settings"));

        if( this.get('commitAction') ){
          var that = this;
          
          this.$().on('change', function(){
            that.executeCommitAction();
          });
        }
      }
    },

    /**
    * Ember.ChosenSelectView#executeCommitAction
    * Executes commit action on the change event of the select box.
    * Must be an event on the controller that is assigned to the view.
    */
    executeCommitAction: function(){
      var that = this;
      if( that.get("commitAction") !== null ){
        that.triggerAction({
          target: that.get("controller"),
          action: that.get("commitAction")
        });
      }
    },

    /**
    * Ember.ChosenSelectView#willInsertElement
    * Destroys the chosen select box on view teardown.
    */
    willDestroyElement: function(){
      if( this.$().chosen !== undefined ){
        this.$().chosen("destroy");
      }
    }
  }
);
