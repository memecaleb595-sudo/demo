// Thème, menu, animations, rendu depuis config.js, lightbox
const waUrl = (msg = eventConfig.whatsappMessage) => `https://wa.me/${eventConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

(function () { let t = null; try { t = localStorage.getItem("gls-theme"); } catch (e) {}
  document.documentElement.dataset.theme = t || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); })();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-cfg]").forEach(el => el.textContent = eventConfig[el.dataset.cfg]);
  document.querySelectorAll(".wa-link").forEach(a => { a.href = waUrl(); a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll(".wa-num").forEach(e => e.textContent = eventConfig.phones.join("  ·  "));
  document.querySelectorAll("[data-social]").forEach(a => a.href = eventConfig.socials[a.dataset.social] || "#");
  document.getElementById("extra-phones").innerHTML = eventConfig.phones.map(p => `<p><i class="fa-solid fa-phone"></i><span>${esc(p)}</span></p>`).join("");

  const themeIcon = () => document.querySelector("#themeBtn i").className = document.documentElement.dataset.theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"; themeIcon();
  document.getElementById("themeBtn").onclick = () => { const n = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = n; themeIcon(); try { localStorage.setItem("gls-theme", n); } catch (e) {} };
  const menu = document.getElementById("menu"), burger = document.getElementById("burger");
  burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); burger.innerHTML = o ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>'; };
  menu.addEventListener("click", e => { if (e.target.tagName === "A") menu.classList.remove("open"); });
  addEventListener("scroll", () => document.getElementById("nav").classList.toggle("stuck", scrollY > 30), { passive: true });

  document.getElementById("speakers-grid").innerHTML = speakers.map(s => `<article class="card reveal"><div class="ph" data-i="${esc(s.name.split(" ").map(w => w[0]).join("").slice(0, 2))}"><img src="${esc(s.photo)}" alt="Photo de ${esc(s.name)}" loading="lazy" onerror="this.remove()"></div><h3>${esc(s.name)}</h3>${s.role?`<em>${esc(s.role)}</em>`:""}${s.bio?`<p>${esc(s.bio)}</p>`:""}</article>`).join("");
  document.getElementById("timeline").innerHTML = program.map(p => `<li class="reveal"><time>${esc(p.time)}</time><div><h3>${esc(p.title)}</h3>${p.speaker ? `<p>${esc(p.speaker)}</p>` : ""}</div></li>`).join("");
  document.getElementById("editions-grid").innerHTML = editions.map(e => e.soon
    ? `<article class="ed-card soon reveal"><div class="ed-sum"><span class="yr">GLS ${esc(e.year)}</span><span class="badge">À venir</span></div></article>`
    : `<details class="ed-card reveal"><summary class="ed-sum"><span class="yr">GLS ${esc(e.year)}</span><span class="more">Voir les photos <i class="fa-solid fa-chevron-down"></i></span></summary><div class="ed-body">${e.images.map((src, i) => `<div class="ph slot" data-i="Photo ${i + 1}"><img src="${esc(src)}" alt="GLS ${esc(e.year)}, photo ${i + 1}" loading="lazy" onerror="this.remove()"></div>`).join("")}</div></details>`).join("");
  const g = document.getElementById("gallery-grid");
  g.innerHTML = gallery.length ? gallery.map((src, i) => `<button class="g-item reveal" data-i="${i}" aria-label="Agrandir la photo ${i + 1}"><img src="${esc(src)}" alt="Photo du GLS ${i + 1}" loading="lazy"></button>`).join("") : '<p class="muted">Les photos seront bientôt disponibles.</p>';
  let gi = 0; const lb = document.getElementById("lightbox"), li = lb.querySelector("img");
  const show = i => { gi = (i + gallery.length) % gallery.length; li.src = gallery[gi]; lb.hidden = false; };
  g.addEventListener("click", e => { const b = e.target.closest(".g-item"); if (b) show(+b.dataset.i); });
  lb.querySelector(".prev").onclick = () => show(gi - 1); lb.querySelector(".next").onclick = () => show(gi + 1);
  lb.querySelector(".close").onclick = () => lb.hidden = true;
  addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowLeft") show(gi - 1); if (e.key === "ArrowRight") show(gi + 1); });

  document.getElementById("contactForm").addEventListener("submit", e => { e.preventDefault(); const f = e.target;
    open(waUrl(`Bonjour, je suis ${f.cname.value}. ${f.cmsg.value}`), "_blank", "noopener"); });

  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  initCountdown(); initRegistration();
});

