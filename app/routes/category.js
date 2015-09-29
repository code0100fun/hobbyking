import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('category', { id: params.id });
  },
  afterModel(model) {
    return this.store.query('product', { category: model.get('id') });
  },
  serialize(model) {
    return { category: model.get('id') };
  }
});
