// EmailJS — initialisation + envoi (template à configurer côté EmailJS)
const emailReady = () => !EMAILJS_PUBLIC_KEY.startsWith("YOUR_");
if (typeof emailjs !== "undefined" && emailReady()) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

async function sendRegistrationEmail(d) {
  if (!emailReady()) return { ok: false, msg: "EmailJS non configuré (clés placeholders)." };
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: EMAILJS_TO_EMAIL, nom: d.nom, prenom: d.prenom, email: d.email, whatsapp: d.whatsapp,
      type: d.type, montant: d.montantTxt, reference: d.ref, date: d.date
    });
    return { ok: true };
  } catch (e) { return { ok: false, msg: "Échec d'envoi EmailJS : " + (e.text || e.message || e) }; }
}
