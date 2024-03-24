const test = require('node:test');
const assert = require('node:assert/strict');
const qbuild = require('../../index.js');

test('Updates the table', async ()=>{
  const success = await qbuild.update('Hello', {
    name: 'ZXCV'
  });

  assert.strictEqual(success, true);
  assert.strictEqual(qbuild.lastStatement, `UPDATE Hello SET name = "ZXCV";`);

  const records = await qbuild.select('Hello');
  assert.strictEqual(records[0].name, 'ZXCV');
});
