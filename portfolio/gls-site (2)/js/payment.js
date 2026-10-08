// Affiche le bouton de paiement correspondant au choix (Standard ou VIP)
function showPayment(type) {
  const vip = type === "VIP";
  const btn = document.getElementById("payBtn");
  btn.href = vip ? eventConfig.vipPayUrl : eventConfig.standardPayUrl;
  document.getElementById("pay-label").textContent = vip ? "VIP · " + fmt(eventConfig.vipPrice) : "STANDARD · " + fmt(eventConfig.standardPrice);
  document.getElementById("payment").hidden = false;
}
