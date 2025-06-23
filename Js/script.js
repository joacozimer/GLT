function setLogoByMode(isDark) {
    const logo = document.getElementById('logo-img');
    logo.style.opacity = 0;
    setTimeout(() => {
        logo.src = isDark
            ? './Img/GreenLimeGreyBackground.jpg'
            : './Img/GreenLimeWhiteBackground.jpg';
        logo.style.opacity = 1; // Fade in
    }, 250);
}

function setModeLabel(isDark) {
    document.getElementById('mode-label').textContent = isDark ? 'Modo claro' : 'Modo oscuro';
}

function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');

    // Add a temporary class to trigger the transition
    body.classList.add('mode-switching');

    // Toggle the dark-mode class
    body.classList.toggle('dark-mode');

    const icon = document.getElementById('mode-icon');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');

    setLogoByMode(!isDark); // Toggle the logo based on the *new* mode
    setModeLabel(!isDark); // Toggle the label based on the *new* mode
    localStorage.setItem('darkMode', !isDark);

    // Remove the temporary class after a short delay to allow the transition to happen
    // This timeout duration should be equal to or slightly longer than your main
    // body transition (0.8s) for background-color and color.
    setTimeout(() => {
        body.classList.remove('mode-switching');
    }, 850); // 850ms, slightly longer than 800ms (0.8s) to ensure transition completes
}

function setInitialMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = savedMode === 'true' || (savedMode === null && prefersDark); // Handle savedMode being null
    if (useDark) {
        document.body.classList.add('dark-mode');
        // Ensure the correct icon and label are set on initial load
        document.getElementById('mode-icon').classList.replace('fa-moon', 'fa-sun');
        setLogoByMode(true);
        setModeLabel(true);
    }
}

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    // Toggle the 'nav-open' class on the header itself, as it contains the nav
    navbar.classList.toggle('nav-open');
    const toggleBtn = document.querySelector('.logo-toggle'); // Assuming this is your menu toggle button
    const isOpen = navbar.classList.contains('nav-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
    const navbar = document.getElementById('navbar');
    const toggleBtn = document.querySelector('.logo-toggle'); // Assuming this is your menu toggle button
    navbar.classList.remove('nav-open');
    toggleBtn.setAttribute('aria-expanded', false);
}

// Event listener for navigation links to close the menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Cierra menú si se hace click fuera
document.addEventListener('click', function (e) {
    const header = document.getElementById('navbar'); // The header contains the navigation
    const toggleBtn = document.querySelector('.logo-toggle');

    // Check if the click is outside the header AND the menu is open
    // Also ensure the click isn't on the toggle button itself
    if (header.classList.contains('nav-open') && !header.contains(e.target) && e.target !== toggleBtn) {
        closeMenu();
    }
});


document.addEventListener('DOMContentLoaded', setInitialMode);

// Botón scroll top
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

// Oculta preloader al terminar de cargar la página
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Use opacity transition for a smoother fade out
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Match this with transition duration in CSS
    }
});