(() => {
  const $ = (id) => document.getElementById(id);
  const FIRST_INTERVAL_START = new Date('2026-03-03T11:34:00Z').getTime();

  function updateProgress() {
    try {
      const current = eval('current');
      if (!current) return;

      const end = current.date.getTime();
      let start = eval('progressStart')?.getTime?.() || (end - 180 * 86400000);

      // The catalogue starts with the 28 Aug 2026 eclipse, so use the
      // previous real eclipse as the beginning of the first visible cycle.
      if (end === new Date('2026-08-28T04:14:04Z').getTime()) {
        start = FIRST_INTERVAL_START;
      }

      const now = Date.now();
      const pct = Math.min(99.9, Math.max(0, ((now - start) / Math.max(1, end - start)) * 100));
      const value = `${pct.toFixed(1)}%`;

      if ($('progressValue')) $('progressValue').textContent = value;
      if ($('journeyValue')) $('journeyValue').textContent = value;
      if ($('progressBar')) $('progressBar').style.width = `${pct}%`;
      if ($('orbitProgress')) $('orbitProgress').style.transform = `rotate(${-55 + pct * 3.6}deg)`;
      if ($('sunOrbit')) $('sunOrbit').style.transform = 'rotate(270deg)';

      // Keep the lunar movement continuous. alignment.js uses the same
      // percentage, so the Moon reaches its eclipse position at 100%.
      const moon = $('moonOrbit');
      const title = $('nextTitle')?.textContent || '';
      if (moon) {
        const isLunar = /lunare/i.test(title);
        const target = isLunar ? 90 : 270;
        const startAngle = target - 105;
        const angle = startAngle + (target - startAngle) * (pct / 100);
        moon.style.transform = `rotate(${angle}deg)`;
      }
    } catch (_) {}
  }

  setInterval(updateProgress, 100);
  updateProgress();
})();
