const test = require('node:test');
const assert = require('node:assert/strict');
const qbuild = require('../../index.js');

test('selects from a table', async ()=>{
  const records = await qbuild.select('Hello', ['name']);

  assert.strictEqual(typeof records, 'object');
  assert.strictEqual(records[0].name, 'ABCD');
  assert.strictEqual(qbuild.lastStatement, `SELECT name AS name FROM Hello;`);
});

test('selects * from a table', async ()=>{
  const records = await qbuild.select('Hello');

  assert.strictEqual(typeof records, 'object');
  assert.strictEqual(records[0].name, 'ABCD');
  assert.strictEqual(qbuild.lastStatement, `SELECT * FROM Hello;`);
});
