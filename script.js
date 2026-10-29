(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];
  const form = document.getElementById('demo-contact-form');
  const feedback = document.getElementById('form-feedback');
  const toast = document.getElementById('toast');
  const year = document.getElementById('year');
  let toastTimer;

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  // Prefill the demo enquiry type when a visitor selects one of the two pathways.
  document.querySelectorAll('[data-interest]').forEach(link => {
    link.addEventListener('click', () => {
      const select = form?.elements.namedItem('interest');
      if (select) select.value = link.getAttribute('data-interest') || '';
    });
  });

  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 5000);
  };

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      feedback.textContent = '';
      const name = form.elements.namedItem('name');
      const email = form.elements.namedItem('email');
      const interest = form.elements.namedItem('interest');
      const message = form.elements.namedItem('message');
      if (!name.value.trim() || !email.value.trim() || !interest.value || !message.value.trim()) {
        feedback.textContent = 'Please complete the required fields to preview the form response.';
        showToast('A few required fields are missing. Review the form and try again.');
        return;
      }
      if (!email.validity.valid) {
        email.focus();
        feedback.textContent = 'Please enter a valid email format for this demo.';
        return;
      }
      // Deliberately do not send, store, or log the submitted content.
      form.reset();
      feedback.textContent = 'Demo successful: in the production website, this is where the approved submission and confirmation flow would begin.';
      showToast('Prototype response only — no information was sent or stored.');
    });
  }
})();
