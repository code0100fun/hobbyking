import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      name: 'RC Model Cars'
    },{
      name: 'Multirotors'
    }];
  }
});
