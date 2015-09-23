import Ember from 'ember';
import DS from 'ember-data';
import config from 'hobbyking/config/environment';

export default DS.Adapter.extend({
  proxy: config.APP.CORS_PROXY,
  host: 'http://www.hobbyking.com/mobile',

  findAll(store, type) {
    return this.query(store, type);
  },

  buildUrl(query) { },

  query(store, type, query = {}) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      let path = this.buildUrl(query);
      const url = this.corsUrl(path);
      const options = {
        url,
        dataType: 'text/plain',
        success: function(payload, textStatus, jqXHR) {
          Ember.run(null, resolve, payload);
        },
        error: function(jqXHR) {
          if (jqXHR.status == 200 ) {
            Ember.run(null, resolve, jqXHR.responseText);
          }
        }
      };
      Ember.$.ajax(options);
    });
  },

  corsUrl(path) {
    var parts = [];

    if (this.get("proxy")) {
      parts.push( this.get("proxy").replace(/\/$/, "") );
    }

    if (this.get("host")) {
      parts.push( this.get("host").replace(/\/$/, "") );
    }

    if (!parts.length) {
      parts.push("");
    }

    parts.push(path);

    return parts.join("/");
  },
});
