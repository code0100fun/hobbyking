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
}
