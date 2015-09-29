/* global S */

function slug(str) {
  return S(str).slugify().s;
}

function category(title) {
  return { name: title, slug: slug(title) };
}

export default function(server) {
  server.create('category', category('Coming Soon'));
  server.create('category', category('Planes & Parts'));
}
