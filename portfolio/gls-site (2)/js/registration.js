// Parcours : formulaire → récapitulatif → EmailJS → lien de paiement Chariow
const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, " ") + " FCFA";
let current = null;
const selectedType = () => { const r = document.querySelector('input[name="plan"]:checked'); return r ? r.value : null; };
const setErr = (id, msg) => { $("err-" + id).textContent = msg || ""; };

function validate() {
  const v = { nom: $("nom").value.trim(), prenom: $("prenom").value.trim(), email: $("email").value.trim(),
    whatsapp: $("whatsapp").value.trim(), type: selectedType() };
  let ok = true;
  const chk = (id, bad, msg) => { setErr(id, bad ? msg : ""); if (bad) ok = false; };
  chk("nom", !v.nom, "Le nom est obligatoire.");
  chk("prenom", !v.prenom, "Le prénom est obligatoire.");
  chk("email", !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email), "Adresse e-mail invalide.");
  chk("whatsapp", !/^\+?[\d\s]{8,16}$/.test(v.whatsapp), "Numéro WhatsApp invalide.");
  chk("plan", !v.type, "Choisissez une participation.");
  return ok ? v : null;
}

function initRegistration() {
  $("price-standard").textContent = fmt(eventConfig.standardPrice);
  $("price-vip").textContent = fmt(eventConfig.vipPrice);
  $("note-standard").textContent = eventConfig.standardNote;
  $("note-vip").textContent = eventConfig.vipNote;
  document.querySelectorAll('input[name="plan"]').forEach(r => r.addEventListener("change", () => {
    $("amount").textContent = "Montant : " + fmt(r.value === "VIP" ? eventConfig.vipPrice : eventConfig.standardPrice); setErr("plan", ""); }));
  $("regForm").addEventListener("submit", e => {
    e.preventDefault(); const v = validate(); if (!v) return;
    const montant = v.type === "VIP" ? eventConfig.vipPrice : eventConfig.standardPrice;
    current = { ...v, montant, montantTxt: fmt(montant) };
    const list = $("recap-list"); list.innerHTML = "";
    [["Nom", v.nom], ["Prénom", v.prenom], ["Email", v.email], ["WhatsApp", v.whatsapp], ["Participation", v.type], ["Montant", current.montantTxt]]
      .forEach(([k, x]) => { const dt = document.createElement("dt"), dd = document.createElement("dd"); dt.textContent = k; dd.textContent = x; list.append(dt, dd); });
    $("regForm").hidden = true; $("recap").hidden = false;
  });
  $("editBtn").onclick = () => { $("recap").hidden = true; $("regForm").hidden = false; };
  $("confirmBtn").onclick = confirmRegistration;
}

async function confirmRegistration() {
  const btn = $("confirmBtn"); btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>TRAITEMENT…';
  current.ref = "GLS" + eventConfig.year.slice(2) + "-" + Date.now().toString(36).toUpperCase().slice(-5) + Math.random().toString(36).slice(2, 5).toUpperCase();
  current.date = new Date().toLocaleString("fr-FR");
  const res = await sendRegistrationEmail(current);   // e-mail texte selon le template EmailJS
  $("recap").hidden = true; $("done").hidden = false;
  $("done-ref").textContent = current.ref;
  $("email-status").textContent = res.ok ? "" : res.msg;
  showPayment(current.type); // paiement = EN ATTENTE tant que Chariow ne confirme pas
  $("done").scrollIntoView({ behavior: "smooth" });
}
