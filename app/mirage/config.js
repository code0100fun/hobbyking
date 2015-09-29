export default function() {
  this.namespace = 'api';

  this.get('/categories', function(db) {
    return { categories: db.categories };
  });
}
