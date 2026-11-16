import React,{useState} from 'react';
import{createRoot}from'react-dom/client';
import{datesBetween,validateTrip,validateStop,sceneFor,tripStatus}from'./domain';
import Scene from'./scenes';
import{selectTrips}from'./features/search.js';
import'./style.css';
const KEY='gezi-planlayici-v1';
const DATE=/^\d{4}-\d{2}-\d{2}$/;
function read(){try{const a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a.filter(t=>t.id&&typeof t.name==='string'&&typeof t.city==='string'&&DATE.test(t.start)&&DATE.test(t.end)&&!validateTrip(t)&&Array.isArray(t.stops)):[]}catch{return[]}}
const pretty=d=>new Date(d+'T12:00:00').toLocaleDateString('tr-TR',{day:'numeric',month:'long'});
const today=()=>new Date().toLocaleDateString('sv-SE');
const IDEAS=[
  {city:'Kapadokya',name:'Kapadokya balon sabahı',text:'Gün doğarken vadinin üstünde süzül.',kind:'kapadokya'},
  {city:'Antalya',name:'Akdeniz kıyı rotası',text:'Koylar, kale içi ve gün batımı.',kind:'sahil'},
  {city:'Şanlıurfa',name:'Urfa keşif rotası',text:'Göbeklitepe’den Balıklıgöl’e.',kind:'tarih'},
  {city:'Trabzon',name:'Karadeniz yaylaları',text:'Sis, çay bahçeleri ve yeşil yamaçlar.',kind:'dag'},
  {city:'İstanbul',name:'İstanbul tarihi yarımada',text:'Ayasofya’dan tarihi sokaklara uzanan bir rota.',kind:'istanbul'},
  {city:'İzmir',title:'Efes',name:'Efes antik kent rotası',text:'Antik yolların izinde, Celsus Kütüphanesi’ne.',kind:'efes'},
  {city:'Mardin',name:'Mardin taş sokaklar rotası',text:'Taş evler ve Mezopotamya’ya açılan manzaralar.',kind:'mardin'},
  {city:'Adıyaman',title:'Nemrut',name:'Nemrut tarihi keşif rotası',text:'Zirvede anıtsal heykellerle tarihe yolculuk.',kind:'nemrut'}
];
function Pass({t,on,select,edit,remove}){
  const n=datesBetween(t.start,t.end).length;
  return<article className={'trip-card'+(on?' current':'')}><button className={'pass'+(on?' on':'')} aria-pressed={on} onClick={select}>
    <Scene kind={sceneFor(t.city)} uid={'p'+t.id}/>
    <span className="pass-body">
      <span className="pass-label">SEYAHAT PLANI</span><span className="pass-city">{t.city}</span>
      <strong>{t.name}</strong>
      <span className="pass-dates">◷ {pretty(t.start)} – {pretty(t.end)}</span>
      <span className="pass-foot"><span>{n} gün · {t.stops.length} durak</span><em>{tripStatus(t,today())}</em></span><span className="pass-open">{on?'Planın açık':'Rotayı keşfet'} <span>↗</span></span>
    </span>
  </button><div className="card-actions"><button onClick={edit} aria-label={t.name+' gezisini düzenle'}>✎ Düzenle</button><button className="delete-action" onClick={remove} aria-label={t.name+' gezisini sil'}>Sil</button></div></article>;
}
function App(){
  const[trips,setTrips]=useState(read);
  const[query,setQuery]=useState('');
  const[statusFilter,setStatusFilter]=useState('all');
  const filteredTrips=selectTrips(trips,{query,status:statusFilter,today:today()});
  const[selected,setSelected]=useState(()=>trips[0]?.id);
  const[modal,setModal]=useState(false);
  const[prefill,setPrefill]=useState({});
  const[day,setDay]=useState('');
  const[editingStop,setEditingStop]=useState(null);
  const[formVersion,setFormVersion]=useState(0);
  const[error,setError]=useState('');
  const[notice,setNotice]=useState('');
  const trip=trips.find(t=>t.id===selected);
  const days=trip?datesBetween(trip.start,trip.end):[];
  const activeDay=trip&&days.includes(day)?day:trip?.start;
  const openModal=(p={})=>{setPrefill(p);setModal(true);setError('')};
  function save(next){try{localStorage.setItem(KEY,JSON.stringify(next));setTrips(next);return true}catch{setError('Kayıt yapılamadı. Tarayıcı depolama alanını kontrol et.');return false}}
  function pick(t){setEditingStop(null);setSelected(t.id);setDay(t.start);setError('');setNotice('');setTimeout(()=>document.getElementById('plan')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}),50)}
  function addTrip(e){
    e.preventDefault();const f=Object.fromEntries(new FormData(e.currentTarget));const msg=validateTrip(f);
    if(msg){setError(msg);return}
    const existing=prefill.id?trips.find(t=>t.id===prefill.id):null;
    if(existing?.stops.some(s=>s.date<f.start||s.date>f.end)){setError('Yeni tarih aralığı mevcut durakların tarihlerini de içermelidir. Durakların kaybolmaması için tarih aralığını genişletiniz.');return}
    const t=existing?{...existing,...f}:{...f,id:crypto.randomUUID(),stops:[]};
    const next=existing?trips.map(x=>x.id===t.id?t:x):[...trips,t];
    if(save(next)){setQuery('');setStatusFilter('all');setEditingStop(null);setSelected(t.id);setDay(t.start);setModal(false);setError('');setNotice(existing?'Gezi bilgilerin güncellendi.':'Gezin oluşturuldu. Şimdi ilk durağını ekleyebilirsin.')}
  }
  function deleteTrip(t){
    if(!window.confirm('“'+t.name+'” gezisini ve bu geziye ait tüm durakları silmek istediğine emin misin?'))return;
    const next=trips.filter(x=>x.id!==t.id);
    if(save(next)){setEditingStop(null);if(selected===t.id){setSelected(next[0]?.id);setDay(next[0]?.start||'')}setError('');setNotice('Gezi silindi.')}
  }
  function addStop(e){
    e.preventDefault();const f={...Object.fromEntries(new FormData(e.currentTarget)),date:activeDay};
    const msg=validateStop(trip,f);if(msg){setError(msg);return}
    const id=editingStop?.id;
    const next=trips.map(t=>t.id===trip.id?{...t,stops:id?t.stops.map(s=>s.id===id?{...s,...f}:s):[...t.stops,{...f,id:crypto.randomUUID()}]}:t);
    if(save(next)){setEditingStop(null);setFormVersion(v=>v+1);setError('');setNotice(id?'Durak bilgileri güncellendi.':'Durak günlük planına eklendi.')}
  }
  function editStop(stop){setEditingStop(stop);setError('');setTimeout(()=>{document.getElementById('stop-form')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});document.getElementById('stop-place')?.focus({preventScroll:true})},50)}
  function deleteStop(stop){
    if(!window.confirm('“'+stop.place+'” durağını silmek istediğine emin misin?'))return;
    if(save(trips.map(t=>t.id===trip.id?{...t,stops:t.stops.filter(s=>s.id!==stop.id)}:t))){if(editingStop?.id===stop.id)setEditingStop(null);setError('');setNotice('Durak silindi.')}
  }
  const stops=trip?trip.stops.filter(s=>s.date===activeDay).sort((a,b)=>a.time.localeCompare(b.time)):[];
  return<div className="app">
    <section className="hero">
      <Scene kind="kapadokya" uid="hero" w={1600}/>
      <div className="top"><a className="brand" href="./"><img src="/favicon.svg" alt=""/>Gezi Planlayıcı</a><button className="btn ghost" onClick={()=>openModal()}>＋ Yeni gezi</button></div>
      <div className="hero-copy">
        <h1>Güzel bir yolculuk, iyi bir planla başlar.</h1>
        <p>Gitmek istediğin yerleri günlere böl, her durağı saatiyle yaz. Tüm rotan tek yerde, cebinde.</p>
        <button className="btn" onClick={()=>openModal()}>Yeni gezi oluştur</button>
      </div>
    </section>
    <main className="wrap">
      <div role="status" className="notice">{notice}</div>
      <section aria-labelledby="trips-title">
        <div className="sec-head"><div><span className="eyebrow">SANA AİT YOLCULUKLAR</span><h2 id="trips-title">Gezilerim <span className="count">{trips.length}</span></h2><p>{trips.length?'Planını açmak için bir gezi kartına dokun.':'Bir sonraki yolculuğuna burada yer aç.'}</p></div><button className="btn dark small" onClick={()=>openModal()}>＋ Gezi ekle</button></div>
        {trips.length>0&&<div className="trip-filters"><div className="trip-search"><label htmlFor="trip-query">Gezi veya şehir ara</label><input id="trip-query" type="search" value={query} onChange={e=>{setQuery(e.target.value);setEditingStop(null)}} placeholder="Gezi adı veya şehir giriniz" maxLength={100}/></div><div className="trip-status"><label htmlFor="trip-status">Gezi durumu</label><select id="trip-status" value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setEditingStop(null)}}><option value="all">Tüm geziler</option><option value="upcoming">Yaklaşan</option><option value="ongoing">Devam eden</option><option value="completed">Tamamlanan</option></select></div><span className="filter-count" role="status" aria-live="polite">{trips.length} geziden {filteredTrips.length} sonuç</span>{(query||statusFilter!=='all')&&<button className="clear-filters" onClick={()=>{setQuery('');setStatusFilter('all')}}>Filtreleri temizle</button>}</div>}
        {trips.length?(filteredTrips.length?<div className="passes">{filteredTrips.map(t=><Pass key={t.id} t={t} on={t.id===selected} select={()=>pick(t)} edit={()=>openModal(t)} remove={()=>deleteTrip(t)}/>)}</div>:<div className="empty search-empty"><span className="empty-compass" aria-hidden="true">⌕</span><h3>Aramana uygun gezi bulunamadı</h3><p>Başka bir gezi adı veya şehir deneyebilir, durum filtresini değiştirebilirsin.</p><button className="btn dark" onClick={()=>{setQuery('');setStatusFilter('all')}}>Tüm gezileri göster</button></div>)
        :<div className="empty"><span className="empty-compass" aria-hidden="true">↗</span><h3>İlk yolculuğunu planlayalım</h3><p>Şehrini ve tarihlerini seç, keşfetmek istediğin yerleri günlere ekle.</p><button className="btn dark" onClick={()=>openModal()}>İlk gezimi oluştur</button></div>}
      </section>
      {trip&&filteredTrips.some(t=>t.id===trip.id)&&<section id="plan" className="plan" aria-label="Gezi planı">
        <div className="banner"><Scene kind={sceneFor(trip.city)} uid={'b'+trip.id}/><div><p>{trip.city}</p><h2>{trip.name}</h2><span>{pretty(trip.start)} – {pretty(trip.end)} · {days.length} gün · {trip.stops.length} durak</span></div></div>
        <div className="workspace">
          <div className="itinerary">
            <div className="route-title"><div><span className="eyebrow">HER GÜNE YENİ BİR KEŞİF</span><h3>Günlük rotan</h3></div><span className="route-total">{stops.length} durak</span></div>
            <div className="days">{days.map((d,i)=><button key={d} className={d===activeDay?'active':''} onClick={()=>{setDay(d);setEditingStop(null);setError('')}}><strong>{i+1}. Gün</strong><small>{pretty(d)}</small></button>)}</div>
            <ol className="timeline">{stops.map(s=><li className="stop" key={s.id}><time>{s.time}</time><div className="stop-details"><h4>{s.place}</h4>{s.note&&<p>{s.note}</p>}<div className="stop-actions"><button onClick={()=>editStop(s)} aria-label={s.place+' durağını düzenle'}>Düzenle</button><button className="remove-stop" onClick={()=>deleteStop(s)} aria-label={s.place+' durağını sil'}>Sil</button></div></div></li>)}</ol>
            {!stops.length&&<div className="day-empty"><span className="empty-compass" aria-hidden="true">⌖</span><h4>Bu günün rotası henüz boş</h4><p>Yandaki formdan ilk durağını ekle.</p></div>}
          </div>
          <section className={'add-stop'+(editingStop?' is-editing':'')} id="stop-form" aria-labelledby="stop-form-title">
            <div className="stop-form-header"><div><span className="eyebrow">GÜNLÜK PLANIN</span><h3 id="stop-form-title">{editingStop?'Durağı düzenle':'Bir sonraki durağın'}</h3><div className="compact-date">{pretty(activeDay)} <span>· {days.indexOf(activeDay)+1}. gün</span></div></div><span className="stop-form-symbol" aria-hidden="true">{editingStop?'✎':'↗'}</span></div>
            
            <form onSubmit={addStop} key={trip.id+activeDay+(editingStop?.id||'new')+formVersion}>
              <label htmlFor="stop-place">Yer adı<input id="stop-place" name="place" defaultValue={editingStop?.place||''} placeholder="Ziyaret edilecek yerin adını giriniz" maxLength="100" required/></label>
              <label htmlFor="stop-time">Ziyaret saati<input id="stop-time" name="time" type="time" defaultValue={editingStop?.time||''} required/></label>
              <label htmlFor="stop-note">Kısa not <span>İsteğe bağlı</span><textarea id="stop-note" name="note" defaultValue={editingStop?.note||''} placeholder="Bu durak için hatırlamak istediklerin…" maxLength="400"/></label>
              {error&&!modal&&<p role="alert" className="error">{error}</p>}
              <button className="btn dark" type="submit">{editingStop?'Değişiklikleri kaydet':'Durağı plana ekle'} <span aria-hidden="true">↗</span></button>
              {editingStop&&<button type="button" className="cancel-edit" onClick={()=>{setEditingStop(null);setError('')}}>Düzenlemekten vazgeç</button>}
              <p className="form-hint">Planın ziyaret saatine göre otomatik sıralanır.</p>
            </form>
          </section>
        </div>
      </section>}
      {error&&!modal&&!trip&&<p role="alert" className="error">{error}</p>}
      <section aria-labelledby="ideas-title" className="ideas-sec">
        <div className="sec-head"><div><h2 id="ideas-title">Rota ilhamı</h2><p>Bir rotaya dokun, gezi formu senin için dolsun.</p></div></div>
        <div className="ideas">{IDEAS.map(i=><button key={i.city} className="idea" onClick={()=>openModal({city:i.city,name:i.name})}><Scene kind={i.kind} uid={'i'+i.kind}/><span><strong>{i.title||i.city}</strong><small>{i.text}</small></span></button>)}</div>
      </section>
    </main>
    <footer><span>Gezi Planlayıcı</span><span>Tasarlayıcı: <strong>Berat Kolsuzoğlu</strong></span></footer>
    {modal&&<div className="overlay" onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button aria-label="Kapat" className="close" onClick={()=>setModal(false)}>×</button>
        <div className="modal-cover"><Scene kind={sceneFor(prefill.city||'Kapadokya')} uid="modal"/><span>YENİ YERLER, YENİ ANILAR</span></div><div className="modal-body"><span className="eyebrow">YOLCULUĞUN BURADA BAŞLASIN</span><h2 id="dialog-title">{prefill.id?'Gezini düzenle':'Nereye gidiyoruz?'}</h2>
        <p>{prefill.id?'Gezi adını, şehrini veya tarihlerini güncelleyebilirsin.':'Yolculuğuna bir isim ver, gerisini birlikte planlayalım.'}</p>
        <form onSubmit={addTrip}>
          <label>Gezi adı<input autoFocus name="name" defaultValue={prefill.name} placeholder="Gezi adını giriniz" maxLength="80" required/></label>
          <label>Şehir<input name="city" defaultValue={prefill.city} placeholder="Şehir giriniz" maxLength="80" required/></label>
          <div className="date-grid"><label>Başlangıç<input name="start" defaultValue={prefill.start} type="date" min="1900-01-01" max="2100-12-31" required/></label><label>Bitiş<input name="end" defaultValue={prefill.end} type="date" min="1900-01-01" max="2100-12-31" required/></label></div>
          {error&&<p role="alert" className="error">{error}</p>}
          <button className="btn dark" type="submit">{prefill.id?'Değişiklikleri kaydet':'Gezimi oluştur ↗'}</button><p className="form-hint">{prefill.id?'Mevcut durakların korunur.':'Gezini oluşturduktan sonra günlük duraklarını ekleyebilirsin.'}</p>
        </form></div>
      </section>
    </div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
