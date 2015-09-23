import Ember from 'ember';

export default Ember.Route.extend({
  categorySlugToId(slug) {
    const categories = this.store.peekAll('category');
    let category;
    categories.forEach((c) => {
      if (c.get('slug') === slug) {
        category = c;
      }
    });
    if (category) {
      return category.get('id');
    }
  },
  model(params) {
    debugger;
    const category = this.categorySlugToId(params.category);
    return this.store.query('product', { category: category });
  }
});
