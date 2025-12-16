/**
 * Academic Profile Website
 * Main JavaScript file
 */

// ==========================================================================
// DOM Elements
// ==========================================================================

const elements = {
    year: document.getElementById('year'),
    today: document.getElementById('today'),
    themeToggle: document.getElementById('theme-toggle'),
    scrollTop: document.getElementById('scroll-top'),
    navLinks: document.querySelectorAll('nav a'),
    sections: document.querySelectorAll('article[id], .sidebar-section[id]')
};

// ==========================================================================
// Date Display
// ==========================================================================

function initDateDisplay() {
    const now = new Date();

    if (elements.year) {
        elements.year.textContent = now.getFullYear();
    }

    if (elements.today) {
        elements.today.textContent = now.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// ==========================================================================
// Dark Mode
// ==========================================================================

function initDarkMode() {
    // Check for saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';

    if (savedDarkMode) {
        document.body.classList.add('dark');
        elements.themeToggle.textContent = '☀️';
    }

    // Toggle handler
    elements.themeToggle.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    elements.themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
}

// ==========================================================================
// Active Navigation Highlight
// ==========================================================================

function initActiveNavHighlight() {
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    let current = '';

    elements.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================================================
// Scroll to Top Button
// ==========================================================================

function initScrollToTop() {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', toggleScrollTopVisibility);

    // Scroll to top on click
    elements.scrollTop.addEventListener('click', scrollToTop);
}

function toggleScrollTopVisibility() {
    if (window.scrollY > 300) {
        elements.scrollTop.classList.add('visible');
    } else {
        elements.scrollTop.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================================================
// Initialize
// ==========================================================================

function init() {
    initDateDisplay();
    initDarkMode();
    initActiveNavHighlight();
    initScrollToTop();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
