import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  slug: DS.attr(),
  price: DS.attr(),
  category: DS.belongsTo('category'),
  rating: DS.attr('number'),
  comments: DS.attr('number'),
  image: DS.attr()
});
