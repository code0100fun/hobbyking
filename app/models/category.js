import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  slug: DS.attr(),
  parent: DS.belongsTo('category', { inverse: 'categories' }),
  categories: DS.hasMany('category', { inverse: 'parent' })
});
