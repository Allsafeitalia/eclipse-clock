const events=[
['2026-08-12T17:46:00Z','Eclissi solare totale','solar','12 AGO 2026','Totale'],
['2026-08-28T04:14:04Z','Eclissi lunare parziale','lunar','28 AGO 2026','Parziale'],
['2027-02-06T15:00:00Z','Eclissi solare anulare','solar','06 FEB 2027','Anulare'],
['2027-02-20T23:14:06Z','Eclissi lunare penombrale','lunar','20 FEB 2027','Penombrale'],
['2027-07-18T16:04:09Z','Eclissi lunare penombrale','lunar','18 LUG 2027','Penombrale'],
['2027-08-02T10:00:00Z','Eclissi solare totale','solar','02 AGO 2027','Totale'],
['2027-08-17T07:14:59Z','Eclissi lunare penombrale','lunar','17 AGO 2027','Penombrale'],
['2028-01-12T04:14:13Z','Eclissi lunare parziale','lunar','12 GEN 2028','Parziale'],
['2028-07-06T18:20:57Z','Eclissi lunare parziale','lunar','06 LUG 2028','Parziale'],
['2028-12-31T16:53:15Z','Eclissi lunare totale','lunar','31 DIC 2028','Totale'],
['2029-01-14T00:00:00Z','Eclissi solare parziale','solar','14 GEN 2029','Parziale'],
['2029-06-26T03:23:22Z','Eclissi lunare totale','lunar','26 GIU 2029','Totale'],
['2029-12-20T22:43:12Z','Eclissi lunare totale','lunar','20 DIC 2029','Totale'],
['2030-06-01T00:00:00Z','Eclissi solare anulare','solar','01 GIU 2030','Anulare'],
['2030-06-15T18:34:34Z','Eclissi lunare parziale','lunar','15 GIU 2030','Parziale'],
['2030-12-09T22:28:51Z','Eclissi lunare penombrale','lunar','09 DIC 2030','Penombrale']
].map(([iso,title,type,label,kind])=>({iso,title,type,label,kind,date:new Date(iso)}));

let filter='all';let visible=8;
const $=id=>document.getElementById(id);
function nextEvent(){return events.filter(e=>e.date>Date.now()).sort((a,b)=>a.date-b.date)[0]||events[events.length-1]}
function renderHero(){const e=nextEvent();$('nextTitle').textContent=e.title;$('nextDate').textContent=`${e.label} · ${e.kind}`;window.next=e}
function tick(){const e=window.next||nextEvent();let ms=Math.max(0,e.date-Date.now());const d=Math.floor(ms/86400000);ms%=86400000;const h=Math.floor(ms/3600000);ms%=3600000;const m=Math.floor(ms/60000);const s=Math.floor(ms/1000);$('days').textContent=String(d).padStart(2,'0');$('hours').textContent=String(h).padStart(2,'0');$('minutes').textContent=String(m).padStart(2,'0');$('seconds').textContent=String(s).padStart(2,'0');if(e.date<=Date.now()){renderHero()}}
function render(){const now=Date.now();const list=events.filter(e=>e.date>now&& (filter==='all'||e.type===filter)).sort((a,b)=>a.date-b.date).slice(0,visible);$('timeline').innerHTML=list.map(e=>`<article class="event"><div class="event-date">${e.date.toLocaleDateString('it-IT',{day:'2-digit',month:'short'}).replace('.','')}<small>${e.date.getFullYear()}</small></div><div><h3>${e.title}</h3><p>${e.date.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit',timeZoneName:'short'})}</p></div><span class="tag ${e.type}">${e.kind}</span></article>`).join('');$('loadMore').style.display=list.length>=events.filter(e=>e.date>now&& (filter==='all'||e.type===filter)).length?'none':'block'}

document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;visible=8;render()}));
document.querySelectorAll('.theme-btn').forEach(b=>b.addEventListener('click',()=>document.body.dataset.theme=b.dataset.theme));
$('loadMore').addEventListener('click',()=>{visible+=8;render()});
setInterval(()=>{$('localTime').textContent=new Date().toLocaleString('it-IT',{dateStyle:'medium',timeStyle:'medium'});tick()},1000);
renderHero();render();tick();
