// Génération du PDF de confirmation (jsPDF). Retourne un objet jsPDF.
function loadImg(src) { return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); }
async function buildPdf(d) {
  const { jsPDF } = window.jspdf, doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFillColor(10, 37, 64); doc.rect(0, 0, 210, 50, "F");
  const logo = await loadImg("assets/images/logo-gls.png");
  if (logo) doc.addImage(logo, "PNG", 15, 8, 32, 32 * logo.height / logo.width);
  doc.setTextColor(255); doc.setFont("helvetica", "bold").setFontSize(16);
  doc.text("SOMMET GLOBAL DU LEADERSHIP", 195, 22, { align: "right" });
  doc.setTextColor(56, 189, 248).setFontSize(12);
  doc.text(`GLS ${eventConfig.city} ${eventConfig.year}`, 195, 32, { align: "right" });
  doc.setTextColor(10, 37, 64).setFontSize(18).text("CONFIRMATION D'INSCRIPTION", 105, 70, { align: "center" });
  const rows = [["Nom", d.nom], ["Prénom", d.prenom], ["Email", d.email], ["WhatsApp", d.whatsapp],
    ["Participation", d.type], ["Montant", d.montantTxt], ["Référence", d.ref], ["Date d'inscription", d.date],
    ["Sommet", `${eventConfig.date} — ${eventConfig.time}`], ["Lieu", eventConfig.venue]];
  let y = 90; doc.setFontSize(11);
  rows.forEach(([k, v]) => { doc.setFont("helvetica", "bold").setTextColor(10, 37, 64).text(k, 25, y);
    doc.setFont("helvetica", "normal").setTextColor(30).text(doc.splitTextToSize(String(v), 110), 75, y); y += 11; });
  doc.setFontSize(9).setTextColor(120).text("Ce document ne constitue pas une preuve de paiement. Le paiement s'effectue sur Chariow.", 105, 280, { align: "center" });
  return doc;
}
