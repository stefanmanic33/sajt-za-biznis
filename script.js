const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const year = document.querySelector('#year');
const reveals = document.querySelectorAll('.reveal');

if (year) year.textContent = new Date().getFullYear();

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((item) => observer.observe(item));


const leadForm = document.querySelector('#leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(leadForm);
    const occupation = formData.get('occupation') || '';
    const firstName = formData.get('firstName') || '';
    const lastName = formData.get('lastName') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || '';
    const subject = encodeURIComponent('Upit za izradu sajta');
    const body = encodeURIComponent([
      'Zdravo,',
      '',
      'Šaljem upit za izradu sajta.',
      '',
      'Delatnost / zanimanje: ' + occupation,
      'Ime: ' + firstName,
      'Prezime: ' + lastName,
      'Kontakt telefon: ' + phone,
      'Email: ' + email,
      '',
      'Pozdrav'
    ].join('\n'));
    window.location.href = 'mailto:kontakt@sajtzabiznis.rs?subject=' + subject + '&body=' + body;
  });
}
