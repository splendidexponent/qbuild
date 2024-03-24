const test = require('node:test');
const assert = require('node:assert/strict');
const qbuild = require('../../index.js');

test('Deletes from the table', async ()=>{
  const success = await qbuild.delete('Hello');

  assert.strictEqual(success, true);
  assert.strictEqual(qbuild.lastStatement, `DELETE FROM Hello;`);

  const records = await qbuild.select('Hello');
  assert.strictEqual(records.length, 0);
});
