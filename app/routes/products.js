import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('category', { category: params.slug }).then((category) => {
      return category.get('products');
    });
  }
});
