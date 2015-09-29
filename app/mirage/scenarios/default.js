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
    'Planes & Parts': ['All Planes']
  };

  for (let topLevel of Object.keys(categories)) {
    const subNames = categories[topLevel];
    const subcategories = subNames.map((name) => {
      return server.create('category', category(name));
    });
    const parent = server.create('category', category(topLevel, subcategories));
    subcategories.forEach((category) => {
      server.db.categories.update(category.id, { category: parent.id });
    });
  }
}
