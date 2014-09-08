App.Post = DS.Model.extend({
  title: DS.attr('string'),
  excerpt: DS.attr('string'),
  content: DS.attr('string'),
  image_url: DS.attr('string', { defaultValue: App.PostDefaultImageURL}),
  updated_at: DS.attr('date'),
  url: DS.attr('string', {readOnly: true}),

  user: DS.belongsTo('user' )
})
