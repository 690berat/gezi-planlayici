import React,{useState} from 'react';
import{MAX_TRIP_NOTE_LENGTH}from'./notes.js';
export default function TripNote({trip,onSave}){
 const[draft,setDraft]=useState(trip.generalNote||'');
 const[message,setMessage]=useState('');
 const[failed,setFailed]=useState(false);
 function persist(value){
  const result=onSave(value);
  setFailed(!result);
  if(result){setDraft(value.trim());setMessage(value.trim()?'Gezi notun kaydedildi.':'Gezi notun temizlendi.')}else setMessage('Not kaydedilemedi. Tarayıcı depolama alanını kontrol et.');
 }
 function clear(){if(!window.confirm('Bu gezinin genel notunu temizlemek istediğine emin misin?'))return;persist('')}
 return <section className="trip-note" aria-labelledby="trip-note-title"><div className="note-heading"><div><span className="eyebrow">YOLA ÇIKMADAN ÖNCE</span><h3 id="trip-note-title">Gezi notların</h3><p>Hazırlıklarını ve hatırlamak istediklerini bu gezi için sakla.</p></div><span className="note-symbol" aria-hidden="true">✎</span></div><form onSubmit={e=>{e.preventDefault();persist(draft)}}><label htmlFor="general-trip-note">Genel gezi notu</label><textarea id="general-trip-note" value={draft} onChange={e=>{setDraft(e.target.value);setMessage('')}} maxLength={MAX_TRIP_NOTE_LENGTH} placeholder="Yanına alacakların, bilet bilgileri veya küçük hatırlatmalar…"/><div className="note-bottom"><span className="note-counter">{draft.length} / {MAX_TRIP_NOTE_LENGTH}</span><div className="note-buttons"><button type="button" className="note-clear" disabled={!draft&&!trip.generalNote} onClick={clear}>Temizle</button><button type="submit" className="btn dark">Notu kaydet</button></div></div><p role={failed?'alert':'status'} className={'note-message'+(failed?' failed':'')}>{message}</p></form></section>
}
