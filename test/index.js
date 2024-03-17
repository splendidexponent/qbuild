const test = require('node:test');
const assert = require('node:assert/strict');

test('synchronous passing test', (t) => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1);
});
