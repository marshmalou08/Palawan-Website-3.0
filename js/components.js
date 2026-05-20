/**
 * DISCOVER PALAWAN — Shared Components
 * Injects navbar and footer into every page
 */

// NAVBAR HTML
function getNavbar(activePage = '') {
    return `
    <nav class="navbar navbar-expand-lg sticky-top" id="mainNavbar">
        <div class="container-fluid px-4">
            <a class="navbar-brand logo-lockup" href="index.html">
                <img src="images/logo.png" alt="Discover Palawan" class="logo">
                <div class="logo-official">
                    <span>Province of Palawan</span>
                    <span>Official Tourism Guide</span>
                </div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#mainNav" aria-controls="mainNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                <i class="bi bi-list fs-3"></i>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="mainNav">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ${['about','people','gastronomy','arts-crafts','history','why-visit'].includes(activePage)?'active':''}" href="#" data-bs-toggle="dropdown">Explore</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="about.html">About Palawan</a></li>
                            <li><span class="dropdown-heading">People &amp; Culture</span></li>
                            <li><a class="dropdown-item" href="festivals.html">Festivals &amp; Culture</a></li>
                            <li><a class="dropdown-item" href="food.html">Food &amp; Cuisine</a></li>
                            <li><a class="dropdown-item" href="history.html">History</a></li>
                            <li><a class="dropdown-item" href="why-visit.html">Why Visit?</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ${activePage==='destinations'?'active':''}" href="destinations.html" data-bs-toggle="dropdown">Destinations</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="destinations.html">All Destinations</a></li>
                            <li><a class="dropdown-item" href="destinations.html?filter=Beach">Beaches</a></li>
                            <li><a class="dropdown-item" href="destinations.html?filter=Island">Islands</a></li>
                            <li><a class="dropdown-item" href="destinations.html?filter=Historical+Site">Heritage Sites</a></li>
                            <li><a class="dropdown-item" href="destinations.html?filter=Adventure">Adventure</a></li>
                            <li><a class="dropdown-item" href="destinations.html?filter=Mountain">Mountains</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${activePage==='gallery'?'active':''}" href="gallery.html">Gallery</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ${['travel-tips','plan-your-trip'].includes(activePage)?'active':''}" href="#" data-bs-toggle="dropdown">Travel Tips</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="travel-tips.html">Travel Guide</a></li>
                            <li><a class="dropdown-item" href="plan-your-trip.html">Plan Your Trip</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${activePage==='contact'?'active':''}" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;
}

// FOOTER HTML
function getFooter() {
    return `
    <footer class="page-footer">
        <div class="container footer-top">
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="footer-brand">
                        <img src="images/logo.png" alt="Discover Palawan" class="footer-logo">
                        <p class="footer-tagline">Every island, an adventure.</p>
                        <p class="footer-desc">Your complete guide to Palawan — the last frontier of the Philippines and one of the most beautiful island provinces on Earth.</p>
                        <div class="footer-socials d-flex gap-2 flex-wrap">
                            <a href="https://www.facebook.com/itsmorefuninthephilippines" target="_blank" class="social-icon" title="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/itsmorefuninthephilippines/" target="_blank" class="social-icon" title="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                            </a>
                            <a href="https://twitter.com/philippinesdot" target="_blank" class="social-icon" title="X / Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="https://www.youtube.com/@itsmorefuninthephilippines" target="_blank" class="social-icon" title="YouTube">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1a2e"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="footer-col">
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="about.html">About Palawan</a></li>
                            <li><a href="festivals.html">Festivals</a></li>
                            <li><a href="food.html">Food &amp; Cuisine</a></li>
                            <li><a href="history.html">History</a></li>
                            <li><a href="why-visit.html">Why Visit?</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="footer-col">
                        <h4>Destinations</h4>
                        <ul>
                            <li><a href="destinations.html?filter=Beach">Beaches</a></li>
                            <li><a href="destinations.html?filter=Island">Islands</a></li>
                            <li><a href="destinations.html?filter=Historical+Site">Heritage Sites</a></li>
                            <li><a href="destinations.html?filter=Adventure">Adventure</a></li>
                            <li><a href="destinations.html">All Destinations</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="footer-col">
                        <h4>Travel Info</h4>
                        <ul>
                            <li><a href="travel-tips.html">Travel Guide</a></li>
                            <li><a href="gallery.html">Photo Gallery</a></li>
                            <li><a href="plan-your-trip.html">Plan Your Trip</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="footer-divider"></div>
            <div class="footer-bottom">
                <div class="footer-flags">
                    <span class="flag-stripe flag-ph-stripe-blue"></span>
                    <span class="flag-stripe flag-ph-stripe-red"></span>
                    <span class="flag-stripe flag-ph-stripe-gold"></span>
                </div>
                <p>&copy; 2026 Discover Palawan Tourism Guide &nbsp;|&nbsp; <em>The Last Frontier of the Philippines</em></p>
            </div>
        </div>
    </footer>`;
}

// INJECT ON DOM READY
document.addEventListener('DOMContentLoaded', function () {
    // Get active page from meta tag or body data attribute
    const activePage = document.body.dataset.page || '';

    // Inject navbar
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = getNavbar(activePage);

    // Inject footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = getFooter();

    // Sticky navbar scroll effect
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
});
