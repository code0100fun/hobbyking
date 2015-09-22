import Ember from 'ember';
import DS from 'ember-data';

function extractArray(doc) {
  const categories = [];

  toArray(Ember.$(".categories-content ul li", doc)).forEach((el) => {
    const $a = Ember.$(el).find('a');
    const id = ~~$a.attr('href').match(/idparentcat=(\d+)/)[1];
    categories.push({
      id: id,
      name: $a.text()
    });
  });

  return { categories };
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
