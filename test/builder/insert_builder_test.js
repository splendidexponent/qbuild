const test = require('node:test');
const assert = require('node:assert/strict');
const qbuild = require('../../index.js');

test('inserts into a table', async ()=>{
  const success = await qbuild.insert('Hello', {
    name: 'ABCD'
  });

  assert.strictEqual(success, true);
  assert.strictEqual(qbuild.lastStatement, `INSERT INTO Hello ( name ) VALUES ( "ABCD" );`);
});

test('successfully fails to insert', async ()=>{
  const fail = await qbuild.insert('Hello', {
    name: null
  });

  assert.strictEqual(fail, false);
  assert.strictEqual(qbuild.lastStatement, "INSERT INTO Hello ( name ) VALUES ( null );");
  assert.strictEqual(qbuild.lastErrorMessage, "SQLITE_CONSTRAINT: NOT NULL constraint failed: Hello.name");
});
