import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('categories', function() {
    this.route('show');
  });
  this.route('categories.show', { path: '/categories/:slug' });
  this.route('products', { path: '/categories/:slug/products' });
});

export default Router;
