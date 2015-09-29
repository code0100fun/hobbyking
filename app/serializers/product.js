/* globals S */
import Ember from 'ember';
import DS from 'ember-data';

function extractArray(doc) {
  const products = [];

  toArray(Ember.$(".products-content ul li", doc)).forEach((el) => {
    const $el = Ember.$(el);
    const $a = $el.find('a');
    const href = $a.attr('href');
    const category = ~~href.match(/idparentcat=(\d+)/)[1];
    let id = ~~href.match(/idproduct=(\d+)/)[1];
    const name = $el.find('p:first').text();
    const slug = slugify(name);
    const price = $el.find('p:last').text();
    const rating = 0;
    const comments = ~~$el.find('h2').text().split(' - ')[1];
    const image = $el.find('img').attr('src');
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
    payload = extractArray(payload);
    return this._super(store, type, payload);
  }
});
