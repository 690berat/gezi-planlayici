import{test}from'node:test';import assert from'node:assert/strict';import{calculateBudget}from'./budget.js';
test('giderler kuruş hassasiyetinde toplanır',()=>{assert.equal(calculateBudget({transport:1000,accommodation:2000,food:500}),3500);assert.equal(calculateBudget({food:'0,10',other:'0.20'}),0.3)});
test('negatif ve geçersiz tutarlar reddedilir',()=>{for(const v of [-1,'abc',Infinity,'1.234',null])assert.throws(()=>calculateBudget({food:v}));});
