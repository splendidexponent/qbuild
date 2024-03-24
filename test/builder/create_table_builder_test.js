const test = require('node:test');
const assert = require('node:assert/strict');
const qbuild = require('../../index.js');

test('creates a table', async ()=>{
  const success = await qbuild.createTable('Hello', (table)=>{
    table.string('name');
  });

  assert.strictEqual(success, true);
  assert.strictEqual(qbuild.lastStatement, "CREATE TABLE Hello ( name string NOT NULL );");
});

test('successfully fails to create a table', async ()=>{
  const fail = await qbuild.createTable('Hello', (table)=>{
    table.string('name');
  });

  assert.strictEqual(fail, false);
  assert.strictEqual(qbuild.lastStatement, "CREATE TABLE Hello ( name string NOT NULL );");
  assert.strictEqual(qbuild.lastErrorMessage, "SQLITE_ERROR: table Hello already exists");
});
