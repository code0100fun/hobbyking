export default function() {
  this.transition(
    this.fromRoute('categories'),
    this.toRoute('categories.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('categories.show'),
    this.toRoute('products'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.withinRoute('categories.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('categories'),
    this.toRoute('products'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}