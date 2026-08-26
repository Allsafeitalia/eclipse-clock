(function(){
  function iconClass(e){return e.type==='solar'?'solar':'lunar'}
  function thumb(e){const cls=`event-thumb ${iconClass(e)} ${String(e.kind||'').toLowerCase()}`;return `<span class="${cls}" aria-hidden="true"></span>`}
  function selectEvent(e){
    if(!e)return;
    current=e;
    const i=events.indexOf(e);
    progressStart=e===events[0]?new Date('2026-03-03T11:34:00Z').getTime():(events[Math.max(0,i-1)]?.date.getTime()||Date.now());
    progressEnd=e.date.getTime();
    $('nextTitle').textContent=e.title;$('nextLocation').textContent=e.location;
    $('nextDate').textContent=e.date.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});
    $('markerDate').textContent=e.date.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}).toUpperCase();$('markerKind').textContent=e.kind;
    $('detailType').textContent=e.title.replace(/^Eclissi /,'');$('detailVisibility').textContent=e.location;$('detailStatus').textContent='IN CAMMINO';
    const pct=updateCountdown(Date.now());updateScene(pct);
    document.querySelectorAll('.event-mini,.calendar-item').forEach(x=>x.classList.remove('selected'));
  }
  function renderSidebarV3(){
    const host=$('sidebarEvents');if(!host)return;const list=future().slice(0,6);
    host.innerHTML=list.map(e=>`<article class="event-mini" data-event-iso="${e.iso}" title="Seleziona ${e.title}"><div class="date">${e.label.replace(' ','<br>')}</div><div><h3>${e.title}</h3><p>${e.location}</p></div>${thumb(e)}<span class="arrow">›</span></article>`).join('');
    host.querySelectorAll('.event-mini').forEach(card=>card.addEventListener('click',()=>selectEvent(events.find(e=>e.iso===card.dataset.eventIso))));
  }
  function renderCalendarV3(filter){
    const host=$('calendarList');if(!host)return;const list=future().filter(e=>!filter||filter==='all'||e.type===filter);
    host.innerHTML=list.map(e=>`<article class="calendar-item" data-event-iso="${e.iso}"><div class="cal-date">${e.label}</div><div><h3>${e.title}</h3><p>${e.location}</p></div>${thumb(e)}<span class="type-badge ${e.type}">${e.kind}</span></article>`).join('')||'<p>Nessun evento nel filtro selezionato.</p>';
    host.querySelectorAll('.calendar-item').forEach(card=>card.addEventListener('click',()=>{selectEvent(events.find(e=>e.iso===card.dataset.eventIso));closeCalendar()}));
  }
  function syncFilterButtons(){document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>renderCalendarV3(document.querySelector('#calendarModal .filter.active')?.dataset.filter||document.querySelector('#calendar .filter.active')?.dataset.filter||'all'),0)))}
  window.calendar=function(filter='all'){renderCalendarV3(filter)};
  window.miniEvents=function(){renderSidebarV3()};
  function init(){renderSidebarV3();renderCalendarV3('all');const b=$('calendarBtn2');if(b)b.addEventListener('click',openCalendar);syncFilterButtons()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
