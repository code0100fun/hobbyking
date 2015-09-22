import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  slug: DS.attr(),
  parent: DS.belongsTo('category', { inverse: 'categories' }),
  categories: DS.hasMany('category', { inverse: 'parent' }),
  slugChain: Ember.computed('parent', function() {
    const slugs = [];
    let parent = this.get('parent');
    slugs.unshift(this.get('slug'));
    while (parent) {
      const slug = parent.get('slug');
      if (slug && slug !== 'root') {
        slugs.unshift(slug);
      }
      parent = parent.get('parent');
    }
    return slugs.join('/');
  })
});
