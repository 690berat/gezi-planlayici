// Bütçe kuralları hazır; form ve kayıt bağlantısı sonraki aşama.
const categories=['transport','accommodation','food','other'];
export function calculateBudget(values={}) {
 let cents=0;
 for(const key of categories){
  const raw=values[key]===undefined?0:values[key];
  if(typeof raw!=='number'&&typeof raw!=='string')throw new Error('Geçersiz gider.');
  const text=String(raw).trim().replace(',','.');
  if(!/^\d+(?:\.\d{1,2})?$/.test(text))throw new Error('Giderler negatif olmayan, en fazla iki ondalıklı sayılar olmalıdır.');
  const amount=Math.round(Number(text)*100);
  if(!Number.isSafeInteger(amount)||!Number.isSafeInteger(cents+amount))throw new Error('Tutar çok büyük.');
  cents+=amount;
 }
 return cents/100;
}
