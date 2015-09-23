import { moduleForModel, test } from 'ember-qunit';

moduleForModel('proxy-base', 'Unit | Serializer | proxy base', {
  // Specify the other units that are required for this test.
  needs: ['serializer:proxy-base']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
