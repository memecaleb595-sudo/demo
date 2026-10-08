/* ==========================================================================
   script.js : interactions du portfolio (JavaScript vanilla)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Menu hamburger mobile */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  const closeMenu = () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Ferme le menu après un clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  /* 2. Navbar : style au défilement + lien actif */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = navLinks.querySelectorAll('a');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Met en évidence le lien de la section visible
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));

    // Bouton retour en haut
    backToTop.classList.toggle('show', window.scrollY > 500);
  };

  /* 3. Animations d'apparition au défilement */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Anime les barres de compétences quand la carte apparaît
        entry.target.querySelectorAll('.bar span').forEach(bar => {
          bar.style.width = bar.dataset.level + '%';
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Les barres de compétences sont dans des cartes .reveal : on les anime aussi directement
  // si la carte est déjà visible au chargement.
  document.querySelectorAll('.skill .bar span').forEach(bar => {
    bar.parentElement.parentElement.classList.contains('visible') &&
      (bar.style.width = bar.dataset.level + '%');
  });

  /* 4. Bouton retour en haut */
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 5. Filtre des projets */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projects.forEach(project => {
        const match = filter === 'all' || project.dataset.category === filter;
        project.classList.toggle('hide', !match);
      });
    });
  });

  /* 6. Validation du formulaire de contact */
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name:    { test: v => v.length >= 2, msg: 'Veuillez saisir votre nom (2 caractères minimum).' },
    email:   { test: v => emailPattern.test(v), msg: 'Veuillez saisir une adresse email valide.' },
    subject: { test: v => v.length >= 3, msg: 'Veuillez saisir un sujet (3 caractères minimum).' },
    message: { test: v => v.length >= 10, msg: 'Votre message doit contenir au moins 10 caractères.' }
  };

  const validateField = (field) => {
    const rule = rules[field.name];
    const wrapper = field.parentElement;
    const error = document.getElementById(`${field.name}-error`);
    const valid = rule.test(field.value.trim());

    wrapper.classList.toggle('invalid', !valid);
    error.textContent = valid ? '' : rule.msg;
    return valid;
  };

  // Validation en direct, après la première interaction avec le champ
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => field.value && validateField(field));
    field.addEventListener('input', () => {
      if (field.parentElement.classList.contains('invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = [...form.querySelectorAll('input, textarea')];
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      formStatus.textContent = 'Merci de corriger les champs en rouge.';
      formStatus.style.color = 'var(--danger)';
      return;
    }

    // Aucun envoi réel : à brancher sur votre service (EmailJS, formulaire PHP, etc.)
    formStatus.style.color = 'var(--primary-light)';
    formStatus.textContent = 'Merci ! Votre message a bien été validé.';
    form.reset();
  });
});

/* ==========================================================================
   Effets premium : inclinaison 3D légère et halo qui suit la souris
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduceMotion) return;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);

      // Inclinaison subtile (max 4°)
      const rotX = ((y / rect.height) - 0.5) * -4;
      const rotY = ((x / rect.width) - 0.5) * 4;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
