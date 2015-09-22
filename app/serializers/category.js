import Ember from 'ember';
import DS from 'ember-data';

function extractArray(doc) {
  const categories = [];

  toArray(Ember.$(".categories-content ul li", doc)).forEach((el) => {
    const $a = Ember.$(el).find('a');
    const href = $a.attr('href');
    const id = ~~href.match(/idparentcat=(\d+)/)[1];
    let parentId = ~~href.match(/pparent=(\d+)/)[1];
    if (parentId === id) {
      parentId = null;
    }
    const name = $a.text();
    const slug = slugify(name);
    categories.push({
      id, name, slug, parent: parentId
    });
  });

  return { categories };
}

function slugify(str) {
  return S(str).slugify().s;
}

function toArray(arr) {
  return [].map.call(arr, item => item);
}

export default DS.RESTSerializer.extend({
  normalizeArrayResponse(store, type, payload) {
    payload = extractArray(payload);
    return this._super(store, type, payload);
  }
});
