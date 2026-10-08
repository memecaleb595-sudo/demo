// Compte à rebours — date lue dans config.js
function initCountdown() {
  const target = new Date(eventConfig.eventDate).getTime();
  const box = document.getElementById("countdown");
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) { clearInterval(timer); box.innerHTML = '<p class="started">LE SOMMET A COMMENCÉ</p>'; return; }
    const v = [diff / 864e5, diff % 864e5 / 36e5, diff % 36e5 / 6e4, diff % 6e4 / 1e3].map(Math.floor);
    ["d", "h", "m", "s"].forEach((id, i) => { document.getElementById("cd-" + id).textContent = String(v[i]).padStart(2, "0"); });
  };
  const timer = setInterval(tick, 1000); tick();
}
