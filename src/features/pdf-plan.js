// PDF için veri hazırlama hazır; PDF üretimi/indirme ve fontlar henüz yok.
import {datesBetween} from '../domain.js';
export function preparePdfPlan(trip){
 return {title:trip.name,city:trip.city,start:trip.start,end:trip.end,
  days:datesBetween(trip.start,trip.end).map((date,index)=>({date,number:index+1,
   stops:trip.stops.filter(s=>s.date===date).slice().sort((a,b)=>a.time.localeCompare(b.time)).map(s=>({place:s.place,time:s.time,note:s.note||''}))}))};
}
