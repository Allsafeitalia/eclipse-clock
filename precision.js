(() => {
  const FIRST_INTERVAL_START = new Date('2026-03-03T11:34:00Z').getTime();
  const FIRST_ECLIPSE = new Date('2026-08-28T04:14:04Z').getTime();
  const $ = (id) => document.getElementById(id);

  const updatePrecision = () => {
    try {
      const active = eval('current');
      if (!active) return;
      const end = active.date.getTime();
      let start = eval('progressStart')?.getTime?.() || (end - 180 * 86400000);
      if (end === FIRST_ECLIPSE) start = FIRST_INTERVAL_START;
      const pct = Math.min(99.9, Math.max(0, ((Date.now() - start) / Math.max(1, end - start)) * 100));
      const value = `${pct.toFixed(1)}%`;

      if ($('progressValue')) $('progressValue').textContent = value;
      if ($('journeyValue')) $('journeyValue').textContent = value;
      if ($('progressBar')) $('progressBar').style.width = `${pct}%`;
      if ($('orbitProgress')) $('orbitProgress').style.transform = `rotate(${-55 + pct * 3.6}deg)`;
      if ($('sunOrbit')) $('sunOrbit').style.transform = 'rotate(270deg)';

      const moon = $('moonOrbit');
      const title = $('nextTitle')?.textContent || '';
      if (moon) {
        const isLunar = /lunare/i.test(title);
        const target = isLunar ? 90 : 270;
        const startAngle = target - 105;
        const angle = startAngle + (target - startAngle) * pct / 100;
        moon.style.transform = `rotate(${angle}deg)`;
      }
    } catch (_) {}
  };
  setInterval(updatePrecision, 100);
  updatePrecision();
})();
