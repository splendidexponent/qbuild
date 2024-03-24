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
