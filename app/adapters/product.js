import ProxyBase from './proxy-base';

export default ProxyBase.extend({
  buildUrl(query) {
    return `/products.asp?idparentcat=${query.category}`;
  }
});
