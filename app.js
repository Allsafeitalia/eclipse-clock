const raw=[
['2026-08-28T04:14:04Z','Eclissi lunare parziale','lunar','28 AGO 2026','PARZIALE','Europa, Africa, Asia'],
['2027-02-06T15:00:00Z','Eclissi solare anulare','solar','06 FEB 2027','ANULARE','Oceano Pacifico, Sud America'],
['2027-02-20T23:14:06Z','Eclissi lunare penombrale','lunar','20 FEB 2027','PENOMBRALE','Americhe, Europa, Asia'],
['2027-07-18T16:04:09Z','Eclissi lunare penombrale','lunar','18 LUG 2027','PENOMBRALE','Africa orientale, Asia, Australia'],
['2027-08-02T10:07:49Z','Eclissi solare totale','solar','02 AGO 2027','TOTALE','Africa, Europa, Medio Oriente, Asia'],
['2027-08-17T07:14:59Z','Eclissi lunare penombrale','lunar','17 AGO 2027','PENOMBRALE','Pacifico, Americhe'],
['2028-01-12T04:14:13Z','Eclissi lunare parziale','lunar','12 GEN 2028','PARZIALE','Americhe, Europa, Africa'],
['2028-01-26T15:08:58Z','Eclissi solare anulare','solar','26 GEN 2028','ANULARE','Americhe, Europa, Africa, Spagna, Portogallo'],
['2028-07-06T18:20:57Z','Eclissi lunare parziale','lunar','06 LUG 2028','PARZIALE','Europa, Africa, Asia, Australia'],
['2028-07-22T02:56:39Z','Eclissi solare totale','solar','22 LUG 2028','TOTALE','Sud-est asiatico, Australia, Nuova Zelanda'],
['2028-12-31T16:53:15Z','Eclissi lunare totale','lunar','31 DIC 2028','TOTALE','Europa, Africa, Asia, Australia, Pacifico'],
['2029-01-14T17:13:47Z','Eclissi solare parziale','solar','14 GEN 2029','PARZIALE','Nord e Centro America'],
['2029-06-12T04:06:13Z','Eclissi solare parziale','solar','12 GIU 2029','PARZIALE','Artico, Scandinavia, Alaska, Canada'],
['2029-06-26T03:23:22Z','Eclissi lunare totale','lunar','26 GIU 2029','TOTALE','Americhe, Europa, Africa, Medio Oriente'],
['2029-07-11T15:37:18Z','Eclissi solare parziale','solar','11 LUG 2029','PARZIALE','Cile meridionale, Argentina meridionale'],
['2029-12-05T15:03:57Z','Eclissi solare parziale','solar','05 DIC 2029','PARZIALE','Argentina meridionale, Cile meridionale, Antartide'],
['2029-12-20T22:43:12Z','Eclissi lunare totale','lunar','20 DIC 2029','TOTALE','Americhe, Europa, Africa, Asia'],
['2030-06-01T06:29:13Z','Eclissi solare anulare','solar','01 GIU 2030','ANULARE','Europa, Africa settentrionale, Medio Oriente, Asia'],
['2030-06-15T18:34:34Z','Eclissi lunare parziale','lunar','15 GIU 2030','PARZIALE','Europa, Africa, Asia, Australia'],
['2030-11-25T06:51:37Z','Eclissi solare totale','solar','25 NOV 2030','TOTALE','Africa meridionale, Oceano Indiano, Australia'],
['2030-12-09T22:28:51Z','Eclissi lunare penombrale','lunar','09 DIC 2030','PENOMBRALE','Americhe, Europa, Africa, Asia'],
['2031-05-07T08:00:00Z','Eclissi lunare parziale','lunar','07 MAG 2031','PARZIALE','Europa, Africa, Asia'],
['2031-05-21T00:00:00Z','Eclissi solare anulare','solar','21 MAR 2031','ANULARE','Atlantico settentrionale, Europa'],
['2031-10-15T00:00:00Z','Eclissi lunare penombrale','lunar','15 OTT 2031','PENOMBRALE','Americhe, Europa, Africa'],
['2032-06-06T23:42:32Z','Eclissi solare totale','solar','06 GIU 2032','TOTALE','Americhe, Pacifico'],
['2032-10-30T00:00:00Z','Eclissi lunare totale','lunar','30 OTT 2032','TOTALE','Europa, Africa, Asia'],
['2033-12-01T21:54:20Z','Eclissi solare anulare','solar','01 DIC 2033','ANULARE','Europa, Africa, Asia'],
['2034-03-20T00:00:00Z','Eclissi solare totale','solar','20 MAR 2034','TOTALE','Europa, Africa, Asia'],
['2035-09-02T00:00:00Z','Eclissi lunare totale','lunar','02 SET 2035','TOTALE','Americhe, Europa, Africa'],
['2038-04-07T12:07:46Z','Eclissi solare anulare','solar','07 APR 2038','ANULARE','Asia, Pacifico'],
['2038-07-02T00:00:00Z','Eclissi solare totale','solar','02 LUG 2038','TOTALE','Pacifico, Sud America'],
['2039-09-30T17:49:36Z','Eclissi solare totale','solar','30 SET 2039','TOTALE','Africa, Oceano Indiano'],
['2040-03-26T15:50:19Z','Eclissi solare anulare','solar','26 MAR 2040','ANULARE','Oceano Indiano, Australia'],
['2040-05-26T11:11:00Z','Eclissi lunare totale','lunar','26 MAG 2040','TOTALE','Americhe, Europa, Africa'],
['2040-11-18T19:11:00Z','Eclissi lunare totale','lunar','18 NOV 2040','TOTALE','Americhe, Europa, Africa, Asia']
];
const events=raw.map(([iso,title,type,label,kind,location])=>({iso,title,type,label,kind,location,date:new Date(iso)})).sort((a,b)=>a.date-b.date);
const $=id=>document.getElementById(id);
const future=()=>events.filter(e=>e.date>Date.now());
function nextEvent(){return future()[0]||events[events.length-1]}
function pad(n){return String(Math.max(0,n)).padStart(2,'0')}
function diffParts(from,to){let cursor=new Date(from),years=to.getFullYear()-cursor.getFullYear(),anniversary=new Date(cursor);anniversary.setFullYear(cursor.getFullYear()+years);if(anniversary>to){years--;anniversary.setFullYear(cursor.getFullYear()+years)}let months=to.getMonth()-anniversary.getMonth();if(months<0)months+=12;let point=new Date(anniversary);point.setMonth(point.getMonth()+months);if(point>to){months--;point=new Date(anniversary);point.setMonth(point.getMonth()+months)}const ms=to-point;return{years,months,days:Math.floor(ms/86400000),hours:Math.floor(ms%86400000/3600000),minutes:Math.floor(ms%3600000/60000),seconds:Math.floor(ms%60000/1000)}}
let current,progressStart,progressSpan;
function renderHero(){current=nextEvent();$('nextTitle').textContent=current.title;$('nextLocation').textContent=current.location;$('nextDate').textContent=current.date.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});$('markerDate').textContent=current.date.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}).toUpperCase();$('markerKind').textContent=current.kind;const i=events.indexOf(current);progressStart=events[Math.max(0,i-1)]?.date||new Date();progressSpan=Math.max(1,current.date-progressStart)}
function tick(){if(!current||current.date<=new Date())renderHero();const p=diffParts(new Date(),current.date);['years','months','days','hours','minutes','seconds'].forEach(k=>$(k).textContent=pad(p[k]));const pct=Math.min(99.99,Math.max(0,(Date.now()-progressStart.getTime())/progressSpan*100));$('progressValue').textContent=`${pct.toFixed(1)}%`;$('journeyValue').textContent=`${pct.toFixed(1)}%`;$('progressBar').style.width=`${pct}%`;$('orbitProgress').style.transform=`rotate(${-55+pct*3.6}deg)`;$('sunOrbit').style.transform=`rotate(${pct*3.6}deg)`}
function miniEvents(){const list=future().slice(0,4);$('sidebarEvents').innerHTML=list.map(e=>`<article class="event-mini" data-id="${events.indexOf(e)}"><div class="date">${e.label.replace(' ','<br>')}</div><div><h3>${e.title}</h3><p>${e.location}</p></div><span class="arrow">›</span></article>`).join('');document.querySelectorAll('.event-mini').forEach(x=>x.addEventListener('click',()=>openCalendar(Number(x.dataset.id))))}
function calendar(filter='all'){const list=future().filter(e=>filter==='all'||e.type===filter);$('calendarList').innerHTML=list.map(e=>`<article class="calendar-item"><div class="cal-date">${e.label}</div><div><h3>${e.title}</h3><p>${e.location}</p></div><span class="type-badge ${e.type}">${e.kind}</span></article>`).join('')||'<p class="empty">Nessun evento nel filtro selezionato.</p>'}
function openCalendar(){calendar(document.querySelector('.filter.active')?.dataset.filter||'all');$('calendarModal').classList.add('open');$('calendarModal').setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}
function closeCalendar(){ $('calendarModal').classList.remove('open');$('calendarModal').setAttribute('aria-hidden','true');document.body.classList.remove('modal-open') }
document.querySelectorAll('.themes button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.themes button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.body.dataset.theme=b.dataset.theme}));
$('calendarBtn').addEventListener('click',openCalendar);$('closeCalendar').addEventListener('click',closeCalendar);$('calendarModal').addEventListener('click',e=>{if(e.target.id==='calendarModal')closeCalendar()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCalendar()});document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');calendar(b.dataset.filter)}));
$('shareBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);$('shareBtn').textContent='✓ Copiato';setTimeout(()=>$('shareBtn').textContent='↗ Condividi',1600)}catch{}});
setInterval(()=>{$('localTime').textContent=new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit',second:'2-digit'});tick()},1000);renderHero();miniEvents();tick();
