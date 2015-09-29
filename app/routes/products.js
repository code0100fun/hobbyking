import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('product', { category: params.category });
  }
});
