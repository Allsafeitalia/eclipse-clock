(() => {
  const updatePrecision = () => {
    if (!window.current || !window.progressStart || !window.progressSpan) return;
    const now = Date.now();
    const pct = Math.min(99.999, Math.max(0, ((now - window.progressStart.getTime()) / window.progressSpan) * 100));
    const value = `${pct.toFixed(3)}%`;
    const progressValue = document.getElementById('progressValue');
    const journeyValue = document.getElementById('journeyValue');
    if (progressValue) progressValue.textContent = value;
    if (journeyValue) journeyValue.textContent = value;
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = `${pct}%`;
    const orbit = document.getElementById('orbitProgress');
    if (orbit) orbit.style.transform = `rotate(${-55 + pct * 3.6}deg)`;
    const sun = document.getElementById('sunOrbit');
    if (sun) sun.style.transform = `rotate(${pct * 3.6}deg)`;
  };
  setInterval(updatePrecision, 100);
  updatePrecision();
})();
