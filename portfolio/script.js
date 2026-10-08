document.addEventListener('DOMContentLoaded', () => {

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('liens-nav');

  const closeMenu = () => {
    burger.classList.remove('ouvert');
    navLinks.classList.remove('ouvert');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('ouvert');
    burger.classList.toggle('ouvert', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = navLinks.querySelectorAll('a');

  const onScroll = () => {
    navbar.classList.toggle('defile', window.scrollY > 50);

    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    navAnchors.forEach(a => a.classList.toggle('actif', a.getAttribute('href') === `#${current}`));

    backToTop.classList.toggle('affiche', window.scrollY > 500);
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.barre span').forEach(bar => {
          bar.style.width = bar.dataset.niveau + '%';
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.apparition').forEach(el => revealObserver.observe(el));

  document.querySelectorAll('.competence .barre span').forEach(bar => {
    bar.parentElement.parentElement.classList.contains('visible') &&
      (bar.style.width = bar.dataset.niveau + '%');
  });

  const backToTop = document.getElementById('retour-haut');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const filterButtons = document.querySelectorAll('.bouton-filtre');
  const projects = document.querySelectorAll('.projet');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('actif'));
      btn.classList.add('actif');

      const filter = btn.dataset.filtre;
      projects.forEach(project => {
        const match = filter === 'all' || project.dataset.categorie === filter;
        project.classList.toggle('cache', !match);
      });
    });
  });

  const form = document.getElementById('formulaire-contact');
  const formStatus = document.getElementById('statut-formulaire');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    nom:    { test: v => v.length >= 2, msg: 'Veuillez saisir votre nom (2 caractères minimum).' },
    email:   { test: v => emailPattern.test(v), msg: 'Veuillez saisir une adresse email valide.' },
    sujet: { test: v => v.length >= 3, msg: 'Veuillez saisir un sujet (3 caractères minimum).' },
    message: { test: v => v.length >= 10, msg: 'Votre message doit contenir au moins 10 caractères.' }
  };

  const validateField = (field) => {
    const rule = rules[field.name];
    const wrapper = field.parentElement;
    const error = document.getElementById(`${field.name}-erreur`);
    const valid = rule.test(field.value.trim());

    wrapper.classList.toggle('invalide', !valid);
    error.textContent = valid ? '' : rule.msg;
    return valid;
  };

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => field.value && validateField(field));
    field.addEventListener('input', () => {
      if (field.parentElement.classList.contains('invalide')) validateField(field);
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

    formStatus.style.color = 'var(--primary-light)';
    formStatus.textContent = 'Merci ! Votre message a bien été validé.';
    form.reset();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduceMotion) return;

  document.querySelectorAll('.carte').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);

      const rotX = ((y / rect.height) - 0.5) * -4;
      const rotY = ((x / rect.width) - 0.5) * 4;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
