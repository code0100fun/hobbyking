import ProxyBase from './proxy-base';

export default ProxyBase.extend({
  buildUrl(query) {
    const parentCategory = query.category;
    let path = '/categories.asp';
    return parentCategory ? `${path}?idparentcat=${parentCategory}` : path;
  }
});
