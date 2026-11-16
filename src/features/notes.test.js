import{test}from'node:test';import assert from'node:assert/strict';import{updateTripNote}from'./notes.js';
test('not güncelleme ve temizleme geziyi ve durakları korur',()=>{const t={id:1,stops:[{id:'a'}]};const next=updateTripNote(t,' Bilet al ');assert.equal(next.generalNote,'Bilet al');assert.deepEqual(next.stops,t.stops);assert.equal(t.generalNote,undefined);assert.equal(updateTripNote(next,'').generalNote,'')});
test('aşırı uzun not reddedilir',()=>assert.throws(()=>updateTripNote({},'a'.repeat(2001))));
