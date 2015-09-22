import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('categories');
  this.route('categories', { path: '/categories/*slugs'});
});

export default Router;
