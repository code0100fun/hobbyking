import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('categories');
  this.route('categories', { path: '/categories/*slugs' });
  this.route('products', { path: '/products/:category' });
  this.route('category');
});

export default Router;
