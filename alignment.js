(() => {
  const moonOrbit = document.getElementById('moonOrbit');
  const sunOrbit = document.getElementById('sunOrbit');
  const axisLine = document.getElementById('axisLine');
  const status = document.getElementById('alignmentStatus');
  const text = document.getElementById('alignmentText');
  const value = document.getElementById('journeyValue');
  const title = document.getElementById('nextTitle');

  if (!moonOrbit || !sunOrbit || !value || !title) return;

  // The Sun stays on the left. At the eclipse the Moon reaches the
  // correct side of Earth: right for a lunar eclipse, left for a solar eclipse.
  sunOrbit.style.animation = 'none';
  sunOrbit.style.transform = 'rotate(270deg)';

  function updateAlignment() {
    const pct = Math.max(0, Math.min(100, parseFloat(value.textContent) || 0));
    const isLunar = /lunare/i.test(title.textContent || '');
    const target = isLunar ? 90 : 270;
    const start = target - 105;
    const angle = start + (target - start) * (pct / 100);

    moonOrbit.style.transform = `rotate(${angle}deg)`;
    sunOrbit.style.transform = 'rotate(270deg)';

    if (axisLine) axisLine.style.opacity = String(0.15 + pct * 0.0065);

    if (pct >= 99.8) {
      status.textContent = 'ALLINEATI';
      status.style.color = 'var(--gold2)';
      text.textContent = isLunar
        ? 'Sole, Terra e Luna sono perfettamente allineati. L’eclissi lunare è iniziata.'
        : 'Sole, Luna e Terra sono perfettamente allineati. L’eclissi solare è iniziata.';
      moonOrbit.style.filter = 'drop-shadow(0 0 12px rgba(255,255,255,.45))';
    } else {
      status.textContent = 'IN CORSO';
      status.style.color = 'var(--green)';
      text.textContent = isLunar
        ? 'La Luna si sposta verso il lato opposto al Sole fino all’allineamento con la Terra.'
        : 'La Luna si sposta verso il Sole fino a passare tra il Sole e la Terra.';
      moonOrbit.style.filter = `drop-shadow(0 0 ${4 + pct * 0.05}px rgba(255,255,255,.18))`;
    }
  }

  // app.js updates the percentage once per second. Polling here keeps this
  // layer independent and makes the orbital animation smooth at 60 fps.
  setInterval(updateAlignment, 1000);
  updateAlignment();
  requestAnimationFrame(function frame() {
    updateAlignment();
    requestAnimationFrame(frame);
  });
})();
