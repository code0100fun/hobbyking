import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const slug = params.slug;
    return this.store.queryRecord('category', { category: slug }).then((category) => {
      return category;
    });
  }
});
