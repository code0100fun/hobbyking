export default function() {
  this.namespace = 'api';

  this.get('/categories', function(db, request) {
    if (request.queryParams.topLevel) {
      const top = db.categories.filter((category) => {
        return !category.category;
      });
      return { categories: top };
    } else if (request.queryParams.category) {
      const parent = db.categories.where({ slug: request.queryParams.category })[0];
      const subcategories = db.categories.filter((category) => {
        return parent.categories && parent.categories.indexOf(category.id) !== -1;
      });
      return {
        category: parent,
        categories: subcategories
      };
    }
  });
}
