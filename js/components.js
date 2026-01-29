/* ========================================
   LOKASHOPY - Composants Reutilisables
   ======================================== */

const Components = {
  // ----------------------------------------
  // ICONS SVG
  // ----------------------------------------
  icons: {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    heartFilled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    barChart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    messageCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    alertCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    crosshair: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>',
    rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/></svg>'
  },

  // ----------------------------------------
  // HEADER
  // ----------------------------------------
  renderHeader(isAuthenticated = false, user = null, providerData = null) {
    const authSection = isAuthenticated
      ? this.renderUserMenu(user, providerData)
      : `
        <div class="nav-actions" id="nav-actions">
          <button class="btn btn-ghost btn-sm" id="login-btn">Connexion</button>
          <button class="btn btn-primary btn-sm" id="signup-btn">Inscription</button>
        </div>
      `;

    const mobileAuthSection = isAuthenticated
      ? `
        <div class="mobile-nav-user">
          <a href="/dashboard" class="btn btn-primary" data-nav="dashboard">
            ${this.icons.grid} Tableau de bord
          </a>
          <button class="btn btn-outline" id="mobile-logout-btn">Deconnexion</button>
        </div>
      `
      : `
        <div class="mobile-nav-actions">
          <button class="btn btn-outline" id="mobile-login-btn">Connexion</button>
          <button class="btn btn-primary" id="mobile-signup-btn">Inscription</button>
        </div>
      `;

    return `
      <header class="header" id="header">
        <div class="header-container">
          <a href="/" class="logo" data-nav="home">
            <span class="logo-icon">${this.icons.camera}</span>
            Loka<span>shopy</span>
          </a>

          <nav class="nav-desktop">
            <ul class="nav-links">
              <li><a href="/" class="nav-link" data-nav="home">Accueil</a></li>
              <li><a href="/recherche" class="nav-link" data-nav="search">Rechercher</a></li>
              ${isAuthenticated
                ? `<li><a href="/dashboard" class="nav-link" data-nav="dashboard">Tableau de bord</a></li>`
                : `<li><a href="/inscription-prestataire" class="nav-link" data-nav="register">Devenir prestataire</a></li>`
              }
            </ul>
          </nav>

          <div class="header-actions">
            ${authSection}
            <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu">
              ${this.icons.menu}
            </button>
          </div>
        </div>
      </header>

      <nav class="mobile-nav" id="mobile-nav">
        <div class="mobile-nav-header">
          <a href="/" class="logo" data-nav="home">
            <span class="logo-icon">${this.icons.camera}</span>
            Loka<span>shopy</span>
          </a>
          <button class="mobile-nav-close" id="mobile-nav-close" aria-label="Fermer">
            ${this.icons.x}
          </button>
        </div>
        <div class="mobile-nav-content">
          <ul class="mobile-nav-links">
            <li>
              <a href="/" class="mobile-nav-link" data-nav="home">
                ${this.icons.camera}
                <span>Accueil</span>
              </a>
            </li>
            <li>
              <a href="/recherche" class="mobile-nav-link" data-nav="search">
                ${this.icons.search}
                <span>Rechercher</span>
              </a>
            </li>
            ${isAuthenticated
              ? `
                <li>
                  <a href="/dashboard" class="mobile-nav-link" data-nav="dashboard">
                    ${this.icons.grid}
                    <span>Tableau de bord</span>
                  </a>
                </li>
              `
              : `
                <li>
                  <a href="/inscription-prestataire" class="mobile-nav-link" data-nav="register">
                    ${this.icons.users}
                    <span>Devenir prestataire</span>
                  </a>
                </li>
              `
            }
          </ul>
        </div>
        ${mobileAuthSection}
      </nav>
    `;
  },

  // ----------------------------------------
  // FOOTER
  // ----------------------------------------
  renderFooter() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="/" class="logo" data-nav="home">
                <span class="logo-icon">${this.icons.camera}</span>
                Loka<span>shopy</span>
              </a>
              <p>La premiere plateforme francaise pour trouver le photobooth ideal pour tous vos evenements.</p>
              <div class="footer-social">
                <a href="#" aria-label="Instagram">${this.icons.instagram}</a>
                <a href="#" aria-label="Facebook">${this.icons.facebook}</a>
              </div>
            </div>

            <div>
              <h4 class="footer-title">Navigation</h4>
              <ul class="footer-links">
                <li><a href="/" data-nav="home">Accueil</a></li>
                <li><a href="/recherche" data-nav="search">Rechercher</a></li>
                <li><a href="/inscription-prestataire" data-nav="register">Devenir prestataire</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-title">Informations</h4>
              <ul class="footer-links">
                <li><a href="#">Comment ca marche</a></li>
                <li><a href="#">Tarifs prestataires</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div class="footer-newsletter">
              <h4 class="footer-title">Newsletter</h4>
              <p>Recevez nos conseils et les meilleures offres</p>
              <form class="newsletter-form" onsubmit="return false;">
                <input type="email" placeholder="Votre email" required>
                <button type="submit" class="btn btn-primary btn-sm">${this.icons.send}</button>
              </form>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="footer-copyright">&copy; 2024 Lokashopy. Tous droits reserves.</p>
            <div class="footer-legal">
              <a href="#">Mentions legales</a>
              <a href="#">CGU</a>
              <a href="#">Confidentialite</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  // ----------------------------------------
  // PROVIDER CARD
  // ----------------------------------------
  renderProviderCard(provider, options = {}) {
    const { layout = 'grid' } = options;
    const favorites = Utils.storage.get('favorites', []);
    const isFavorite = favorites.includes(provider.id);

    const cardClass = layout === 'list' ? 'provider-card-list' : 'provider-card card';

    return `
      <article class="${cardClass}" data-provider-id="${provider.id}">
        <div class="card-image">
          <img src="${provider.cover[0]}" alt="${provider.name}" loading="lazy">
          ${provider.verified ? '<span class="card-badge">Verifie</span>' : ''}
          <button class="card-favorite ${isFavorite ? 'active' : ''}" data-action="favorite" data-id="${provider.id}" aria-label="Ajouter aux favoris">
            ${isFavorite ? this.icons.heartFilled : this.icons.heart}
          </button>
        </div>
        <div class="card-content">
          <div class="provider-card-header">
            <div class="provider-card-title">
              <h3>${provider.name}</h3>
              ${provider.verified ? `<span class="badge-verified" title="Prestataire verifie">${this.icons.check}</span>` : ''}
            </div>
            <div class="provider-card-rating">
              <span class="stars">${this.icons.star}</span>
              <span>${provider.rating.toFixed(1)}</span>
              <span class="count">(${provider.reviewCount})</span>
            </div>
          </div>
          <p class="provider-card-location">
            ${this.icons.location}
            ${provider.location.city} (${provider.location.department})
          </p>
          <div class="provider-card-tags">
            ${provider.boothTypes.slice(0, 3).map(type => {
              const boothType = DATA.BOOTH_TYPES.find(t => t.id === type);
              return `<span class="tag">${boothType ? boothType.name : type}</span>`;
            }).join('')}
          </div>
          <div class="provider-card-footer">
            <div class="provider-card-price">
              A partir de <strong>${Utils.formatPrice(provider.priceFrom)}</strong>
            </div>
            <a href="/prestataire/${provider.slug}" class="btn btn-primary btn-sm" data-nav="provider" data-slug="${provider.slug}">
              Voir le profil
            </a>
          </div>
        </div>
      </article>
    `;
  },

  // ----------------------------------------
  // BOOTH TYPE CARD
  // ----------------------------------------
  renderBoothTypeCard(type) {
    return `
      <a href="/recherche?type=${type.id}" class="booth-type-card" data-nav="search" data-type="${type.id}">
        <img src="https://picsum.photos/seed/${type.id}/300/300" alt="${type.name}" loading="lazy">
        <span>${type.name}</span>
      </a>
    `;
  },

  // ----------------------------------------
  // REVIEW CARD
  // ----------------------------------------
  renderReviewCard(review, options = {}) {
    const { showEventType = true } = options;

    return `
      <div class="review-card">
        <div class="review-card-header">
          <img src="${review.avatar}" alt="${review.author}" class="review-card-avatar" loading="lazy">
          <div class="review-card-info">
            <div class="review-card-name">${review.author}</div>
            <div class="review-card-meta">
              ${showEventType ? review.eventType + ' - ' : ''}${Utils.formatRelativeDate(review.date)}
            </div>
          </div>
          <div class="review-card-rating">
            ${Utils.generateStars(review.rating)}
          </div>
        </div>
        <p class="review-card-text">${review.text}</p>
        ${review.reply ? `
          <div class="review-card-reply">
            <div class="review-card-reply-header">
              ${this.icons.messageCircle}
              Reponse de ${review.reply.author}
            </div>
            <p>${review.reply.text}</p>
          </div>
        ` : ''}
      </div>
    `;
  },

  // ----------------------------------------
  // TESTIMONIAL CARD
  // ----------------------------------------
  renderTestimonialCard(testimonial) {
    return `
      <div class="review-card">
        <div class="review-card-header">
          <img src="${testimonial.avatar}" alt="${testimonial.author}" class="review-card-avatar" loading="lazy">
          <div class="review-card-info">
            <div class="review-card-name">${testimonial.author}</div>
            <div class="review-card-meta">${testimonial.eventType}</div>
          </div>
          <div class="review-card-rating">
            ${Utils.generateStars(testimonial.rating)}
          </div>
        </div>
        <p class="review-card-text">"${testimonial.text}"</p>
      </div>
    `;
  },

  // ----------------------------------------
  // SEARCH BAR
  // ----------------------------------------
  renderSearchBar(options = {}) {
    const { compact = false, values = {} } = options;

    if (compact) {
      return `
        <form class="search-header-form" id="search-form">
          <div class="search-header-field">
            ${this.icons.location}
            <input type="text" placeholder="Ville" name="location" value="${values.location || ''}">
          </div>
          <div class="search-header-field">
            ${this.icons.calendar}
            <select name="eventType">
              <option value="">Type d'evenement</option>
              ${DATA.EVENT_TYPES.map(type => `
                <option value="${type.id}" ${values.eventType === type.id ? 'selected' : ''}>${type.name}</option>
              `).join('')}
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-sm">
            ${this.icons.search}
            Rechercher
          </button>
        </form>
      `;
    }

    return `
      <div class="hero-search">
        <form class="hero-search-form" id="search-form">
          <div class="hero-search-field">
            ${this.icons.location}
            <input type="text" placeholder="Ville ou code postal" name="location" id="location-input" autocomplete="off">
            <button type="button" class="btn btn-ghost btn-icon" id="geolocate-btn" title="Me localiser">
              ${this.icons.crosshair}
            </button>
          </div>
          <div class="hero-search-field">
            ${this.icons.calendar}
            <select name="eventType" id="event-type-select">
              <option value="">Type d'evenement</option>
              ${DATA.EVENT_TYPES.map(type => `
                <option value="${type.id}">${type.name}</option>
              `).join('')}
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-lg hero-search-btn">
            ${this.icons.search}
            Rechercher
          </button>
        </form>
      </div>
    `;
  },

  // ----------------------------------------
  // FILTERS SIDEBAR
  // ----------------------------------------
  renderFiltersSidebar(currentFilters = {}) {
    return `
      <aside class="filters-sidebar">
        <div class="filters-header">
          <h3>Filtres</h3>
          <button class="filters-clear" id="clear-filters">Effacer tout</button>
        </div>

        <div class="filter-group">
          <button class="filter-title">
            Type de photobooth
            ${this.icons.chevronDown}
          </button>
          <div class="filter-options">
            ${DATA.BOOTH_TYPES.map(type => `
              <label class="form-checkbox">
                <input type="checkbox" name="boothType" value="${type.id}" ${currentFilters.boothTypes?.includes(type.id) ? 'checked' : ''}>
                <span>${type.name}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-title">
            Budget
            ${this.icons.chevronDown}
          </button>
          <div class="filter-range">
            <input type="range" class="form-range" id="price-min" min="200" max="2000" step="50" value="${currentFilters.priceMin || 200}">
            <input type="range" class="form-range" id="price-max" min="200" max="2000" step="50" value="${currentFilters.priceMax || 2000}">
            <div class="filter-range-values">
              <span id="price-min-value">${currentFilters.priceMin || 200}\u20ac</span>
              <span id="price-max-value">${currentFilters.priceMax || 2000}\u20ac</span>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-title">
            Options incluses
            ${this.icons.chevronDown}
          </button>
          <div class="filter-options">
            ${DATA.OPTIONS.map(option => `
              <label class="form-checkbox">
                <input type="checkbox" name="option" value="${option.id}" ${currentFilters.options?.includes(option.id) ? 'checked' : ''}>
                <span>${option.name}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-title">
            Note minimum
            ${this.icons.chevronDown}
          </button>
          <div class="filter-options">
            <div class="rating-input" id="rating-filter">
              ${[1,2,3,4,5].map(n => `
                <button type="button" data-rating="${n}" class="${currentFilters.minRating >= n ? 'active' : ''}">
                  ${this.icons.star}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-title">
            Distance (km)
            ${this.icons.chevronDown}
          </button>
          <div class="filter-range">
            <input type="range" class="form-range" id="radius-filter" min="10" max="200" step="10" value="${currentFilters.radius || 50}">
            <div class="filter-range-values">
              <span id="radius-value">${currentFilters.radius || 50} km</span>
            </div>
          </div>
        </div>
      </aside>
    `;
  },

  // ----------------------------------------
  // MODAL
  // ----------------------------------------
  renderModal(options = {}) {
    const { id, title, content, footer, size = 'md' } = options;

    return `
      <div class="modal-backdrop" id="${id}-backdrop"></div>
      <div class="modal ${size === 'lg' ? 'modal-lg' : ''}" id="${id}" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
        <div class="modal-header">
          <h3 class="modal-title" id="${id}-title">${title}</h3>
          <button class="modal-close" data-close-modal="${id}" aria-label="Fermer">
            ${this.icons.x}
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    `;
  },

  // ----------------------------------------
  // QUOTE REQUEST MODAL
  // ----------------------------------------
  renderQuoteModal(provider) {
    const content = `
      <form id="quote-form" class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Nom complet</label>
            <input type="text" class="form-input" name="name" required>
          </div>
          <div class="form-group">
            <label class="form-label required">Email</label>
            <input type="email" class="form-input" name="email" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Telephone</label>
            <input type="tel" class="form-input" name="phone" required>
          </div>
          <div class="form-group">
            <label class="form-label required">Date de l'evenement</label>
            <input type="date" class="form-input" name="eventDate" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label required">Type d'evenement</label>
          <select class="form-input form-select" name="eventType" required>
            <option value="">Selectionnez...</option>
            ${DATA.EVENT_TYPES.map(type => `
              <option value="${type.id}">${type.name}</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Votre message</label>
          <textarea class="form-input form-textarea" name="message" rows="4" placeholder="Decrivez votre projet, le nombre d'invites, vos attentes..."></textarea>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-ghost" data-close-modal="quote-modal">Annuler</button>
      <button class="btn btn-primary" id="submit-quote">Envoyer la demande</button>
    `;

    return this.renderModal({
      id: 'quote-modal',
      title: `Demander un devis a ${provider.name}`,
      content,
      footer,
      size: 'lg'
    });
  },

  // ----------------------------------------
  // LIGHTBOX
  // ----------------------------------------
  renderLightbox() {
    return `
      <div class="lightbox" id="lightbox" role="dialog" aria-modal="true">
        <button class="lightbox-close" id="lightbox-close" aria-label="Fermer">
          ${this.icons.x}
        </button>
        <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Precedent">
          ${this.icons.chevronLeft}
        </button>
        <div class="lightbox-content">
          <img src="" alt="" class="lightbox-image" id="lightbox-image">
        </div>
        <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Suivant">
          ${this.icons.chevronRight}
        </button>
      </div>
    `;
  },

  // ----------------------------------------
  // TOAST NOTIFICATION
  // ----------------------------------------
  showToast(options = {}) {
    const { type = 'info', title, message, duration = 5000 } = options;

    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = {
      success: this.icons.checkCircle,
      error: this.icons.alertCircle,
      warning: this.icons.alertCircle,
      info: this.icons.info
    };

    const toastId = Utils.generateId('toast');
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Fermer">${this.icons.x}</button>
    `;

    container.appendChild(toast);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this.hideToast(toastId);
    });

    // Auto close
    if (duration > 0) {
      setTimeout(() => this.hideToast(toastId), duration);
    }

    return toastId;
  },

  hideToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }
  },

  // ----------------------------------------
  // ACCORDION
  // ----------------------------------------
  renderAccordion(items, options = {}) {
    const { id = 'accordion' } = options;

    return `
      <div class="accordion" id="${id}">
        ${items.map((item, index) => `
          <div class="accordion-item">
            <button class="accordion-header" data-accordion="${id}-${index}">
              ${item.question}
              <span class="accordion-icon">${this.icons.chevronDown}</span>
            </button>
            <div class="accordion-content" id="${id}-${index}">
              <div class="accordion-body">${item.answer}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // ----------------------------------------
  // TABS
  // ----------------------------------------
  renderTabs(tabs, options = {}) {
    const { id = 'tabs', defaultTab = 0 } = options;

    return `
      <div class="tabs" id="${id}">
        <div class="tabs-list" role="tablist">
          ${tabs.map((tab, index) => `
            <button class="tab-btn ${index === defaultTab ? 'active' : ''}"
                    role="tab"
                    data-tab="${id}-${index}"
                    aria-selected="${index === defaultTab}"
                    aria-controls="${id}-panel-${index}">
              ${tab.label}
            </button>
          `).join('')}
        </div>
      </div>
      ${tabs.map((tab, index) => `
        <div class="tab-content ${index === defaultTab ? 'active' : ''}"
             id="${id}-panel-${index}"
             role="tabpanel"
             aria-labelledby="${id}-${index}">
          ${tab.content}
        </div>
      `).join('')}
    `;
  },

  // ----------------------------------------
  // PROGRESS STEPS
  // ----------------------------------------
  renderProgressSteps(steps, currentStep = 0) {
    return `
      <div class="steps-progress">
        ${steps.map((step, index) => `
          ${index > 0 ? `<div class="step-connector ${index <= currentStep ? 'completed' : ''}"></div>` : ''}
          <div class="step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}">
            <div class="step-number">
              ${index < currentStep ? this.icons.check : index + 1}
            </div>
            <span class="step-label">${step}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  // ----------------------------------------
  // PAGINATION
  // ----------------------------------------
  renderPagination(currentPage, totalPages) {
    if (totalPages <= 1) return '';

    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return `
      <nav class="pagination" aria-label="Pagination">
        <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
          ${this.icons.chevronLeft}
        </button>
        ${pages.map(page => page === '...'
          ? '<span class="page-btn">...</span>'
          : `<button class="page-btn ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`
        ).join('')}
        <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
          ${this.icons.chevronRight}
        </button>
      </nav>
    `;
  },

  // ----------------------------------------
  // SKELETON LOADERS
  // ----------------------------------------
  renderProviderCardSkeleton() {
    return `
      <div class="card provider-card">
        <div class="card-image skeleton skeleton-image"></div>
        <div class="card-content">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div style="display: flex; gap: 8px; margin-top: 16px;">
            <div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div>
            <div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div>
          </div>
        </div>
      </div>
    `;
  },

  renderSkeletonGrid(count = 6) {
    return Array(count).fill(this.renderProviderCardSkeleton()).join('');
  },

  // ----------------------------------------
  // AUTH MODALS
  // ----------------------------------------
  renderLoginModal() {
    const content = `
      <form id="login-form" class="auth-form">
        <div class="form-group">
          <label class="form-label required">Email</label>
          <input type="email" class="form-input" name="email" required autocomplete="email">
        </div>
        <div class="form-group">
          <label class="form-label required">Mot de passe</label>
          <input type="password" class="form-input" name="password" required autocomplete="current-password">
        </div>
        <div class="form-group">
          <button type="button" class="btn-link" id="forgot-password-btn">Mot de passe oublie ?</button>
        </div>
        <div class="auth-error" id="login-error" style="display: none;"></div>
        <button type="submit" class="btn btn-primary btn-block" id="login-submit-btn">
          Se connecter
        </button>
      </form>
      <div class="auth-footer">
        <p>Pas encore de compte ? <button type="button" class="btn-link" id="switch-to-register">Creer un compte</button></p>
      </div>
    `;

    return this.renderModal({
      id: 'login-modal',
      title: 'Connexion',
      content,
      size: 'sm'
    });
  },

  renderRegisterModal() {
    const content = `
      <form id="register-form" class="auth-form">
        <div class="auth-type-selection" id="auth-type-selection">
          <p class="auth-type-label">Vous etes :</p>
          <div class="auth-type-options">
            <label class="auth-type-option">
              <input type="radio" name="userType" value="client" checked>
              <span class="auth-type-card">
                ${this.icons.user}
                <strong>Client</strong>
                <small>Je cherche un photobooth</small>
              </span>
            </label>
            <label class="auth-type-option">
              <input type="radio" name="userType" value="provider">
              <span class="auth-type-card">
                ${this.icons.camera}
                <strong>Prestataire</strong>
                <small>Je loue des photobooths</small>
              </span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required">Email</label>
          <input type="email" class="form-input" name="email" required autocomplete="email">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Mot de passe</label>
            <input type="password" class="form-input" name="password" required minlength="6" autocomplete="new-password">
          </div>
          <div class="form-group">
            <label class="form-label required">Confirmer</label>
            <input type="password" class="form-input" name="passwordConfirm" required autocomplete="new-password">
          </div>
        </div>

        <div class="provider-fields" id="provider-fields" style="display: none;">
          <div class="form-group">
            <label class="form-label required">Nom de l'entreprise</label>
            <input type="text" class="form-input" name="companyName">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Telephone</label>
              <input type="tel" class="form-input" name="phone">
            </div>
            <div class="form-group">
              <label class="form-label required">Ville</label>
              <input type="text" class="form-input" name="city">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" name="terms" required>
            <span>J'accepte les <a href="#" target="_blank">conditions d'utilisation</a></span>
          </label>
        </div>

        <div class="auth-error" id="register-error" style="display: none;"></div>
        <button type="submit" class="btn btn-primary btn-block" id="register-submit-btn">
          Creer mon compte
        </button>
      </form>
      <div class="auth-footer">
        <p>Deja un compte ? <button type="button" class="btn-link" id="switch-to-login">Se connecter</button></p>
      </div>
    `;

    return this.renderModal({
      id: 'register-modal',
      title: 'Creer un compte',
      content,
      size: 'md'
    });
  },

  renderForgotPasswordModal() {
    const content = `
      <form id="forgot-password-form" class="auth-form">
        <p class="auth-description">Entrez votre email pour recevoir un lien de reinitialisation.</p>
        <div class="form-group">
          <label class="form-label required">Email</label>
          <input type="email" class="form-input" name="email" required autocomplete="email">
        </div>
        <div class="auth-error" id="forgot-error" style="display: none;"></div>
        <div class="auth-success" id="forgot-success" style="display: none;"></div>
        <button type="submit" class="btn btn-primary btn-block">
          Envoyer le lien
        </button>
      </form>
      <div class="auth-footer">
        <button type="button" class="btn-link" id="back-to-login">Retour a la connexion</button>
      </div>
    `;

    return this.renderModal({
      id: 'forgot-password-modal',
      title: 'Mot de passe oublie',
      content,
      size: 'sm'
    });
  },

  // ----------------------------------------
  // USER MENU (HEADER)
  // ----------------------------------------
  renderUserMenu(user, providerData) {
    const name = providerData?.profile?.name || user?.email?.split('@')[0] || 'Utilisateur';
    const logo = providerData?.profile?.logo || '';
    const initial = name.charAt(0).toUpperCase();

    return `
      <div class="user-menu" id="user-menu">
        <button class="user-menu-btn" id="user-menu-btn">
          <div class="user-avatar">
            ${logo ? `<img src="${logo}" alt="${name}">` : `<span>${initial}</span>`}
          </div>
          <span class="user-name">${name}</span>
          ${this.icons.chevronDown}
        </button>
        <div class="user-dropdown" id="user-dropdown">
          <a href="/dashboard" class="user-dropdown-item" data-nav="dashboard">
            ${this.icons.grid}
            Tableau de bord
          </a>
          <a href="/dashboard/profil" class="user-dropdown-item" data-nav="dashboard">
            ${this.icons.user}
            Mon profil
          </a>
          <a href="/dashboard/equipements" class="user-dropdown-item" data-nav="dashboard">
            ${this.icons.camera}
            Mes photobooths
          </a>
          <div class="user-dropdown-divider"></div>
          <button class="user-dropdown-item" id="logout-btn">
            ${this.icons.x}
            Deconnexion
          </button>
        </div>
      </div>
    `;
  },

  // ----------------------------------------
  // DASHBOARD COMPONENTS
  // ----------------------------------------
  renderDashboardLayout(content, activeTab = 'overview') {
    const tabs = [
      { id: 'overview', label: 'Vue d\'ensemble', icon: this.icons.grid },
      { id: 'profil', label: 'Profil', icon: this.icons.user },
      { id: 'equipements', label: 'Equipements', icon: this.icons.camera },
      { id: 'tarifs', label: 'Tarifs', icon: this.icons.barChart },
      { id: 'galerie', label: 'Galerie', icon: this.icons.image },
      { id: 'avis', label: 'Avis', icon: this.icons.star }
    ];

    return `
      <div class="dashboard-page">
        <div class="dashboard-container">
          <!-- Mobile navigation -->
          <nav class="dashboard-mobile-nav">
            ${tabs.map(tab => `
              <a href="/dashboard${tab.id === 'overview' ? '' : '/' + tab.id}"
                 class="dashboard-mobile-nav-item ${activeTab === tab.id ? 'active' : ''}"
                 data-nav="dashboard"
                 data-tab="${tab.id}">
                ${tab.icon}
                <span>${tab.label}</span>
              </a>
            `).join('')}
          </nav>

          <aside class="dashboard-sidebar">
            <nav class="dashboard-nav">
              ${tabs.map(tab => `
                <a href="/dashboard${tab.id === 'overview' ? '' : '/' + tab.id}"
                   class="dashboard-nav-item ${activeTab === tab.id ? 'active' : ''}"
                   data-nav="dashboard"
                   data-tab="${tab.id}">
                  ${tab.icon}
                  <span>${tab.label}</span>
                </a>
              `).join('')}
            </nav>
          </aside>
          <main class="dashboard-main">
            ${content}
          </main>
        </div>
      </div>
    `;
  },

  renderDashboardOverview(providerData) {
    const stats = providerData?.stats || { views: 0, quotes: 0, favorites: 0 };
    const profile = providerData?.profile || {};
    const booths = providerData?.booths || [];

    return `
      <div class="dashboard-header">
        <h1>Bienvenue, ${profile.name || 'Prestataire'}</h1>
        <p>Gerez votre profil et vos prestations</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-icon">${this.icons.eye}</div>
          <div class="stat-content">
            <div class="stat-value">${stats.views}</div>
            <div class="stat-label">Vues du profil</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">${this.icons.send}</div>
          <div class="stat-content">
            <div class="stat-value">${stats.quotes}</div>
            <div class="stat-label">Demandes de devis</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">${this.icons.heart}</div>
          <div class="stat-content">
            <div class="stat-value">${stats.favorites}</div>
            <div class="stat-label">Favoris</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">${this.icons.camera}</div>
          <div class="stat-content">
            <div class="stat-value">${booths.length}</div>
            <div class="stat-label">Photobooths</div>
          </div>
        </div>
      </div>

      ${!profile.verified ? `
        <div class="dashboard-alert alert-info">
          ${this.icons.info}
          <div>
            <strong>Completez votre profil</strong>
            <p>Ajoutez vos informations et photos pour etre visible sur la plateforme.</p>
          </div>
          <a href="/dashboard/profil" class="btn btn-primary btn-sm" data-nav="dashboard">Completer</a>
        </div>
      ` : ''}

      <div class="dashboard-section">
        <h2>Actions rapides</h2>
        <div class="quick-actions">
          <a href="/dashboard/equipements" class="quick-action-card" data-nav="dashboard">
            ${this.icons.camera}
            <span>Ajouter un photobooth</span>
          </a>
          <a href="/dashboard/galerie" class="quick-action-card" data-nav="dashboard">
            ${this.icons.upload}
            <span>Ajouter des photos</span>
          </a>
          <a href="/dashboard/tarifs" class="quick-action-card" data-nav="dashboard">
            ${this.icons.barChart}
            <span>Gerer les tarifs</span>
          </a>
          ${profile.slug ? `
            <a href="/prestataire/${profile.slug}" class="quick-action-card" data-nav="provider" data-slug="${profile.slug}">
              ${this.icons.eye}
              <span>Voir mon profil public</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  },

  renderDashboardProfile(providerData) {
    const profile = providerData?.profile || {};
    const location = providerData?.location || {};
    const contact = providerData?.contact || {};

    return `
      <div class="dashboard-header">
        <h1>Mon profil</h1>
        <p>Informations visibles par les clients</p>
      </div>

      <form id="profile-form" class="dashboard-form">
        <div class="form-section">
          <h3>Informations de l'entreprise</h3>

          <div class="form-group">
            <label class="form-label">Logo</label>
            <div class="logo-upload-container">
              <div class="logo-preview" id="logo-preview">
                ${profile.logo
                  ? `<img src="${profile.logo}" alt="Logo">`
                  : `<span>${this.icons.camera}</span>`
                }
              </div>
              <div class="logo-upload-actions">
                <input type="file" id="logo-input" accept="image/*" hidden>
                <button type="button" class="btn btn-outline btn-sm" id="change-logo-btn">
                  ${this.icons.upload} Changer le logo
                </button>
                <p class="form-hint">JPG ou PNG, max 2MB</p>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label required">Nom de l'entreprise</label>
            <input type="text" class="form-input" name="name" value="${profile.name || ''}" required>
          </div>

          <div class="form-group">
            <label class="form-label required">Description</label>
            <textarea class="form-input form-textarea" name="description" rows="5" required placeholder="Presentez votre entreprise, vos services...">${profile.description || ''}</textarea>
            <p class="form-hint">Minimum 100 caracteres pour un meilleur referencement</p>
          </div>
        </div>

        <div class="form-section">
          <h3>Localisation</h3>

          <div class="form-group">
            <label class="form-label required">Adresse</label>
            <input type="text" class="form-input" name="address" value="${location.address || ''}">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Code postal</label>
              <input type="text" class="form-input" name="postalCode" value="${location.postalCode || ''}" pattern="[0-9]{5}">
            </div>
            <div class="form-group">
              <label class="form-label required">Ville</label>
              <input type="text" class="form-input" name="city" value="${location.city || ''}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Departement</label>
            <input type="text" class="form-input" name="department" value="${location.department || ''}">
          </div>
        </div>

        <div class="form-section">
          <h3>Contact</h3>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Telephone</label>
              <input type="tel" class="form-input" name="phone" value="${contact.phone || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Site web</label>
              <input type="url" class="form-input" name="website" value="${contact.website || ''}" placeholder="https://">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Instagram</label>
              <input type="text" class="form-input" name="instagram" value="${contact.social?.instagram || ''}" placeholder="@votrecompte">
            </div>
            <div class="form-group">
              <label class="form-label">Facebook</label>
              <input type="text" class="form-input" name="facebook" value="${contact.social?.facebook || ''}" placeholder="VotrePage">
            </div>
          </div>
        </div>

        <div class="form-actions-sticky">
          <button type="submit" class="btn btn-primary" id="save-profile-btn">
            ${this.icons.check} Enregistrer les modifications
          </button>
        </div>
      </form>
    `;
  },

  renderDashboardEquipments(providerData) {
    const booths = providerData?.booths || [];

    return `
      <div class="dashboard-header">
        <h1>Mes equipements</h1>
        <button class="btn btn-primary" id="add-booth-btn">
          ${this.icons.camera} Ajouter un photobooth
        </button>
      </div>

      ${booths.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">${this.icons.camera}</div>
          <h3>Aucun equipement</h3>
          <p>Ajoutez vos premiers photobooths pour commencer a recevoir des demandes.</p>
          <button class="btn btn-primary" id="add-first-booth-btn">
            ${this.icons.camera} Ajouter mon premier photobooth
          </button>
        </div>
      ` : `
        <div class="booths-list">
          ${booths.map(booth => `
            <div class="booth-card" data-booth-id="${booth.id}">
              <div class="booth-card-image">
                ${booth.images && booth.images[0]
                  ? `<img src="${booth.images[0]}" alt="${booth.name}">`
                  : `<div class="booth-card-placeholder">${this.icons.camera}</div>`
                }
              </div>
              <div class="booth-card-content">
                <h3>${booth.name || 'Sans nom'}</h3>
                <p class="booth-card-type">
                  <span class="tag">${DATA.BOOTH_TYPES.find(t => t.id === booth.type)?.name || booth.type || 'Non defini'}</span>
                </p>
                <p class="booth-card-price">
                  A partir de <strong>${booth.priceFrom ? Utils.formatPrice(booth.priceFrom) : '-'}</strong>
                </p>
              </div>
              <div class="booth-card-actions">
                <button class="btn btn-ghost btn-sm edit-booth-btn" data-booth-id="${booth.id}">
                  ${this.icons.sliders} Modifier
                </button>
                <button class="btn btn-ghost btn-sm delete-booth-btn" data-booth-id="${booth.id}">
                  ${this.icons.x} Supprimer
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `}

      ${this.renderBoothModal()}
    `;
  },

  renderBoothModal(booth = null) {
    const isEdit = booth !== null;
    const content = `
      <form id="booth-form" class="booth-form">
        <div class="form-group">
          <label class="form-label required">Nom du photobooth</label>
          <input type="text" class="form-input" name="name" value="${booth?.name || ''}" required placeholder="Ex: Miroir Magique Premium">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Type</label>
            <select class="form-input form-select" name="type" required>
              <option value="">Selectionnez...</option>
              ${DATA.BOOTH_TYPES.map(type => `
                <option value="${type.id}" ${booth?.type === type.id ? 'selected' : ''}>${type.name}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Prix a partir de</label>
            <input type="number" class="form-input" name="priceFrom" value="${booth?.priceFrom || ''}" required min="0" placeholder="300">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-input form-textarea" name="description" rows="3" placeholder="Decrivez ce photobooth...">${booth?.description || ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Caracteristiques</label>
          <textarea class="form-input form-textarea" name="specs" rows="2" placeholder="Une caracteristique par ligne">${booth?.specs?.join('\n') || ''}</textarea>
          <p class="form-hint">Une caracteristique par ligne (ex: Ecran tactile 21 pouces)</p>
        </div>

        <div class="form-group">
          <label class="form-label">Options incluses</label>
          <div class="checkbox-group">
            ${DATA.OPTIONS.map(option => `
              <label class="form-checkbox">
                <input type="checkbox" name="options" value="${option.id}" ${booth?.options?.includes(option.id) ? 'checked' : ''}>
                <span>${option.name}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <input type="hidden" name="boothId" value="${booth?.id || ''}">
      </form>
    `;

    const footer = `
      <button class="btn btn-ghost" data-close-modal="booth-modal">Annuler</button>
      <button class="btn btn-primary" id="save-booth-btn">
        ${isEdit ? 'Modifier' : 'Ajouter'} le photobooth
      </button>
    `;

    return this.renderModal({
      id: 'booth-modal',
      title: isEdit ? 'Modifier le photobooth' : 'Ajouter un photobooth',
      content,
      footer,
      size: 'lg'
    });
  },

  renderDashboardPricing(providerData) {
    const pricing = providerData?.pricing || { formulas: [], extras: [] };

    return `
      <div class="dashboard-header">
        <h1>Mes tarifs</h1>
        <p>Definissez vos formules et options</p>
      </div>

      <form id="pricing-form" class="dashboard-form">
        <div class="form-section">
          <div class="form-section-header">
            <h3>Formules</h3>
            <button type="button" class="btn btn-outline btn-sm" id="add-formula-btn">
              ${this.icons.check} Ajouter une formule
            </button>
          </div>

          <div id="formulas-list">
            ${pricing.formulas.length === 0 ? `
              <div class="empty-inline">Aucune formule definie</div>
            ` : pricing.formulas.map((formula, index) => `
              <div class="pricing-formula-card" data-index="${index}">
                <div class="pricing-formula-header">
                  <input type="text" class="form-input" name="formula_name_${index}" value="${formula.name}" placeholder="Nom de la formule">
                  <input type="number" class="form-input" name="formula_price_${index}" value="${formula.price}" placeholder="Prix" style="width: 120px;">
                  <button type="button" class="btn btn-ghost btn-sm remove-formula-btn" data-index="${index}">
                    ${this.icons.x}
                  </button>
                </div>
                <textarea class="form-input" name="formula_features_${index}" rows="2" placeholder="Caracteristiques (une par ligne)">${formula.features?.join('\n') || ''}</textarea>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-header">
            <h3>Options supplementaires</h3>
            <button type="button" class="btn btn-outline btn-sm" id="add-extra-btn">
              ${this.icons.check} Ajouter une option
            </button>
          </div>

          <div id="extras-list">
            ${pricing.extras.length === 0 ? `
              <div class="empty-inline">Aucune option definie</div>
            ` : pricing.extras.map((extra, index) => `
              <div class="pricing-extra-row" data-index="${index}">
                <input type="text" class="form-input" name="extra_name_${index}" value="${extra.name}" placeholder="Nom de l'option">
                <input type="number" class="form-input" name="extra_price_${index}" value="${extra.price}" placeholder="Prix" style="width: 100px;">
                <input type="text" class="form-input" name="extra_unit_${index}" value="${extra.unit || ''}" placeholder="/h, /pers..." style="width: 80px;">
                <button type="button" class="btn btn-ghost btn-sm remove-extra-btn" data-index="${index}">
                  ${this.icons.x}
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="form-actions-sticky">
          <button type="submit" class="btn btn-primary" id="save-pricing-btn">
            ${this.icons.check} Enregistrer les tarifs
          </button>
        </div>
      </form>
    `;
  },

  renderDashboardGallery(providerData) {
    const gallery = providerData?.gallery || [];

    return `
      <div class="dashboard-header">
        <h1>Ma galerie</h1>
        <button class="btn btn-primary" id="upload-photos-btn">
          ${this.icons.upload} Ajouter des photos
        </button>
      </div>

      <input type="file" id="gallery-input" accept="image/*" multiple hidden>

      ${gallery.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">${this.icons.image}</div>
          <h3>Aucune photo</h3>
          <p>Ajoutez des photos de vos prestations pour attirer plus de clients.</p>
          <button class="btn btn-primary" id="upload-first-photos-btn">
            ${this.icons.upload} Ajouter mes premieres photos
          </button>
        </div>
      ` : `
        <div class="gallery-grid" id="gallery-grid">
          ${gallery.map((url, index) => `
            <div class="gallery-item-edit" data-index="${index}">
              <img src="${url}" alt="Photo ${index + 1}">
              <button class="gallery-item-delete" data-url="${url}">
                ${this.icons.x}
              </button>
            </div>
          `).join('')}
        </div>
      `}

      <div class="upload-progress" id="upload-progress" style="display: none;">
        <div class="upload-progress-bar">
          <div class="upload-progress-fill" id="upload-progress-fill"></div>
        </div>
        <p id="upload-progress-text">Telechargement en cours...</p>
      </div>
    `;
  },

  renderDashboardReviews(providerData) {
    // Pour l'instant, les avis sont en lecture seule
    // Dans une vraie implementation, on chargerait les avis depuis Firestore
    return `
      <div class="dashboard-header">
        <h1>Mes avis</h1>
        <p>Les avis laisses par vos clients</p>
      </div>

      <div class="reviews-stats-dashboard">
        <div class="reviews-average-large">
          <span class="reviews-average-value">-</span>
          <div class="reviews-average-stars">${this.icons.star}${this.icons.star}${this.icons.star}${this.icons.star}${this.icons.star}</div>
          <span class="reviews-average-count">0 avis</span>
        </div>
      </div>

      <div class="empty-state">
        <div class="empty-state-icon">${this.icons.star}</div>
        <h3>Aucun avis pour le moment</h3>
        <p>Les avis apparaitront ici apres vos premieres prestations.</p>
      </div>
    `;
  }
};

// Exporter les composants
window.Components = Components;
