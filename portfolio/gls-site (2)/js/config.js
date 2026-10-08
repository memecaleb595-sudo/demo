// ================================
// CONFIGURATION DE L'ÉVÉNEMENT
// (pour GLS 2027, modifier surtout ce fichier)
// ================================
const eventConfig = {
  edition: "12ÈME ÉDITION", year: "2026", city: "COTONOU",
  title: "Sommet Global du Leadership",
  theme: "TOUT LE MONDE A DE L'INFLUENCE",
  date: "31 octobre 2026", eventDate: "2026-10-31T08:00:00", time: "08H00 — 15H00",
  venue: "Église Protestante Méthodiste du Bénin (EPMB Zogbo)",
  whatsapp: "+22967102077",   // numéro utilisé par les boutons WhatsApp
  phones: ["+229 01 97 99 62 99", "+229 01 67 10 20 77"],   // numéros affichés sur le site
  whatsappMessage: "Bonjour, je souhaite avoir des informations concernant le Sommet Global du Leadership.",
  socials: { facebook: "#", instagram: "#", youtube: "#" }, // À REMPLACER
  standardPrice: 3000, vipPrice: 20000,
  standardNote: "Rafraîchissement assuré", vipNote: "Clé USB assurée",
  // ================================
  // CONFIGURATION CHARIOW
  // ================================
  standardProductId: "prd_ut0iajnd", vipProductId: "prd_z4ps6g4k",
  chariowStore: "iecwjxbo.mychariow.shop",
  // Liens de paiement (le participant est redirigé ici après son inscription)
  standardPayUrl: "https://iecwjxbo.mychariow.shop/prd_ut0iajnd/checkout",
  vipPayUrl: "https://iecwjxbo.mychariow.shop/prd_z4ps6g4k/checkout"
};

// ================================
// CONFIGURATION EMAILJS (clé publique : sans risque côté navigateur)
// ================================
const EMAILJS_PUBLIC_KEY = "Dxi8ESydVdcmOQB6Y";
const EMAILJS_SERVICE_ID = "service_4c160zb";
const EMAILJS_TEMPLATE_ID = "template_3lm01cl";
const EMAILJS_TO_EMAIL = "sommetglobalduleadership45@gmail.com";

// ================================
// CONTENU ÉDITABLE
// ================================
// Fonctions reprises de l'affiche officielle
const ROLES = {
  "Craig Groeschel": "Fondateur et Pasteur principal de Life Church. Auteur à succès",
  "Ryan Leak": "Directeur Général de « The Ryan Leak Group ». Auteur à succès",
  "Vanessa Van Edwards": "Chercheuse en Comportement Humain. Auteur à succès",
  "Jim Collins": "Expert mondial en Management. Auteur à succès",
  "David Ashcraft": "Président et Directeur du Réseau Global du Leadership. Auteur",
  "John Maxwell": "Expert international en Leadership. Auteur à succès",
  "Kwame Christian": "Directeur Général de « American Negotiation Institute ». Auteur à succès",
  "Priscilla Shirer": "Co-fondatrice de « Going Beyond Ministries ». Auteur à succès",
  "Arthur C. Brooks": "Professeur à Harvard. Auteur à succès",
  "Francis Olubambi": "Directeur Régional GLS Afrique de l'Ouest et Afrique centrale"
};

const speakers = [
  "Craig Groeschel|craig-groeschel", "Ryan Leak|ryan-leak", "Vanessa Van Edwards|vanessa-van-edwards",
  "Jim Collins|jim-collins", "David Ashcraft|david-ashcraft", "John Maxwell|john-maxwell",
  "Kwame Christian|kwame-christian", "Priscilla Shirer|priscilla-shirer",
  "Arthur C. Brooks|arthur-brooks", "Francis Olubambi|francis-olubambi"
].map(s => { const [name, f] = s.split("|");
  return { name, photo: `assets/images/intervenants/${f}.jpg`, role: ROLES[name] || "", bio: "" }; });

const program = [ // HEURE / ACTIVITÉ / INTERVENANT — à compléter
  { time: "08H00", title: "Accueil des participants", speaker: "" },
  { time: "09H00", title: "Session 1", speaker: "" },
  { time: "11H00", title: "Session 2", speaker: "" },
  { time: "15H00", title: "Clôture", speaker: "" }
];

const editions = [ // 3 photos par édition passée : déposer photo1.jpg, photo2.jpg, photo3.jpg dans le dossier indiqué
  { year: "2026", soon: true },
  { year: "2025", images: [1, 2, 3].map(n => `assets/images/editions/2025/photo${n}.jpg`) },
  { year: "2024", images: [1, 2, 3].map(n => `assets/images/editions/2024/photo${n}.jpg`) }
];

const gallery = []; // ex: "assets/images/gallery/photo1.jpg"
