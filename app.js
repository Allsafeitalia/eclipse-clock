const events=[
['2026-08-12T17:46:00Z','Eclissi solare totale','solar','12 AGO 2026','Totale','Groenlandia, Islanda, Spagna'],
['2026-08-28T04:14:04Z','Eclissi lunare parziale','lunar','28 AGO 2026','Parziale','Europa, Africa, Asia'],
['2027-02-06T15:00:00Z','Eclissi solare anulare','solar','06 FEB 2027','Anulare','Oceano Pacifico, Sud America'],
['2027-02-20T23:14:06Z','Eclissi lunare penombrale','lunar','20 FEB 2027','Penombrale','Americhe, Europa'],
['2027-07-18T16:04:09Z','Eclissi lunare penombrale','lunar','18 LUG 2027','Penombrale','Asia, Australia'],
['2027-08-02T10:00:00Z','Eclissi solare totale','solar','02 AGO 2027','Totale','Europa, Africa, Asia'],
['2027-08-17T07:14:59Z','Eclissi lunare penombrale','lunar','17 AGO 2027','Penombrale','Americhe, Europa, Africa'],
['2028-01-12T04:14:13Z','Eclissi lunare parziale','lunar','12 GEN 2028','Parziale','Americhe, Europa, Africa'],
['2028-07-06T18:20:57Z','Eclissi lunare parziale','lunar','06 LUG 2028','Parziale','Asia, Australia'],
['2028-12-31T16:53:15Z','Eclissi lunare totale','lunar','31 DIC 2028','Totale','Americhe, Europa, Africa'],
['2029-01-14T00:00:00Z','Eclissi solare parziale','solar','14 GEN 2029','Parziale','Nord America, Europa'],
['2029-06-26T03:23:22Z','Eclissi lunare totale','lunar','26 GIU 2029','Totale','Europa, Africa, Asia, Australia'],
['2029-12-20T22:43:12Z','Eclissi lunare totale','lunar','20 DIC 2029','Totale','Americhe, Europa, Africa'],
['2030-06-01T00:00:00Z','Eclissi solare anulare','solar','01 GIU 2030','Anulare','Africa, Europa, Asia'],
['2030-06-15T18:34:34Z','Eclissi lunare parziale','lunar','15 GIU 2030','Parziale','Asia, Australia, Pacifico'],
['2030-12-09T22:28:51Z','Eclissi lunare penombrale','lunar','09 DIC 2030','Penombrale','Americhe, Europa, Africa']
].map(([iso,title,type,label,kind,location])=>({iso,title,type,label,kind,location,date:new Date(iso)}));

const $=id=>document.getElementById(id);
function nextEvent(){return events.filter(e=>e.date>Date.now()).sort((a,b)=>a.date-b.date)[0]||events[events.length-1]}
function previousEvent(e){const i=events.indexOf(e);return events[Math.max(0,i-1)]}
function pad(n){return String(Math.max(0,n)).padStart(2,'0')}
function diffParts(from,to){let cursor=new Date(from),years=to.getFullYear()-cursor.getFullYear(),anniversary=new Date(cursor);anniversary.setFullYear(cursor.getFullYear()+years);if(anniversary>to){years--;anniversary.setFullYear(cursor.getFullYear()+years)}let months=to.getMonth()-anniversary.getMonth();if(months<0)months+=12;let point=new Date(anniversary);point.setMonth(point.getMonth()+months);if(point>to){months--;point.setMonth(point.getMonth()-1)}const ms=to-point;return{years,months,days:Math.floor(ms/86400000),hours:Math.floor(ms%86400000/3600000),minutes:Math.floor(ms%3600000/60000),seconds:Math.floor(ms%60000/1000)}}
function renderHero(){const e=nextEvent();$('nextTitle').textContent=e.title;$('nextLocation').textContent=e.location;$('nextDate').textContent=e.date.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});$('markerDate').textContent=e.date.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}).toUpperCase();$('markerKind').textContent=e.kind.toUpperCase();window.next=e;const prev=previousEvent(e);window.progressStart=prev?.date||new Date();window.progressSpan=Math.max(1,e.date-window.progressStart)}
function tick(){const e=window.next||nextEvent();if(e.date<=new Date()){renderHero();return}const p=diffParts(new Date(),e.date);['years','months','days','hours','minutes','seconds'].forEach(k=>$(k).textContent=pad(p[k]));const pct=Math.min(99.9,Math.max(0,(Date.now()-window.progressStart.getTime())/window.progressSpan*100));$('progressValue').textContent=`${pct.toFixed(1)}%`;$('journeyValue').textContent=`${pct.toFixed(1)}%`;$('progressBar').style.width=`${pct}%`;$('progressLabel').textContent='In cammino verso l\'eclissi…';$('orbitProgress').style.transform=`rotate(${-55+pct*3.4}deg)`;$('sunOrbit').style.transform=`rotate(${pct*3.6}deg)`}
function render(){const now=Date.now(),list=events.filter(e=>e.date>now).sort((a,b)=>a.date-b.date).slice(0,4);$('sidebarEvents').innerHTML=list.map(e=>`<article class="event-mini"><div class="date">${e.label.replace(' ','<br>')}</div><div><h3>${e.title}</h3><p>${e.location}</p></div><span class="arrow">›</span></article>`).join('')}
document.querySelectorAll('.themes button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.themes button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.body.dataset.theme=b.dataset.theme}));
$('shareBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);$('shareBtn').textContent='✓ Copiato';setTimeout(()=>$('shareBtn').textContent='⌯  Condividi',1600)}catch{}});
$('calendarBtn').addEventListener('click',()=>window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'}));
setInterval(()=>{$('localTime').textContent=new Date().toLocaleString('it-IT',{dateStyle:'medium',timeStyle:'medium'});tick()},1000);
renderHero();render();tick();
