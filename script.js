function setLogoByMode(isDark) {
    const logo = document.getElementById('logo-img');
    logo.style.opacity = 0;
    setTimeout(() => {
        logo.src = isDark ? 'GreenLimeGreyBackground.jpg' : 'GreenLimeWhiteBackground.jpg';
        logo.style.opacity = 1;
    }, 250);
}

function setModeLabel(isDark) {
    document.getElementById('mode-label').textContent = isDark ? 'Modo claro' : 'Modo oscuro';
}

function toggleDarkMode() {
    const isDark = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('mode-icon');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    setLogoByMode(isDark);
    setModeLabel(isDark);
    localStorage.setItem('darkMode', isDark);
}

function setInitialMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = savedMode === 'true' || (!savedMode && prefersDark);
    if (useDark) {
        document.body.classList.add('dark-mode');
        document.getElementById('mode-icon').classList.replace('fa-moon', 'fa-sun');
        setLogoByMode(true);
        setModeLabel(true);
    }
}

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const toggleBtn = document.querySelector('.logo-toggle');
    const isOpen = navbar.classList.toggle('nav-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
    const navbar = document.getElementById('navbar');
    const toggleBtn = document.querySelector('.logo-toggle');
    navbar.classList.remove('nav-open');
    toggleBtn.setAttribute('aria-expanded', false);
}

// Cierra menú si se hace click fuera
document.addEventListener('click', function (e) {
    const navbar = document.getElementById('navbar');
    if (navbar.classList.contains('nav-open') && !navbar.contains(e.target)) {
        closeMenu();
    }
});

// Inicializa modo al cargar DOM
document.addEventListener('DOMContentLoaded', setInitialMode);

// Scroll to top button
const scrollTopBtn = document.getElementById('btn-scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

