import{test}from'node:test';import assert from'node:assert/strict';import{selectTrips}from'./search.js';
const trips=[{id:1,name:'ŞEHİR GEZİSİ',city:'İstanbul',start:'2026-12-05',end:'2026-12-07'},{id:2,name:'Tarih',city:'Şanlıurfa',start:'2026-12-01',end:'2026-12-03'}];
test('Türkçe şehir araması ve durum birlikte uygulanır',()=>{assert.equal(selectTrips(trips,{query:'istanbul',status:'ongoing',today:'2026-12-05'})[0].id,1);assert.equal(selectTrips(trips,{query:'şanlıurfa',status:'upcoming',today:'2026-12-05'}).length,0)});
test('bitiş günü devam eder, sonraki gün tamamlanır',()=>{assert.equal(selectTrips(trips,{status:'ongoing',today:'2026-12-07'}).length,1);assert.equal(selectTrips(trips,{status:'completed',today:'2026-12-08'}).length,2);assert.equal(trips.length,2)});

test('gezi adında büyük küçük harf ve boşluk duyarsız arama',()=>{assert.equal(selectTrips(trips,{query:' şehir gezisi '})[0].id,1);assert.equal(selectTrips(trips,{query:'İSTANBUL'})[0].id,1)});
test('eşleşmeyen arama boş liste verir, temizlemek tümünü getirir',()=>{assert.deepEqual(selectTrips(trips,{query:'olmayan şehir'}),[]);assert.equal(selectTrips(trips,{query:'',status:'all'}).length,2)});
test('başlangıç ve bitiş sınırları doğru filtrelenir',()=>{assert.equal(selectTrips(trips,{status:'upcoming',today:'2026-11-30'}).length,2);assert.equal(selectTrips(trips,{status:'ongoing',today:'2026-12-01'})[0].id,2);assert.equal(selectTrips(trips,{status:'completed',today:'2026-12-04'})[0].id,2)});
