import ProxyBase from './proxy-base';

export default ProxyBase.extend({
  buildUrl(query) {
    debugger;
    return `/products.asp?idparentcat=${query.category}`;
  }
});
