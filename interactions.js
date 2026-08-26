(() => {
  const $ = id => document.getElementById(id);
  let selectedFilter = 'all';

  function formatDate(e) {
    return e.date.toLocaleDateString('it-IT',{day:'2-digit',month:'short',year:'numeric'}).replace('.','').toUpperCase();
  }

  function selectEvent(e) {
    current = e;
    const index = events.indexOf(e);
    progressStart = index > 0 ? events[index - 1].date.getTime() : Date.now();
    progressEnd = e.date.getTime();

    $('nextTitle').textContent = e.title;
    $('nextLocation').textContent = e.location;
    $('nextDate').textContent = e.date.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});
    $('markerDate').textContent = e.date.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}).toUpperCase();
    $('markerKind').textContent = e.kind;
    $('detailType').textContent = e.title;
    $('detailVisibility').textContent = e.location;
    $('detailStatus').textContent = e.date > new Date() ? 'IN CAMMINO' : 'IN CORSO';

    const now = Date.now();
    const pct = Math.max(0,Math.min(99.99,(now-progressStart)/Math.max(1,progressEnd-progressStart)*100));
    updateCountdown(now);
    updateScene(pct);
    closeCalendar();
    document.querySelector('#hero')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function renderSidebar() {
    const list = future().slice(0,6);
    const box = $('sidebarEvents');
    if (!box) return;
    box.innerHTML = list.map((e,i)=>`<article class="event-mini" data-index="${events.indexOf(e)}" tabindex="0">
      <div class="date">${e.label.replace(' ','<br>')}</div>
      <div><h3>${e.title}</h3><p>${e.location}</p></div>
      <span class="arrow">›</span>
    </article>`).join('');
    box.querySelectorAll('.event-mini').forEach(card => {
      const e = events[Number(card.dataset.index)];
      card.addEventListener('click',()=>selectEvent(e));
      card.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();selectEvent(e)}});
    });
  }

  function renderFullCalendar(filter=selectedFilter) {
    selectedFilter = filter;
    const list = future().filter(e=>filter==='all'||e.type===filter);
    const box = $('calendarList');
    if (!box) return;
    box.innerHTML = list.map(e=>`<article class="calendar-item" data-index="${events.indexOf(e)}" tabindex="0">
      <div class="cal-date">${formatDate(e)}</div>
      <div><h3>${e.title}</h3><p>${e.location}</p></div>
      <span class="type-badge ${e.type}">${e.kind}</span>
    </article>`).join('') || '<p>Nessun evento nel filtro selezionato.</p>';
    box.querySelectorAll('.calendar-item').forEach(card=>{
      const e=events[Number(card.dataset.index)];
      card.addEventListener('click',()=>selectEvent(e));
      card.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();selectEvent(e)}});
    });
  }

  function openFullCalendar(filter=selectedFilter){
    renderFullCalendar(filter);
    $('calendarModal').classList.add('open');
    $('calendarModal').setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  function closeFullCalendar(){
    $('calendarModal').classList.remove('open');
    $('calendarModal').setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }

  function setFilter(filter, source){
    selectedFilter=filter;
    document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
    if(source==='modal') renderFullCalendar(filter);
    else renderSidebar();
  }

  window.addEventListener('load',()=>{
    renderSidebar();

    $('calendarBtn')?.addEventListener('click',()=>openFullCalendar());
    $('calendarBtn2')?.addEventListener('click',()=>openFullCalendar());
    $('closeCalendar')?.addEventListener('click',closeFullCalendar);
    $('calendarModal')?.addEventListener('click',e=>{if(e.target.id==='calendarModal')closeFullCalendar()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeFullCalendar()});

    document.querySelectorAll('.filters').forEach(group=>group.addEventListener('click',e=>{
      const btn=e.target.closest('.filter');
      if(!btn)return;
      const isModal=!!btn.closest('#calendarModal');
      setFilter(btn.dataset.filter,isModal?'modal':'sidebar');
    }));

    const navCalendar=document.querySelector('.nav a[href="#calendar"]');
    navCalendar?.addEventListener('click',e=>{e.preventDefault();openFullCalendar()});
  });
})();
