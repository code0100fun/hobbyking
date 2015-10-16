/* global S */

function slug(str) {
  return S(str).slugify().s;
}

function category(title, categories) {
  const attrs = { name: title, slug: slug(title) };
  if (categories) {
    attrs.categories = categories.mapBy('id');
  }
  return attrs;
}

export default function(server) {
  const categories = {
    'Coming Soon': [],
    'Multi-Rotors & Parts': ['Speed Controller (ESC)', 'Flight Controllers'],
    'Flight Controllers': [],
    'Speed Controller (ESC)': ['Turnigy MultiStar', 'ZTW']
  };

  const products = {
    'Coming Soon': [{ name: 'Test' }],
    'Flight Controllers': [{ name: 'CC3D Atom', price: '$25.00' }],
    'Turnigy MultiStar': [{ name: 'Turnigy 12A ESC', price: '$36.00' }],
    'ZTW': [{ name: 'ZTW 30A ESC' }]
  };

  for (let parentName of Object.keys(categories)) {
    const subNames = categories[parentName];
    const subcategories = subNames.map((name) => {
      let subcategory = server.db.categories.where({ slug: slug(name) })[0];
      if (subcategory) {
        return subcategory;
      }
      return server.create('category', category(name));
    });
    let parent = server.db.categories.where({ slug: slug(parentName) })[0];
    if (parent) {
      const categories = subcategories.mapBy('id');
      server.db.categories.update(parent.id, { categories });
    } else {
      parent = server.create('category', category(parentName, subcategories));
    }
    subcategories.forEach((category) => {
      server.db.categories.update(category.id, { category: parent.id });
    });
  }

  for (let categoryName of Object.keys(products)) {
    const catProductNames = products[categoryName];
    const category = server.db.categories.where({ slug: slug(categoryName) })[0];
    const catProducts = catProductNames.map((product) => {
      return server.create('product', { name: product.name, category: category.id });
    });
    server.db.categories.update(category.id, { products: catProducts.mapBy('id') });
  }
}
