import Ember from 'ember';

export default Ember.Route.extend({
  slugToId(slug) {
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
  findSubCategories(id) {
    return this.store.query('category', { category: id });
  },
  model(params, transition) {
    let id, slug;
    const slugs = params.slugs && params.slugs.split('/');
    if (!slugs || !slugs.length) {
      return this.store.findAll('category');
    }
    let promise = Ember.RSVP.resolve([]);
    slugs.unshift('root');
    slugs.forEach((s) => {
      promise = promise.then((categories) => {
        slug = s;
        id = this.slugToId(slug);
        if (id) {
          return this.findSubCategories(id);
        } else {
          return this.store.findAll('category').then(() => {
            id = this.slugToId(slug);
            return this.findSubCategories(id);
          });
        }
      });
    });
    return promise.then((categories) => {
      if (!categories.get('length')) {
        // transition.abort();
        this.redirectTo('products', { category: id });
      }
      return categories;
    });
  }
});
