/**
 * Portfolio Website - Main JavaScript
 * Handles smooth scrolling, scroll animations, and navigation interactions
 */

/* ========================================
   INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
   ======================================== */

/**
 * Initializes the Intersection Observer to trigger fade-in animations
 * when elements come into view during scrolling
 */
function initScrollAnimations() {
    // Create an Intersection Observer with options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Callback function when elements become visible
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the fade-in class to trigger animation
                entry.target.classList.add('fade-in');
                // Stop observing this element to prevent re-animation
                observer.unobserve(entry.target);
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll(
        'section:not(.hero), .work-item'
    );

    // Start observing each element
    elementsToAnimate.forEach(element => {
        // Reset opacity to 0 so animation starts from invisible
        element.style.opacity = '0';
        observer.observe(element);
    });
}

/* ========================================
   SMOOTH SCROLLING FOR NAVIGATION LINKS
   ======================================== */

/**
 * Handles navigation link clicks for smooth scrolling
 * and highlights the active navigation link
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the target section ID from the href attribute
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate offset for fixed navbar (70px)
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active link
                updateActiveLink(link);
            }
        });
    });
}

/* ========================================
   ACTIVE NAVIGATION LINK HIGHLIGHTING
   ======================================== */

/**
 * Updates the active navigation link based on scroll position
 * Highlights the navigation item corresponding to the current section
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.navbar').offsetHeight;

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.fontWeight = '500';
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.style.fontWeight = '700';
            }
        });
    });
}

/**
 * Helper function to update the active link styling
 * @param {HTMLElement} activeLink - The link element that should be marked as active
 */
function updateActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.fontWeight = '500';
    });
    activeLink.style.fontWeight = '700';
}

/* ========================================
   NAVBAR SHADOW ON SCROLL
   ======================================== */

/**
 * Adds a subtle shadow to the navbar when page is scrolled down
 * Creates a visual separation between navbar and content
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

/* ========================================
   CONTACT LINK INTERACTIONS
   ======================================== */

/**
 * Enhances contact links with hover effects and interactions
 * Provides visual feedback for user interactions
 */
function initContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-link');

    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}

/* ========================================
   STAGGER ANIMATION FOR WORK ITEMS
   ======================================== */

/**
 * Applies staggered fade-in animations to work items
 * Each item animates in sequence with a slight delay
 */
function initWorkItemAnimations() {
    const workItems = document.querySelectorAll('.work-item');

    workItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animation = `fadeInUp 0.8s ease-out forwards`;
    });
}

/* ========================================
   DOCUMENT READY - INITIALIZE ALL FEATURES
   ======================================== */

/**
 * Main initialization function
 * Called when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollAnimations();
    initSmoothScroll();
    initScrollSpy();
    initNavbarScrollEffect();
    initContactLinks();
    initWorkItemAnimations();

    // Log initialization complete (optional, for debugging)
    console.log('Portfolio website initialized successfully');
});

/* ========================================
   PREFETCH RESOURCES (Performance optimization)
   ======================================== */

/**
 * Preload images when the page loads to improve perceived performance
 * Useful for work item images that load via JavaScript
 */
window.addEventListener('load', () => {
    // Page is fully loaded - all images are loaded
    // You can add additional optimizations here if needed
});

/* ========= MODAL ========= */

const modal = document.getElementById("art-modal");
const modalImg = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");

let currentIndex = 0;
const items = [...document.querySelectorAll(".work-item")];

function openModal(index) {
    const item = items[index];
    modalImg.src = item.querySelector("img").src;
    modalTitle.textContent = item.dataset.title;
    modalMeta.textContent = `${item.dataset.medium} — ${item.dataset.year}`;
    currentIndex = index;
    modal.classList.add("active");
}

// Item click opens modal
items.forEach((item, i) => item.addEventListener("click", () => openModal(i)));

// Close button
document.querySelector(".modal-close").onclick = () => modal.classList.remove("active");

// Prev/Next buttons
function showPrev() { openModal((currentIndex - 1 + items.length) % items.length); }
function showNext() { openModal((currentIndex + 1) % items.length); }

document.querySelector(".modal-prev").onclick = showPrev;
document.querySelector(".modal-next").onclick = showNext;

// Overlay navigation by halves
const overlay = document.querySelector(".modal-overlay");
overlay.innerHTML = `
    <div class="overlay-left"></div>
    <div class="overlay-right"></div>
`;
overlay.style.position = "absolute";
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.display = "flex";

const left = overlay.querySelector(".overlay-left");
const right = overlay.querySelector(".overlay-right");

[left, right].forEach(side => {
    side.style.flex = "1";
    side.style.cursor = "pointer";
    side.style.height = "100%";
    side.style.background = "transparent";
});

left.addEventListener("click", showPrev);
right.addEventListener("click", showNext);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape") modal.classList.remove("active");
});



/* ========= SMOOTH SCROLL ========= */

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

/* ========= LANGUAGE TOGGLE ========= */

const langToggle = document.getElementById("lang-toggle");
let currentLang = "en"; // default

langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "fr" : "en"; 
    langToggle.textContent = currentLang === "en" ? "FR" : "EN";

    // Select all elements with data-en attribute
    document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.dataset[currentLang];
    });
});
