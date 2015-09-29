import Ember from 'ember';
import DS from 'ember-data';
import config from 'hobbyking/config/environment';
import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default DS.Adapter.extend({
  proxy: config.APP.CORS_PROXY,
  host: 'http://www.hobbyking.com/mobile',

  findAll(store, type) {
    const cacheKey = `model:${type.modelName}`;
    return new Ember.RSVP.Promise((resolve, reject) => {
      self.localforage.getItem(cacheKey).then((payload) => {
        if (payload) {
          Ember.run(null, resolve, payload);
        } else {
          this.query(store, type).then((payload) => {
            self.localforage.setItem(cacheKey, payload).then(() => {
              Ember.run(null, resolve, payload);
            });
          })
        }
      });
    });
  },

  buildUrl(query) { /* implement in child adapter */ },

  queryCache(cacheKey) {
    return new Ember.RSVP.Promise((resolve) => {
      self.localforage.getItem(cacheKey).then((payload) => {
        resolve(payload);
      });
    });
  },

  cache(cacheKey, payload) {
    return new Ember.RSVP.Promise((resolve) => {
      self.localforage.setItem(cacheKey, payload).then((payload) => {
        resolve(payload);
      });
    });
  },

  fetch(path) {
    return new Ember.RSVP.Promise((resolve) => {
      const url = this.corsUrl(path);
      const options = {
        url,
        dataType: 'text/plain',
        success: function(payload, textStatus, jqXHR) {
          resolve(payload);
        },
        error: function(jqXHR) {
          if (jqXHR.status == 200 ) {
            resolve(jqXHR.responseText);
          }
        }
      };
      Ember.$.ajax(options);
    });
  },

  query(store, type, query = {}) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let path = this.buildUrl(query);
      this.queryCache(path).then((payload) => {
        if (payload) {
          return payload;
        } else {
          return this.fetch(path);
        }
      }).then((payload) => {
        return this.cache(path, payload);
      }).then((payload) => {
        Ember.run(null, resolve, payload);
      });
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
