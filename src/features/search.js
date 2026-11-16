// Gezi arama ve durum filtreleme kuralları; arayüzde birlikte kullanılır.
const normalize=value=>String(value??'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').trim();
export function selectTrips(trips,{query='',status='all',today}={}){
 if(!['all','upcoming','ongoing','completed'].includes(status))throw new Error('Geçersiz durum filtresi.');
 if(status!=='all'&&!/^\d{4}-\d{2}-\d{2}$/.test(today||''))throw new Error('Filtre için tarih gerekli.');
 const q=normalize(query);
 return trips.filter(t=>{
  const matches=!q||normalize(t.name).includes(q)||normalize(t.city).includes(q);
  const state=today<t.start?'upcoming':today>t.end?'completed':'ongoing';
  return matches&&(status==='all'||status===state);
 });
}
