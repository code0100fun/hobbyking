/* globals S */
import Ember from 'ember';
import DS from 'ember-data';

function extractArray(doc) {
  const products = [];

  debugger;
  toArray(Ember.$(".products-content ul li", doc)).forEach((el) => {
    const $a = Ember.$(el).find('a');
    const href = $a.attr('href');
    const category = ~~href.match(/idparentcat=(\d+)/)[1];
    let id = ~~href.match(/idproduct=(\d+)/)[1];
    const name = $a.find('.ui-li-desc').text();
    const slug = slugify(name);
    const price = $a.find('.ui-li-aside.ui-li-desc').text();
    const rating = 0;
    const comments = ~~$a.find('h2').text().split(' - ')[1];
    const image = $a.find('img').attr('src');
    products.push({
      id, name, slug, price, rating, comments, image, category
    });
  });

  return { products };
}

function slugify(str) {
  return S(str).slugify().s;
}

function toArray(arr) {
  return [].map.call(arr, item => item);
}

export default DS.RESTSerializer.extend({
  normalizeArrayResponse(store, type, payload) {
    debugger;
    payload = extractArray(payload);
    return this._super(store, type, payload);
  }
});
