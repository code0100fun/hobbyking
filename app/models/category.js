import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr(),
  slug: DS.attr(),
  parent: DS.belongsTo('category', { inverse: 'categories' }),
  categories: DS.hasMany('category', { inverse: 'parent' }),
  products: DS.hasMany('product', { inverse: 'category' }),
  nextRoute: Ember.computed('categories.length', function() {
    if (this.get('categories.length')) {
      return 'categories.show';
    } else {
      return 'products';
    }
  })
});
