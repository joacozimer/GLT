document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navbarLogo = document.getElementById('navbar-logo');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Create the dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Oscuro';

    const toggleListItem = document.createElement('li');
    toggleListItem.appendChild(darkModeToggle);
    navLinks.appendChild(toggleListItem);

    // References to particle containers
    const particlesContainers = {
        services: document.getElementById('particles-js-services'),
        portfolio: document.getElementById('particles-js-portfolio'),
        contact: document.getElementById('particles-js-contact')
    };

    // Base configuration for particles.js
    const initialParticlesConfig = {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } },
            "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
        },
        "interactivity": {
            "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": {
                "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
                "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                "repulse": { "distance": 200, "duration": 0.4 },
                "push": { "particles_nb": 4 },
                "remove": { "particles_nb": 2 }
            }
        },
        "retina_detect": true
    };

    let isDarkMode = false; // State variable to track current mode

    // Function to update particles color and reinitialize
    function updateParticles(containerId, particleColor, lineColor) {
        if (window.particlesJS) { // Ensure particlesJS library is loaded
            particlesJS(containerId, {
                ...initialParticlesConfig, // Use the base config
                "particles": {
                    ...initialParticlesConfig.particles,
                    "color": { "value": particleColor }, // Update particle color
                    "line_linked": {
                        ...initialParticlesConfig.particles.line_linked,
                        "color": lineColor // Update line color
                    }
                }
            });
        }
    }

    // Function to toggle dark mode
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        body.classList.toggle('dark-mode');

        if (isDarkMode) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Claro';
            navbarLogo.src = 'Img/GreenLimeGreyBackground.jpg';
            Object.keys(particlesContainers).forEach(key => {
                const container = particlesContainers[key];
                if (container) {
                    container.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-bg');
                    updateParticles(container.id,
                        getComputedStyle(document.documentElement).getPropertyValue('--dark-particles'),
                        getComputedStyle(document.documentElement).getPropertyValue('--dark-particles')
                    );
                }
            });
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Oscuro';
            navbarLogo.src = 'Img/GreenLimeWhiteBackground.jpg';
            Object.keys(particlesContainers).forEach(key => {
                const container = particlesContainers[key];
                if (container) {
                    container.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-white');
                    updateParticles(container.id,
                        getComputedStyle(document.documentElement).getPropertyValue('--light-particles'),
                        getComputedStyle(document.documentElement).getPropertyValue('--light-particles')
                    );
                }
            });
        }
    }

    // Add event listener for the dark mode toggle button
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Initial particle setup (light mode by default on page load)
    Object.keys(particlesContainers).forEach(key => {
        const container = particlesContainers[key];
        if (container) {
            updateParticles(container.id,
                getComputedStyle(document.documentElement).getPropertyValue('--light-particles'),
                getComputedStyle(document.documentElement).getPropertyValue('--light-particles')
            );
        }
    });

    // Hamburger Menu Toggle
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Check if the clicked link is not the dark mode toggle itself
            if (!link.parentElement.classList.contains('dark-mode-toggle') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Complex Animations (Fade-in on scroll for content sections)
    const contentSections = document.querySelectorAll('.content-section, .contact-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    contentSections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        observer.observe(section);
    });

    // Scroll-to-top button logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});