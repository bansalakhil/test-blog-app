App.User = DS.Model.extend({
  name: DS.attr('string'),
  bio: DS.attr('string'),
  url: DS.attr('string', {readOnly: true})
})
