import Ember from 'ember';
import DS from 'ember-data';
import config from 'hobbyking/config/environment';

export default DS.Adapter.extend({
  proxy: config.APP.CORS_PROXY,
  host: 'http://www.hobbyking.com/mobile',

  findAll(store, type) {
    return this.query(store, type);
  },

  query(store, type, query = {}) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      const parentCategory = query.category;
      let path = '/categories.asp';
      path = parentCategory ? `${path}?idparentcat=${parentCategory}` : path;
      const url = this.corsUrl(path);
      const options = {
        url,
        success: function(payload, textStatus, jqXHR) {
          Ember.run(null, resolve, payload);
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
