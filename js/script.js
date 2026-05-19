/**
 * DISCOVER PALAWAN — Main Script
 * Handles: scroll effects, parallax, counters, 3D tilt cards,
 *          loading screen, scroll progress, fade-in animations,
 *          destination cards (dynamic), search, filter, modal,
 *          gallery lightbox, form validation
 */

// ============================================================
// LOADING SCREEN
// ============================================================
window.addEventListener('load', function () {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            setTimeout(() => loader.remove(), 500);
        }, 800);
    }
});

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        bar.style.width = pct + '%';
    });
}

// ============================================================
// FADE-IN ON SCROLL (Intersection Observer)
// ============================================================
function initScrollFadeIn() {
    const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
        }
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

// ============================================================
// 3D CARD TILT EFFECT (mousemove)
// ============================================================
function initCardTilt() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -8;
            const rotateY = ((x - cx) / cx) * 8;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

// ============================================================
// PARALLAX HERO
// ============================================================
function initParallax() {
    const heroImg = document.querySelector('.hero-img-parallax');
    if (!heroImg) return;
    window.addEventListener('scroll', () => {
        const y = window.scrollY * 0.4;
        heroImg.style.transform = `translateY(${y}px)`;
    });
}

// ============================================================
// FLOATING PARTICLES (hero canvas)
// ============================================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// ============================================================
// DESTINATIONS PAGE — Dynamic Cards, Search, Filter, Modal
// ============================================================
function initDestinationsPage() {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    let activeFilter = 'All';
    let searchQuery = '';

    function getCategoryColor(category) {
        const colors = {
            'Beach': '#2869b9',
            'Mountain': '#2f8336',
            'Island': '#ed751c',
            'Historical Site': '#e02c2d',
            'Adventure': '#8B5CF6',
            'Waterfall': '#06B6D4',
            'Food Destination': '#F59E0B'
        };
        return colors[category] || '#2869b9';
    }

    function renderCards(destinations) {
        if (!destinations.length) {
            grid.innerHTML = `<div class="col-12 text-center py-5">
                <i class="bi bi-search" style="font-size:3rem;color:var(--muted);"></i>
                <p class="mt-3 text-muted">No destinations found. Try a different search or filter.</p>
            </div>`;
            return;
        }
        grid.innerHTML = destinations.map(d => `
            <div class="col-sm-6 col-lg-4 mb-4 fade-in tilt-card-wrapper">
                <div class="dest-card tilt-card" data-id="${d.id}">
                    <div class="dest-card-img-wrap">
                        <img src="${d.image}" alt="${d.name}" loading="lazy">
                        <span class="dest-badge" style="background:${getCategoryColor(d.category)}">${d.category}</span>
                    </div>
                    <div class="dest-card-body">
                        <div class="dest-card-location"><i class="bi bi-geo-alt-fill"></i> ${d.city}, Palawan</div>
                        <h3 class="dest-card-title">${d.name}</h3>
                        <p class="dest-card-desc">${d.shortDesc}</p>
                        <button class="btn btn-primary btn-sm mt-2 view-details-btn" data-id="${d.id}">
                            View Details <i class="bi bi-arrow-right-circle ms-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-init tilt and fade
        initCardTilt();
        initScrollFadeIn();

        // View details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                openDestinationModal(id);
            });
        });
    }

    function filterAndSearch() {
        let results = window.DESTINATIONS;
        if (activeFilter !== 'All') {
            results = results.filter(d => d.category === activeFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            results = results.filter(d =>
                d.name.toLowerCase().includes(q) ||
                d.city.toLowerCase().includes(q) ||
                d.category.toLowerCase().includes(q) ||
                d.tags.some(t => t.includes(q))
            );
        }
        renderCards(results);
        updateResultCount(results.length);
    }

    function updateResultCount(count) {
        const countEl = document.getElementById('result-count');
        if (countEl) countEl.textContent = `${count} destination${count !== 1 ? 's' : ''} found`;
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.dataset.filter;
            filterAndSearch();
        });
    });

    // Search input
    const searchInput = document.getElementById('dest-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            searchQuery = this.value;
            filterAndSearch();
        });
    }

    // Apply URL filter param
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get('filter');
    if (urlFilter) {
        activeFilter = urlFilter;
        const matchBtn = document.querySelector(`.filter-btn[data-filter="${urlFilter}"]`);
        if (matchBtn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            matchBtn.classList.add('active');
        }
    }

    // Initial render
    filterAndSearch();
}

// ============================================================
// DESTINATION MODAL
// ============================================================
function openDestinationModal(id) {
    const dest = window.DESTINATIONS.find(d => d.id === id);
    if (!dest) return;

    const modal = document.getElementById('dest-modal');
    if (!modal) return;

    // Populate modal
    document.getElementById('modal-img').src = dest.image;
    document.getElementById('modal-img').alt = dest.name;
    document.getElementById('modal-title').textContent = dest.name;
    document.getElementById('modal-location').textContent = dest.location;
    document.getElementById('modal-category').textContent = dest.category;
    document.getElementById('modal-desc').textContent = dest.fullDesc;
    document.getElementById('modal-activities').innerHTML = dest.activities.map(a =>
        `<span class="activity-tag"><i class="bi bi-check-circle-fill"></i> ${a}</span>`
    ).join('');
    document.getElementById('modal-best-time').textContent = dest.bestTime;
    document.getElementById('modal-fee').textContent = dest.entranceFee;
    document.getElementById('modal-hours').textContent = dest.openingHours;
    document.getElementById('modal-tips').textContent = dest.travelTips;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// ============================================================
// GALLERY LIGHTBOX
// ============================================================
function initGalleryLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[index];
        lightboxImg.src = item.querySelector('img').src;
        lightboxCaption.textContent = item.dataset.caption || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-next')?.addEventListener('click', nextImage);
    document.getElementById('lightbox-prev')?.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

// ============================================================
// FORM VALIDATION (Contact / Inquiry)
// ============================================================
function initFormValidation() {
    const form = document.getElementById('inquiry-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        form.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');

        function setError(fieldId, msg) {
            const field = document.getElementById(fieldId);
            const feedback = document.getElementById(fieldId + '-error');
            if (field) field.classList.add('is-invalid');
            if (feedback) feedback.textContent = msg;
            isValid = false;
        }

        // Full Name
        const name = document.getElementById('full-name');
        if (!name || !name.value.trim()) setError('full-name', 'Full name is required.');

        // Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.value.trim())) setError('email', 'Please enter a valid email address.');

        // Contact Number
        const contact = document.getElementById('contact-number');
        const numRegex = /^[0-9+\-\s()]{7,15}$/;
        if (!contact || !numRegex.test(contact.value.trim())) setError('contact-number', 'Contact number must contain numbers only (7–15 digits).');

        // Destination
        const dest = document.getElementById('destination');
        if (!dest || !dest.value) setError('destination', 'Please select a destination.');

        // Travel Date
        const date = document.getElementById('travel-date');
        if (!date || !date.value) setError('travel-date', 'Please select your travel date.');
        else {
            const selectedDate = new Date(date.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) setError('travel-date', 'Travel date must be in the future.');
        }

        // Number of Visitors
        const visitors = document.getElementById('num-visitors');
        if (!visitors || parseInt(visitors.value) < 1 || isNaN(parseInt(visitors.value))) {
            setError('num-visitors', 'Number of visitors must be at least 1.');
        }

        // Message
        const message = document.getElementById('message');
        if (!message || !message.value.trim()) setError('message', 'Message is required.');

        if (isValid) {
            // Show success
            const successAlert = document.getElementById('form-success');
            if (successAlert) {
                successAlert.classList.remove('d-none');
                form.reset();
                setTimeout(() => successAlert.classList.add('d-none'), 5000);
                successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Populate destination dropdown from data
    const destSelect = document.getElementById('destination');
    if (destSelect && window.DESTINATIONS) {
        window.DESTINATIONS.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.name;
            opt.textContent = `${d.name} — ${d.city}`;
            destSelect.appendChild(opt);
        });
    }
}

// ============================================================
// TESTIMONIALS SLIDER
// ============================================================
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.testimonial-dot');
    let current = 0;
    let autoTimer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current]?.classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current]?.classList.add('active');
    }

    function autoPlay() {
        autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    slider.querySelector('.slider-prev')?.addEventListener('click', () => {
        clearInterval(autoTimer);
        goTo(current - 1);
        autoPlay();
    });

    slider.querySelector('.slider-next')?.addEventListener('click', () => {
        clearInterval(autoTimer);
        goTo(current + 1);
        autoPlay();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(autoTimer);
            goTo(i);
            autoPlay();
        });
    });

    goTo(0);
    autoPlay();
}

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================================
// NAVBAR ACTIVE STATE & SCROLL CLASS
// ============================================================
function initNavbar() {
    // Scroll class already handled in components.js
    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar .nav-link, .navbar .dropdown-item').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// SCROLL-TO-TOP BUTTON
// ============================================================
function initScrollToTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// NEWSLETTER FORM
// ============================================================
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            this.innerHTML = `<div class="alert alert-success mb-0">
                <i class="bi bi-check-circle-fill me-2"></i>
                Thank you! You've subscribed to Palawan travel updates.
            </div>`;
        }
    });
}

// ============================================================
// INIT ALL ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    initScrollProgress();
    initScrollFadeIn();
    initCounters();
    initCardTilt();
    initParallax();
    initParticles();
    initGalleryLightbox();
    initFormValidation();
    initTestimonialSlider();
    initSmoothScroll();
    initNavbar();
    initScrollToTop();
    initNewsletter();
    initDestinationsPage();
});
