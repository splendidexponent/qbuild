const test = require('node:test');
const assert = require('node:assert/strict');
const qbuild = require('../index.js');

test('disconnects the database', ()=>{
  qbuild.connect();
  qbuild.disconnect();
});

test('connects to the database', ()=>{
  qbuild.connect();
});

test('creates a table', async ()=>{
  const success = await qbuild.createTable('Hello', (table)=>{
    table.string('name');
  });

  assert.strictEqual(success, true);
  assert.strictEqual(qbuild.lastStatement, "CREATE TABLE Hello ( name string NOT NULL );");
});

test('fails to create a table', async ()=>{
  const fail = await qbuild.createTable('Hello', (table)=>{
    table.string('name');
  });

  assert.strictEqual(fail, false);
  assert.strictEqual(qbuild.lastErrorMessage, "SQLITE_ERROR: table Hello already exists");
});
