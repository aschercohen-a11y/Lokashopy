/* ========================================
   BOOTHFINDER - Application Principale
   ======================================== */

const App = {
  // Etat de l'application
  state: {
    currentPage: 'home',
    searchFilters: {},
    currentProvider: null,
    registrationStep: 0,
    lightboxImages: [],
    lightboxIndex: 0,
    // Auth state
    currentUser: null,
    userProvider: null,
    isAuthenticated: false,
    authInitialized: false,
    dashboardTab: 'overview',
    // Providers loaded from Supabase
    loadedProviders: []
  },

  // ----------------------------------------
  // INITIALISATION
  // ----------------------------------------
  init() {
    // Initialiser Supabase
    if (typeof initializeSupabase === 'function') {
      initializeSupabase();
      this.setupAuthListener();
    }

    // Rendu initial du layout
    this.renderLayout();

    // Configuration du routeur
    this.setupRouter();

    // Navigation initiale
    this.navigate(window.location.pathname + window.location.search);

    // Event listeners globaux
    this.setupGlobalListeners();

    // Lazy loading des images
    Utils.lazyLoadImages();

    // Animations au scroll
    Utils.initScrollReveal();

    console.log('Lokashopy initialized');
  },

  // ----------------------------------------
  // AUTHENTIFICATION
  // ----------------------------------------
  setupAuthListener() {
    if (typeof AuthService !== 'undefined') {
      AuthService.onAuthStateChanged(async (user) => {
        this.state.currentUser = user;
        this.state.isAuthenticated = !!user;

        if (user) {
          // Charger les donnees du prestataire
          const result = await ProviderService.getProvider(user.id);
          if (result.success) {
            this.state.userProvider = result.data;
          }
        } else {
          this.state.userProvider = null;
        }

        const wasInitialized = this.state.authInitialized;
        this.state.authInitialized = true;

        // Mettre a jour le header
        this.updateHeader();

        // Si on est sur le dashboard sans etre connecte, rediriger
        if (!user && this.state.currentPage === 'dashboard') {
          this.navigate('/');
          this.openModal('login-modal');
        }

        // Si on vient de charger les donnees et qu'on est sur le dashboard, re-rendre
        if (!wasInitialized && user && this.state.currentPage === 'dashboard') {
          // Petit delai pour s'assurer que le DOM est pret
          setTimeout(() => {
            this.renderDashboardPage(this.state.dashboardTab);
          }, 50);
        }
      });
    }
  },

  updateHeader() {
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
      // Ne pas re-rendre si une modal est ouverte (pour eviter de perdre les donnees du formulaire)
      const openModal = document.querySelector('.modal.open');
      if (openModal) {
        return;
      }

      const app = document.getElementById('app');
      const mainContent = document.getElementById('main-content').innerHTML;

      // Re-render le layout avec le bon etat d'auth
      this.renderLayout();

      // Restaurer le contenu
      document.getElementById('main-content').innerHTML = mainContent;

      // Re-setup les listeners du header
      this.setupHeaderListeners();
    }
  },

  setupHeaderListeners() {
    // Boutons de connexion/inscription
    document.getElementById('login-btn')?.addEventListener('click', () => {
      this.openModal('login-modal');
    });

    document.getElementById('signup-btn')?.addEventListener('click', () => {
      this.openModal('register-modal');
    });

    document.getElementById('mobile-login-btn')?.addEventListener('click', () => {
      this.closeMobileMenu();
      this.openModal('login-modal');
    });

    document.getElementById('mobile-signup-btn')?.addEventListener('click', () => {
      this.closeMobileMenu();
      this.openModal('register-modal');
    });

    // User menu dropdown
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');
    if (userMenuBtn && userDropdown) {
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
      });

      document.addEventListener('click', () => {
        userDropdown.classList.remove('open');
      });
    }

    // Logout buttons
    document.getElementById('logout-btn')?.addEventListener('click', () => this.handleLogout());
    document.getElementById('mobile-logout-btn')?.addEventListener('click', () => {
      this.closeMobileMenu();
      this.handleLogout();
    });

    // Mobile menu
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
      document.getElementById('mobile-nav').classList.add('open');
      document.body.classList.add('no-scroll');
    });

    document.getElementById('mobile-nav-close')?.addEventListener('click', () => {
      this.closeMobileMenu();
    });
  },

  async handleLogin(email, password) {
    const result = await AuthService.login(email, password);
    if (result.success) {
      this.closeModal('login-modal');
      Components.showToast({
        type: 'success',
        title: 'Connexion reussie',
        message: 'Bienvenue sur Lokashopy !'
      });
      // Rediriger vers le dashboard si c'est un prestataire
      setTimeout(() => this.navigate('/dashboard'), 500);
    } else {
      const errorEl = document.getElementById('login-error');
      if (errorEl) {
        errorEl.textContent = result.error;
        errorEl.style.display = 'block';
      }
    }
    return result;
  },

  async handleRegister(formData) {
    const result = await AuthService.register(formData.email, formData.password, formData);
    if (result.success) {
      this.closeModal('register-modal');
      Components.showToast({
        type: 'success',
        title: 'Compte cree !',
        message: 'Bienvenue sur Lokashopy ! Completez votre profil.'
      });
      setTimeout(() => this.navigate('/dashboard/profil'), 500);
    } else {
      const errorEl = document.getElementById('register-error');
      if (errorEl) {
        errorEl.textContent = result.error;
        errorEl.style.display = 'block';
      }
    }
    return result;
  },

  async handleLogout() {
    const result = await AuthService.logout();
    if (result.success) {
      Components.showToast({
        type: 'info',
        message: 'Vous avez ete deconnecte'
      });
      this.navigate('/');
    }
  },

  async handleForgotPassword(email) {
    const result = await AuthService.resetPassword(email);
    return result;
  },

  // ----------------------------------------
  // LAYOUT DE BASE
  // ----------------------------------------
  renderLayout() {
    const app = document.getElementById('app');
    const isDashboard = this.state.currentPage === 'dashboard' || window.location.pathname.startsWith('/dashboard');
    app.innerHTML = `
      ${Components.renderHeader(this.state.isAuthenticated, this.state.currentUser, this.state.userProvider, isDashboard)}
      <main id="main-content"></main>
      ${isDashboard ? '' : Components.renderFooter()}
      ${Components.renderLightbox()}
      ${Components.renderLoginModal()}
      ${Components.renderRegisterModal()}
      ${Components.renderForgotPasswordModal()}
    `;

    // Setup header listeners apres le rendu
    this.setupHeaderListeners();

    // Setup auth forms
    this.setupAuthForms();
  },

  setupAuthForms() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const submitBtn = document.getElementById('login-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader loader-sm"></span> Connexion...';

        await this.handleLogin(formData.get('email'), formData.get('password'));

        submitBtn.disabled = false;
        submitBtn.textContent = 'Se connecter';
      });
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      // Toggle provider fields
      const userTypeInputs = registerForm.querySelectorAll('input[name="userType"]');
      const providerFields = document.getElementById('provider-fields');

      userTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
          if (input.value === 'provider' && input.checked) {
            providerFields.style.display = 'block';
            providerFields.querySelectorAll('input').forEach(i => i.required = true);
          } else if (input.value === 'client' && input.checked) {
            providerFields.style.display = 'none';
            providerFields.querySelectorAll('input').forEach(i => i.required = false);
          }
        });
      });

      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);

        // Validation mot de passe
        if (formData.get('password') !== formData.get('passwordConfirm')) {
          const errorEl = document.getElementById('register-error');
          errorEl.textContent = 'Les mots de passe ne correspondent pas';
          errorEl.style.display = 'block';
          return;
        }

        const submitBtn = document.getElementById('register-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader loader-sm"></span> Creation...';

        await this.handleRegister({
          email: formData.get('email'),
          password: formData.get('password'),
          userType: formData.get('userType'),
          companyName: formData.get('companyName') || formData.get('email').split('@')[0],
          phone: formData.get('phone'),
          city: formData.get('city')
        });

        submitBtn.disabled = false;
        submitBtn.textContent = 'Creer mon compte';
      });
    }

    // Forgot password form
    const forgotForm = document.getElementById('forgot-password-form');
    if (forgotForm) {
      forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = forgotForm.querySelector('input[name="email"]').value;
        const result = await this.handleForgotPassword(email);

        if (result.success) {
          document.getElementById('forgot-success').style.display = 'block';
          document.getElementById('forgot-success').textContent = 'Email envoye ! Verifiez votre boite de reception.';
          document.getElementById('forgot-error').style.display = 'none';
        } else {
          document.getElementById('forgot-error').style.display = 'block';
          document.getElementById('forgot-error').textContent = result.error;
          document.getElementById('forgot-success').style.display = 'none';
        }
      });
    }

    // Switch between modals
    document.getElementById('switch-to-register')?.addEventListener('click', () => {
      this.closeModal('login-modal');
      this.openModal('register-modal');
    });

    document.getElementById('switch-to-login')?.addEventListener('click', () => {
      this.closeModal('register-modal');
      this.openModal('login-modal');
    });

    document.getElementById('forgot-password-btn')?.addEventListener('click', () => {
      this.closeModal('login-modal');
      this.openModal('forgot-password-modal');
    });

    document.getElementById('back-to-login')?.addEventListener('click', () => {
      this.closeModal('forgot-password-modal');
      this.openModal('login-modal');
    });
  },

  // ----------------------------------------
  // ROUTEUR SPA
  // ----------------------------------------
  setupRouter() {
    // Gestion des clics sur les liens
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-nav], button[data-nav]');
      if (link) {
        e.preventDefault();
        const navType = link.dataset.nav;
        let path = link.getAttribute('href') || '/';

        if (navType === 'provider') {
          path = `/prestataire/${link.dataset.slug}`;
        } else if (navType === 'search' && link.dataset.type) {
          path = `/recherche?type=${link.dataset.type}`;
        }

        this.navigate(path);
      }
    });

    // Gestion du bouton retour du navigateur
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname + window.location.search, false);
    });
  },

  navigate(path, pushState = true) {
    // Fermer le menu mobile si ouvert
    this.closeMobileMenu();

    // Parser le chemin
    const url = new URL(path, window.location.origin);
    const pathname = url.pathname;
    const params = Object.fromEntries(url.searchParams);

    // Mettre a jour l'URL
    if (pushState) {
      window.history.pushState({}, '', path);
    }

    // Detecter si on change de/vers le dashboard pour mettre a jour le header
    const wasDashboard = this.state.currentPage === 'dashboard';
    const isDashboard = pathname.startsWith('/dashboard');
    const needsHeaderUpdate = wasDashboard !== isDashboard;

    // Router vers la bonne page
    if (pathname === '/' || pathname === '/index.html') {
      this.renderHomePage();
      this.state.currentPage = 'home';
    } else if (pathname === '/recherche') {
      this.state.searchFilters = params;
      this.renderSearchPage(params);
      this.state.currentPage = 'search';
    } else if (pathname.startsWith('/prestataire/')) {
      const slug = pathname.split('/')[2];
      this.renderProviderPage(slug);
      this.state.currentPage = 'provider';
    } else if (pathname === '/inscription-prestataire') {
      this.renderRegistrationPage();
      this.state.currentPage = 'register';
    } else if (pathname.startsWith('/dashboard')) {
      // Routes du dashboard (protegees)
      if (!this.state.isAuthenticated && this.state.authInitialized) {
        this.navigate('/');
        this.openModal('login-modal');
        return;
      }

      const dashboardPath = pathname.replace('/dashboard', '').replace('/', '');
      this.state.dashboardTab = dashboardPath || 'overview';
      this.renderDashboardPage(this.state.dashboardTab);
      this.state.currentPage = 'dashboard';
    } else if (pathname === '/connexion') {
      this.renderHomePage();
      this.state.currentPage = 'home';
      setTimeout(() => this.openModal('login-modal'), 100);
    } else if (pathname === '/inscription') {
      this.renderHomePage();
      this.state.currentPage = 'home';
      setTimeout(() => this.openModal('register-modal'), 100);
    } else {
      this.renderHomePage();
      this.state.currentPage = 'home';
    }

    // Scroll en haut
    window.scrollTo(0, 0);

    // Mettre a jour le header si on passe vers/depuis le dashboard
    if (needsHeaderUpdate) {
      this.updateHeader();
    }

    // Mettre a jour la navigation active
    this.updateActiveNav();

    // Initialiser le lazy loading pour les nouvelles images
    Utils.lazyLoadImages();
  },

  updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.nav === this.state.currentPage) {
        link.classList.add('active');
      }
    });
  },

  // ----------------------------------------
  // PAGE D'ACCUEIL
  // ----------------------------------------
  renderHomePage() {
    const main = document.getElementById('main-content');

    main.innerHTML = `
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">
              Trouvez le photobooth <span>parfait</span> pour votre evenement
            </h1>
            <p class="hero-subtitle">
              Comparez les meilleurs prestataires, lisez les avis et demandez des devis gratuits en quelques clics.
            </p>

            ${Components.renderSearchBar()}

            <div class="hero-stats">
              <div class="hero-stat">
                <div class="hero-stat-value" data-count="500">+<span>0</span></div>
                <div class="hero-stat-label">prestataires</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat-value" data-count="12000"><span>0</span></div>
                <div class="hero-stat-label">evenements</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat-value" data-count="98"><span>0</span>%</div>
                <div class="hero-stat-label">satisfaction</div>
              </div>
            </div>

            <div class="hero-steps">
              <div class="hero-step">
                <span class="hero-step-icon">${Components.icons.search}</span>
                <span class="hero-step-text"><strong>1.</strong> Recherchez</span>
              </div>
              <div class="hero-step">
                <span class="hero-step-icon">${Components.icons.sliders}</span>
                <span class="hero-step-text"><strong>2.</strong> Comparez</span>
              </div>
              <div class="hero-step">
                <span class="hero-step-icon">${Components.icons.send}</span>
                <span class="hero-step-text"><strong>3.</strong> Contactez</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Providers -->
      <section class="section featured-providers">
        <div class="container">
          <h2 class="section-title">Nos prestataires</h2>
          <p class="section-subtitle">
            Des professionnels de confiance pour vos evenements
          </p>

          <div id="featured-providers-container">
            <div style="display: flex; align-items: center; justify-content: center; padding: 40px;">
              <div class="loader"></div>
            </div>
          </div>

          <div class="text-center mt-8">
            <a href="/recherche" class="btn btn-primary btn-lg" data-nav="search">
              Voir tous les prestataires
              ${Components.icons.chevronRight}
            </a>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Ce que disent nos clients</h2>
          <p class="section-subtitle">
            Des milliers d'evenements reussis grace a Lokashopy
          </p>

          <div class="testimonials-grid">
            ${DATA.TESTIMONIALS.map(t => Components.renderTestimonialCard(t)).join('')}
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section bg-gradient-hero">
        <div class="container text-center">
          <h2 class="section-title text-white">Vous etes professionnel du photobooth ?</h2>
          <p class="section-subtitle text-white" style="color: rgba(255,255,255,0.8);">
            Rejoignez notre reseau et developpez votre activite grace a des demandes qualifiees
          </p>
          <a href="/inscription-prestataire" class="btn btn-white btn-lg" data-nav="register">
            Devenir prestataire
            ${Components.icons.chevronRight}
          </a>
        </div>
      </section>
    `;

    // Initialiser les fonctionnalites de la page
    this.initHomePageFeatures();
  },

  initHomePageFeatures() {
    // Animation des compteurs
    const statValues = document.querySelectorAll('.hero-stat-value');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const count = parseInt(el.dataset.count);
          const span = el.querySelector('span');
          Utils.animateCounter(span, count);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));

    // Formulaire de recherche
    this.setupSearchForm();

    // Scroll reveal
    Utils.initScrollReveal();

    // Charger les prestataires depuis Supabase
    this.loadFeaturedProviders();
  },

  async loadFeaturedProviders() {
    if (typeof ProviderService !== 'undefined') {
      try {
        const result = await ProviderService.getAllProviders();

        // Récupérer le container APRÈS la requête async (le DOM peut avoir changé)
        const container = document.getElementById('featured-providers-container');
        if (!container) return;

        if (result.success && result.data.length > 0) {
          const providers = result.data.slice(0, 5);

          container.innerHTML = `
            <div class="providers-carousel">
              <div class="providers-carousel-track">
                ${providers.map(provider => Components.renderProviderCard(provider)).join('')}
              </div>
            </div>
          `;

          // Initialiser le lazy loading pour les nouvelles images
          Utils.lazyLoadImages();
        } else if (container) {
          container.innerHTML = `
            <div class="text-center" style="padding: 40px 20px;">
              <p style="color: var(--color-gray-500);">Aucun prestataire pour le moment. Soyez le premier !</p>
            </div>
          `;
        }
      } catch (error) {
        console.error('Error loading providers:', error);
        const errorContainer = document.getElementById('featured-providers-container');
        if (errorContainer) {
          errorContainer.innerHTML = `
            <div class="text-center" style="padding: 40px 20px;">
              <p style="color: var(--color-gray-500);">Erreur de chargement</p>
            </div>
          `;
        }
      }
    }
  },

  // ----------------------------------------
  // PAGE DE RECHERCHE
  // ----------------------------------------
  async renderSearchPage(filters = {}) {
    // Afficher un loader pendant le chargement
    const loaderMain = document.getElementById('main-content');
    if (loaderMain) {
      loaderMain.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 400px; flex-direction: column; gap: 16px;">
          <div class="loader"></div>
          <p style="color: #6B7280;">Chargement des prestataires...</p>
        </div>
      `;
    }

    // Charger les vrais prestataires depuis Supabase
    if (typeof ProviderService !== 'undefined') {
      const result = await ProviderService.getAllProviders();
      if (result.success) {
        this.state.loadedProviders = result.data;
      }
    }

    // Récupérer main APRÈS la requête async (le DOM peut avoir changé)
    const main = document.getElementById('main-content');
    if (!main) return;

    // Filtrer et trier les prestataires
    let providers = Utils.filterProviders(this.state.loadedProviders, filters);
    providers = Utils.sortProviders(providers, filters.sort || 'relevance');

    main.innerHTML = `
      <div class="search-results-page">
        <!-- Search Header -->
        <div class="search-header">
          <div class="container">
            <div class="search-header-content">
              ${Components.renderSearchBar({ compact: true, values: filters })}
              <div class="search-header-actions">
                <button class="mobile-filters-btn" id="mobile-filters-btn">
                  ${Components.icons.filter}
                  Filtres
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="search-layout">
            <!-- Filters Sidebar -->
            ${Components.renderFiltersSidebar(filters)}

            <!-- Results Area -->
            <div class="results-area">
              <div class="results-header">
                <h1 class="results-count">
                  <span>${providers.length}</span> prestataires trouves
                </h1>
                <div class="results-actions">
                  <div class="view-toggle">
                    <button class="active" data-view="grid" title="Vue grille">
                      ${Components.icons.grid}
                    </button>
                    <button data-view="list" title="Vue liste">
                      ${Components.icons.list}
                    </button>
                    <button data-view="map" title="Vue carte">
                      ${Components.icons.map}
                    </button>
                  </div>
                  <select class="sort-select" id="sort-select">
                    <option value="relevance" ${filters.sort === 'relevance' ? 'selected' : ''}>Pertinence</option>
                    <option value="price-asc" ${filters.sort === 'price-asc' ? 'selected' : ''}>Prix croissant</option>
                    <option value="price-desc" ${filters.sort === 'price-desc' ? 'selected' : ''}>Prix decroissant</option>
                    <option value="rating" ${filters.sort === 'rating' ? 'selected' : ''}>Mieux notes</option>
                  </select>
                </div>
              </div>

              <div class="results-grid" id="results-container">
                ${providers.map(p => Components.renderProviderCard(p)).join('')}
              </div>

              ${providers.length === 0 ? `
                <div class="text-center" style="padding: 60px 20px;">
                  <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                  <h3>Aucun prestataire trouve</h3>
                  <p class="text-gray">Essayez de modifier vos criteres de recherche</p>
                </div>
              ` : ''}

              ${providers.length > 9 ? Components.renderPagination(1, Math.ceil(providers.length / 9)) : ''}
            </div>
          </div>
        </div>

        <!-- Mobile Filters Sheet -->
        <div class="filters-backdrop" id="filters-backdrop"></div>
        <div class="filters-sheet" id="filters-sheet">
          <div class="filters-sheet-header">
            <h3>Filtres</h3>
            <button class="btn btn-ghost btn-sm" id="close-filters-sheet">
              ${Components.icons.x}
            </button>
          </div>
          <div class="filters-sheet-content">
            ${Components.renderFiltersSidebar(filters)}
          </div>
          <div class="filters-sheet-footer">
            <button class="btn btn-ghost" id="clear-mobile-filters">Effacer</button>
            <button class="btn btn-primary" id="apply-mobile-filters">Appliquer</button>
          </div>
        </div>
      </div>
    `;

    this.initSearchPageFeatures();
  },

  initSearchPageFeatures() {
    // Lazy loading des images
    Utils.lazyLoadImages();

    // Vue toggle
    const viewToggle = document.querySelector('.view-toggle');
    if (viewToggle) {
      viewToggle.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn) {
          viewToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.changeResultsView(btn.dataset.view);
        }
      });
    }

    // Tri
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.state.searchFilters.sort = e.target.value;
        Utils.updateUrlParams({ sort: e.target.value });
        this.updateSearchResults();
      });
    }

    // Filtres
    this.setupFilters();

    // Mobile filters
    this.setupMobileFilters();

    // Formulaire de recherche
    this.setupSearchForm();
  },

  changeResultsView(view) {
    const container = document.getElementById('results-container');
    if (!container) return;

    if (view === 'map') {
      container.className = '';
      container.innerHTML = `
        <div class="map-container">
          <div class="map-placeholder">
            <div style="text-align: center;">
              ${Components.icons.map}
              <p style="margin-top: 16px; color: var(--color-gray-500);">
                Vue carte (integration carte a venir)
              </p>
            </div>
            ${this.state.loadedProviders.slice(0, 5).map((p, i) => `
              <div class="map-marker" style="top: ${20 + i * 15}%; left: ${15 + i * 12}%;"
                   data-provider-id="${p.id}" title="${p.name}"></div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      let providers = Utils.filterProviders(this.state.loadedProviders, this.state.searchFilters);
      providers = Utils.sortProviders(providers, this.state.searchFilters.sort || 'relevance');

      container.className = view === 'list' ? 'results-list' : 'results-grid';
      container.innerHTML = providers.map(p =>
        Components.renderProviderCard(p, { layout: view })
      ).join('');
    }
  },

  setupFilters() {
    // Checkboxes booth types
    document.querySelectorAll('input[name="boothType"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => this.updateFiltersFromForm());
    });

    // Checkboxes options
    document.querySelectorAll('input[name="option"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => this.updateFiltersFromForm());
    });

    // Price range
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    if (priceMin && priceMax) {
      priceMin.addEventListener('input', () => {
        document.getElementById('price-min-value').textContent = priceMin.value + '\u20ac';
        this.updateFiltersFromForm();
      });
      priceMax.addEventListener('input', () => {
        document.getElementById('price-max-value').textContent = priceMax.value + '\u20ac';
        this.updateFiltersFromForm();
      });
    }

    // Rating
    const ratingFilter = document.getElementById('rating-filter');
    if (ratingFilter) {
      ratingFilter.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn) {
          const rating = parseInt(btn.dataset.rating);
          ratingFilter.querySelectorAll('button').forEach((b, i) => {
            b.classList.toggle('active', i < rating);
          });
          this.state.searchFilters.minRating = rating;
          this.updateSearchResults();
        }
      });
    }

    // Radius
    const radiusFilter = document.getElementById('radius-filter');
    if (radiusFilter) {
      radiusFilter.addEventListener('input', () => {
        document.getElementById('radius-value').textContent = radiusFilter.value + ' km';
        this.state.searchFilters.radius = parseInt(radiusFilter.value);
        this.updateSearchResults();
      });
    }

    // Clear filters
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.state.searchFilters = {};
        Utils.updateUrlParams({}, true);
        this.renderSearchPage({});
      });
    }
  },

  updateFiltersFromForm() {
    // Collect booth types
    const boothTypes = [];
    document.querySelectorAll('input[name="boothType"]:checked').forEach(cb => {
      boothTypes.push(cb.value);
    });
    this.state.searchFilters.boothTypes = boothTypes.length > 0 ? boothTypes : undefined;

    // Collect options
    const options = [];
    document.querySelectorAll('input[name="option"]:checked').forEach(cb => {
      options.push(cb.value);
    });
    this.state.searchFilters.options = options.length > 0 ? options : undefined;

    // Price range
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    if (priceMin && priceMax) {
      this.state.searchFilters.priceMin = parseInt(priceMin.value);
      this.state.searchFilters.priceMax = parseInt(priceMax.value);
    }

    this.updateSearchResults();
  },

  updateSearchResults() {
    let providers = Utils.filterProviders(this.state.loadedProviders, this.state.searchFilters);
    providers = Utils.sortProviders(providers, this.state.searchFilters.sort || 'relevance');

    const container = document.getElementById('results-container');
    const countEl = document.querySelector('.results-count span');

    if (container && countEl) {
      countEl.textContent = providers.length;
      container.innerHTML = providers.length > 0
        ? providers.map(p => Components.renderProviderCard(p)).join('')
        : `
          <div class="text-center" style="padding: 60px 20px; grid-column: 1 / -1;">
            <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
            <h3>Aucun prestataire trouve</h3>
            <p class="text-gray">Essayez de modifier vos criteres de recherche</p>
          </div>
        `;
    }
  },

  setupMobileFilters() {
    const btn = document.getElementById('mobile-filters-btn');
    const sheet = document.getElementById('filters-sheet');
    const backdrop = document.getElementById('filters-backdrop');
    const closeBtn = document.getElementById('close-filters-sheet');
    const applyBtn = document.getElementById('apply-mobile-filters');
    const clearBtn = document.getElementById('clear-mobile-filters');

    if (btn && sheet) {
      btn.addEventListener('click', () => {
        sheet.classList.add('open');
        backdrop.classList.add('open');
        document.body.classList.add('no-scroll');
      });

      const closeSheet = () => {
        sheet.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.classList.remove('no-scroll');
      };

      backdrop?.addEventListener('click', closeSheet);
      closeBtn?.addEventListener('click', closeSheet);
      applyBtn?.addEventListener('click', () => {
        closeSheet();
        this.updateFiltersFromForm();
      });
      clearBtn?.addEventListener('click', () => {
        this.state.searchFilters = {};
        closeSheet();
        this.renderSearchPage({});
      });
    }
  },

  // ----------------------------------------
  // PAGE PRESTATAIRE
  // ----------------------------------------
  async renderProviderPage(slug) {
    // Afficher un loader pendant le chargement
    const loaderMain = document.getElementById('main-content');
    if (loaderMain) {
      loaderMain.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 400px; flex-direction: column; gap: 16px;">
          <div class="loader"></div>
          <p style="color: #6B7280;">Chargement du profil...</p>
        </div>
      `;
    }

    // D'abord essayer Supabase, puis fallback sur les donnees demo
    let provider = null;

    if (typeof ProviderService !== 'undefined') {
      const result = await ProviderService.getProviderBySlug(slug);
      if (result.success) {
        provider = result.data;
        // Adapter le format pour correspondre au format attendu
        provider.cover = provider.gallery?.length > 0 ? provider.gallery : ['https://placehold.co/1200x600/1a1a2e/ffffff?text=' + encodeURIComponent(provider.name)];
        if (!provider.logo) {
          provider.logo = 'https://placehold.co/100x100/ff2d6a/ffffff?text=' + encodeURIComponent(provider.name.charAt(0));
        }
      }
    }

    // Fallback sur les donnees demo si pas trouve dans Supabase
    if (!provider) {
      provider = DATA.PROVIDERS.find(p => p.slug === slug);
    }

    if (!provider) {
      this.navigate('/');
      return;
    }

    this.state.currentProvider = provider;

    // Récupérer main après la requête async (le DOM peut avoir changé)
    const main = document.getElementById('main-content');
    if (!main) return;

    const favorites = Utils.storage.get('favorites', []);
    const isFavorite = favorites.includes(provider.id);

    main.innerHTML = `
      <div class="provider-page">
        <!-- Header with Gallery -->
        <div class="provider-header">
          <div class="provider-header-slider">
            <img src="${provider.cover[0]}" alt="${provider.name}" id="header-image">
          </div>
          <div class="provider-header-nav">
            ${provider.cover.map((_, i) => `
              <button data-slide="${i}" class="${i === 0 ? 'active' : ''}"></button>
            `).join('')}
          </div>
        </div>

        <!-- Provider Info -->
        <div class="provider-info">
          <div class="container">
            <div class="provider-info-header">
              <img src="${provider.logo}" alt="${provider.name}" class="provider-logo">
              <div class="provider-main-info">
                <div class="provider-name">
                  <h1>${provider.name}</h1>
                  ${provider.verified ? `
                    <span class="badge badge-primary">
                      ${Components.icons.checkCircle}
                      Verifie
                    </span>
                  ` : ''}
                </div>
                <div class="provider-meta">
                  <span class="provider-meta-item">
                    ${Components.icons.location}
                    ${provider.location.city} (${provider.location.department})
                  </span>
                  ${provider.radius ? `
                  <span class="provider-meta-item">
                    ${Components.icons.target}
                    Rayon ${provider.radius} km
                  </span>
                  ` : ''}
                  <span class="provider-meta-item">
                    ${Utils.generateStars(provider.rating)}
                    <strong>${provider.rating.toFixed(1)}</strong>
                    (${provider.reviewCount} avis)
                  </span>
                </div>
              </div>
              <div class="provider-actions">
                <button class="btn-favorite ${isFavorite ? 'active' : ''}" data-action="favorite" data-id="${provider.id}">
                  ${isFavorite ? Components.icons.heartFilled : Components.icons.heart}
                </button>
                <button class="btn btn-primary btn-lg" id="request-quote-btn">
                  ${Components.icons.send}
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="container">
          <div class="provider-content">
            <!-- Main Content -->
            <div class="provider-main">
              <div class="provider-tabs">
                ${Components.renderTabs([
                  { label: 'Presentation', content: this.renderPresentationTab(provider) },
                  { label: 'Photobooths', content: this.renderBoothsTab(provider) },
                  { label: 'Galerie', content: this.renderGalleryTab(provider) },
                  { label: `Avis (${provider.reviewCount})`, content: this.renderReviewsTab(provider) },
                  { label: 'Tarifs', content: this.renderPricingTab(provider) }
                ], { id: 'provider-tabs' })}
              </div>
            </div>

            <!-- Sidebar -->
            <aside class="provider-sidebar">
              <div class="sidebar-card">
                <div class="sidebar-price">
                  A partir de <strong>${Utils.formatPrice(provider.priceFrom)}</strong>
                </div>
                <div class="sidebar-actions">
                  <button class="btn btn-primary" id="sidebar-quote-btn">
                    ${Components.icons.send}
                    Demander un devis
                  </button>
                  <button class="sidebar-phone" id="reveal-phone" data-phone="${provider.phone}">
                    ${Components.icons.phone}
                    Voir le telephone
                  </button>
                </div>
                <div class="sidebar-hours">
                  <h4>Horaires</h4>
                  ${Object.entries(provider.hours).map(([day, hours]) => `
                    <div class="sidebar-hours-item">
                      <span class="sidebar-hours-day">${this.translateDay(day)}</span>
                      <span class="sidebar-hours-time">${hours}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="sidebar-card contact-form">
                <h4>Contact rapide</h4>
                <form id="quick-contact-form">
                  <div class="form-group">
                    <input type="text" class="form-input" placeholder="Votre nom" required>
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-input" placeholder="Votre email" required>
                  </div>
                  <div class="form-group">
                    <input type="tel" class="form-input" placeholder="Votre telephone">
                  </div>
                  <div class="form-group">
                    <textarea class="form-input form-textarea" placeholder="Votre message" rows="3"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Envoyer</button>
                </form>
              </div>
            </aside>
          </div>
        </div>

        <!-- Mobile CTA -->
        <div class="mobile-cta">
          <div class="mobile-cta-price">
            A partir de
            <strong>${Utils.formatPrice(provider.priceFrom)}</strong>
          </div>
          <button class="btn btn-primary" id="mobile-quote-btn">
            Demander un devis
          </button>
        </div>
      </div>

      <!-- Quote Modal -->
      ${Components.renderQuoteModal(provider)}
    `;

    this.initProviderPageFeatures(provider);
  },

  translateDay(day) {
    const days = {
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche'
    };
    return days[day] || day;
  },

  renderPresentationTab(provider) {
    return `
      <div class="presentation-content">
        <p>${provider.description}</p>

        <h3>Notre expertise</h3>
        <div class="presentation-stats">
          <div class="presentation-stat">
            <div class="presentation-stat-value">${provider.experience || '-'}</div>
            <div class="presentation-stat-label">Annees d'experience</div>
          </div>
          <div class="presentation-stat">
            <div class="presentation-stat-value">${provider.eventsPerYear || '-'}</div>
            <div class="presentation-stat-label">Evenements/an</div>
          </div>
          <div class="presentation-stat">
            <div class="presentation-stat-value">${provider.rating.toFixed(1)}</div>
            <div class="presentation-stat-label">Note moyenne</div>
          </div>
          ${provider.radius ? `
          <div class="presentation-stat">
            <div class="presentation-stat-value">${provider.radius}km</div>
            <div class="presentation-stat-label">Zone d'intervention</div>
          </div>
          ` : ''}
        </div>

        ${provider.radius ? `
        <h3>Zone d'intervention</h3>
        <p>Nous intervenons dans un rayon de ${provider.radius} km autour de ${provider.location.city} (${provider.location.region}).</p>
        ` : ''}

        ${provider.social ? `
          <h3>Retrouvez-nous</h3>
          <div style="display: flex; gap: 12px;">
            ${provider.social.instagram ? `
              <a href="https://instagram.com/${provider.social.instagram.replace('@', '')}" target="_blank" class="btn btn-ghost btn-sm">
                ${Components.icons.instagram}
                ${provider.social.instagram}
              </a>
            ` : ''}
            ${provider.social.facebook ? `
              <a href="https://facebook.com/${provider.social.facebook}" target="_blank" class="btn btn-ghost btn-sm">
                ${Components.icons.facebook}
                ${provider.social.facebook}
              </a>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  },

  renderBoothsTab(provider) {
    return `
      <div class="booths-grid">
        ${provider.booths.map(booth => `
          <div class="booth-detail-card">
            <div class="booth-detail-gallery">
              <img src="${booth.images[0]}" alt="${booth.name}" data-lightbox="${booth.images.join(',')}" style="cursor: pointer;">
              ${booth.images.length > 1 ? `
                <div class="booth-gallery-side">
                  ${booth.images.slice(1, 3).map(img => `
                    <img src="${img}" alt="${booth.name}" data-lightbox="${booth.images.join(',')}" style="cursor: pointer;">
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="booth-detail-content">
              <div class="booth-detail-header">
                <div>
                  <h4>${booth.name}</h4>
                  <span class="tag tag-primary">${DATA.BOOTH_TYPES.find(t => t.id === booth.type)?.name || booth.type}</span>
                </div>
                <div class="booth-detail-price">
                  A partir de <strong>${Utils.formatPrice(booth.priceFrom)}</strong>
                </div>
              </div>
              <p class="booth-detail-description">${booth.description}</p>
              <div class="booth-specs">
                ${booth.specs.map(spec => `
                  <span class="booth-spec">
                    ${Components.icons.check}
                    ${spec}
                  </span>
                `).join('')}
              </div>
              <div class="booth-options">
                ${booth.options.map(opt => {
                  const option = DATA.OPTIONS.find(o => o.id === opt);
                  return option ? `
                    <span class="booth-option">
                      ${Components.icons.checkCircle}
                      ${option.name}
                    </span>
                  ` : '';
                }).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderGalleryTab(provider) {
    this.state.lightboxImages = provider.gallery;

    return `
      <div class="gallery-masonry">
        ${provider.gallery.map((img, index) => `
          <div class="gallery-item" data-lightbox-index="${index}">
            <img src="${img}" alt="Photo ${index + 1}" loading="lazy">
          </div>
        `).join('')}
      </div>
    `;
  },

  renderReviewsTab(provider) {
    // Calculate rating breakdown
    const breakdown = [0, 0, 0, 0, 0];
    provider.reviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) {
        breakdown[r.rating - 1]++;
      }
    });
    const total = provider.reviews.length || 1;

    return `
      <div class="reviews-header">
        <div class="reviews-summary">
          <div class="reviews-average">${provider.rating.toFixed(1)}</div>
          <div class="reviews-stars">${Utils.generateStars(provider.rating, { size: 'lg' })}</div>
          <div class="reviews-count">${provider.reviewCount} avis</div>
        </div>
        <div class="reviews-breakdown">
          ${[5, 4, 3, 2, 1].map(n => `
            <div class="reviews-bar">
              <span class="reviews-bar-label">${n} ${Components.icons.star}</span>
              <div class="reviews-bar-track">
                <div class="reviews-bar-fill" style="width: ${(breakdown[n-1] / total) * 100}%;"></div>
              </div>
              <span class="reviews-bar-count">${breakdown[n-1]}</span>
            </div>
          `).join('')}
        </div>
      </div>

      ${(provider.googleReviewsUrl || provider.trustpilotUrl) ? `
      <div class="external-reviews">
        <h4>Nos avis clients :</h4>
        <div class="external-reviews-cards">
          ${provider.googleReviewsUrl ? `
          <a href="${provider.googleReviewsUrl}" target="_blank" rel="noopener" class="external-review-card google-card">
            <div class="external-review-logo">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </div>
            ${provider.googleRating ? `
            <div class="external-review-rating">
              <span class="external-review-score">${provider.googleRating.toFixed(1)}</span>
              <div class="external-review-stars">${Utils.generateStars(provider.googleRating)}</div>
            </div>
            <div class="external-review-count">${provider.googleReviewCount || 0} avis</div>
            ` : `
            <div class="external-review-cta">Voir nos avis</div>
            `}
          </a>
          ` : ''}
          ${provider.trustpilotUrl ? `
          <a href="${provider.trustpilotUrl}" target="_blank" rel="noopener" class="external-review-card trustpilot-card">
            <div class="external-review-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#00b67a">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>Trustpilot</span>
            </div>
            ${provider.trustpilotRating ? `
            <div class="external-review-rating">
              <span class="external-review-score">${provider.trustpilotRating.toFixed(1)}</span>
              <div class="external-review-stars">${Utils.generateStars(provider.trustpilotRating)}</div>
            </div>
            <div class="external-review-count">${provider.trustpilotReviewCount || 0} avis</div>
            ` : `
            <div class="external-review-cta">Voir nos avis</div>
            `}
          </a>
          ` : ''}
        </div>
      </div>
      ` : ''}

      <div class="reviews-list">
        ${provider.reviews.length > 0
          ? provider.reviews.map(review => Components.renderReviewCard(review)).join('')
          : '<p class="text-center text-gray">Aucun avis pour le moment</p>'
        }
      </div>
    `;
  },

  renderPricingTab(provider) {
    return `
      <div class="pricing-table">
        <table>
          <thead>
            <tr>
              <th>Formule</th>
              <th>Inclus</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            ${provider.pricing.formulas.map(formula => `
              <tr>
                <td><strong>${formula.name}</strong></td>
                <td>
                  <ul style="list-style: none;">
                    ${formula.features.map(f => `<li>${Components.icons.check} ${f}</li>`).join('')}
                  </ul>
                </td>
                <td class="price">${Utils.formatPrice(formula.price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pricing-options">
        <h4>Options supplementaires</h4>
        ${provider.pricing.extras.map(extra => `
          <div class="pricing-option">
            <span class="pricing-option-name">${extra.name}</span>
            <span class="pricing-option-price">${Utils.formatPrice(extra.price)}${extra.unit || ''}</span>
          </div>
        `).join('')}
      </div>

      <div class="pricing-note">
        ${Components.icons.info}
        Devis personnalise sur demande. Contactez-nous pour un tarif adapte a votre evenement.
      </div>
    `;
  },

  initProviderPageFeatures(provider) {
    // Header slider
    const headerNav = document.querySelector('.provider-header-nav');
    const headerImage = document.getElementById('header-image');
    if (headerNav && headerImage) {
      headerNav.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn) {
          const index = parseInt(btn.dataset.slide);
          headerImage.src = provider.cover[index];
          headerNav.querySelectorAll('button').forEach((b, i) => {
            b.classList.toggle('active', i === index);
          });
        }
      });
    }

    // Tabs
    this.setupTabs();

    // Quote buttons
    const quoteButtons = ['request-quote-btn', 'sidebar-quote-btn', 'mobile-quote-btn'];
    quoteButtons.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => this.openModal('quote-modal'));
      }
    });

    // Phone reveal
    const phoneBtn = document.getElementById('reveal-phone');
    if (phoneBtn) {
      phoneBtn.addEventListener('click', () => {
        const phone = phoneBtn.dataset.phone;
        phoneBtn.innerHTML = `${Components.icons.phone} ${phone}`;
        phoneBtn.classList.add('revealed');
        phoneBtn.style.cursor = 'default';
      });
    }

    // Lightbox
    this.setupLightbox();

    // Lazy load images
    Utils.lazyLoadImages();

    // Contact form
    const contactForm = document.getElementById('quick-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Components.showToast({
          type: 'success',
          title: 'Message envoye',
          message: 'Votre message a bien ete envoye au prestataire.'
        });
        contactForm.reset();
      });
    }

    // Quote form
    const submitQuoteBtn = document.getElementById('submit-quote');
    if (submitQuoteBtn) {
      submitQuoteBtn.addEventListener('click', () => {
        const form = document.getElementById('quote-form');
        if (form.checkValidity()) {
          Components.showToast({
            type: 'success',
            title: 'Demande envoyee',
            message: 'Votre demande de devis a ete transmise au prestataire.'
          });
          this.closeModal('quote-modal');
          form.reset();
        } else {
          form.reportValidity();
        }
      });
    }
  },

  // ----------------------------------------
  // PAGE INSCRIPTION PRESTATAIRE
  // ----------------------------------------
  renderRegistrationPage() {
    const main = document.getElementById('main-content');
    this.state.registrationStep = 0;

    const steps = ['Compte', 'Entreprise', 'Activite', 'Profil', 'Validation'];

    main.innerHTML = `
      <div class="registration-page">
        <!-- Hero -->
        <section class="registration-hero">
          <div class="container">
            <div class="registration-hero-content">
              <h1>Rejoignez +500 professionnels et developpez votre activite</h1>
              <p>Recevez des demandes qualifiees de clients a la recherche de photobooths pres de chez vous.</p>

              <div class="benefits-grid">
                <div class="benefit-card">
                  <div class="benefit-icon">${Components.icons.eye}</div>
                  <h3>Visibilite locale</h3>
                  <p>Apparaissez dans les recherches de votre zone</p>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon">${Components.icons.zap}</div>
                  <h3>Demandes qualifiees</h3>
                  <p>Des clients prets a reserver</p>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon">${Components.icons.sliders}</div>
                  <h3>Gestion simplifiee</h3>
                  <p>Tableau de bord intuitif</p>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon">${Components.icons.barChart}</div>
                  <h3>Statistiques detaillees</h3>
                  <p>Suivez vos performances</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Pricing -->
        <section class="pricing-section">
          <div class="container">
            <h2 class="section-title">Choisissez votre formule</h2>
            <p class="section-subtitle">Des offres adaptees a toutes les tailles d'entreprise</p>

            <div class="pricing-grid">
              <div class="pricing-card">
                <div class="pricing-card-header">
                  <div class="pricing-card-name">Gratuit</div>
                  <div class="pricing-card-price">0\u20ac<span>/mois</span></div>
                </div>
                <div class="pricing-card-features">
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>1 photobooth</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Profil basique</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>5 demandes/mois</span>
                  </div>
                  <div class="pricing-feature disabled">
                    ${Components.icons.x}
                    <span>Badge verifie</span>
                  </div>
                  <div class="pricing-feature disabled">
                    ${Components.icons.x}
                    <span>Statistiques avancees</span>
                  </div>
                </div>
                <button class="btn btn-outline" data-plan="free">Commencer gratuitement</button>
              </div>

              <div class="pricing-card featured">
                <div class="pricing-card-header">
                  <div class="pricing-card-name">Premium</div>
                  <div class="pricing-card-price">29\u20ac<span>/mois</span></div>
                </div>
                <div class="pricing-card-features">
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Photobooths illimites</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Profil complet</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Demandes illimitees</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Badge verifie</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Statistiques avancees</span>
                  </div>
                </div>
                <button class="btn btn-primary" data-plan="premium">Choisir Premium</button>
              </div>

              <div class="pricing-card">
                <div class="pricing-card-header">
                  <div class="pricing-card-name">Business</div>
                  <div class="pricing-card-price">79\u20ac<span>/mois</span></div>
                </div>
                <div class="pricing-card-features">
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Tout Premium inclus</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Mise en avant</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Support prioritaire</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>Multi-utilisateurs</span>
                  </div>
                  <div class="pricing-feature">
                    ${Components.icons.check}
                    <span>API access</span>
                  </div>
                </div>
                <button class="btn btn-outline" data-plan="business">Choisir Business</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Registration Form -->
        <section class="registration-form-section">
          <div class="container">
            <div class="registration-form-container">
              <h2 class="section-title">Creer votre compte</h2>

              <div class="registration-steps">
                ${Components.renderProgressSteps(steps, 0)}
              </div>

              <div class="registration-form" id="registration-form">
                <!-- Step 1: Account -->
                <div class="form-step active" data-step="0">
                  <h3 class="form-step-title">Informations de connexion</h3>
                  <div class="form-group">
                    <label class="form-label required">Email</label>
                    <input type="email" class="form-input" name="email" required>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label required">Mot de passe</label>
                      <input type="password" class="form-input" name="password" required minlength="8">
                    </div>
                    <div class="form-group">
                      <label class="form-label required">Confirmer</label>
                      <input type="password" class="form-input" name="password-confirm" required>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Company -->
                <div class="form-step" data-step="1">
                  <h3 class="form-step-title">Votre entreprise</h3>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label required">Nom de l'entreprise</label>
                      <input type="text" class="form-input" name="company" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label required">SIRET</label>
                      <input type="text" class="form-input" name="siret" required pattern="[0-9]{14}">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Adresse</label>
                    <input type="text" class="form-input" name="address" required>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label required">Code postal</label>
                      <input type="text" class="form-input" name="postal" required pattern="[0-9]{5}">
                    </div>
                    <div class="form-group">
                      <label class="form-label required">Ville</label>
                      <input type="text" class="form-input" name="city" required>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label required">Telephone</label>
                      <input type="tel" class="form-input" name="phone" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Site web</label>
                      <input type="url" class="form-input" name="website" placeholder="https://">
                    </div>
                  </div>
                </div>

                <!-- Step 3: Activity -->
                <div class="form-step" data-step="2">
                  <h3 class="form-step-title">Votre activite</h3>
                  <div class="form-group">
                    <label class="form-label required">Types de photobooths proposes</label>
                    <div class="checkbox-group">
                      ${DATA.BOOTH_TYPES.map(type => `
                        <label class="form-checkbox">
                          <input type="checkbox" name="booth-types" value="${type.id}">
                          <span>${type.name}</span>
                        </label>
                      `).join('')}
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label required">Rayon d'intervention (km)</label>
                      <input type="number" class="form-input" name="radius" value="50" min="10" max="500">
                    </div>
                    <div class="form-group">
                      <label class="form-label required">Annees d'experience</label>
                      <input type="number" class="form-input" name="experience" value="1" min="0" max="50">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Nombre d'evenements par an (estimation)</label>
                    <select class="form-input form-select" name="events-per-year">
                      <option value="1-20">1 a 20</option>
                      <option value="20-50">20 a 50</option>
                      <option value="50-100">50 a 100</option>
                      <option value="100+">Plus de 100</option>
                    </select>
                  </div>
                </div>

                <!-- Step 4: Profile -->
                <div class="form-step" data-step="3">
                  <h3 class="form-step-title">Personnalisez votre profil</h3>
                  <div class="form-group">
                    <label class="form-label">Logo de l'entreprise</label>
                    <div class="file-upload" id="logo-upload">
                      <div class="file-upload-icon">${Components.icons.upload}</div>
                      <div class="file-upload-text">Cliquez ou glissez votre logo ici</div>
                      <div class="file-upload-hint">PNG, JPG jusqu'a 2MB</div>
                      <input type="file" accept="image/*" hidden>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Photos de vos prestations</label>
                    <div class="file-upload" id="photos-upload">
                      <div class="file-upload-icon">${Components.icons.image}</div>
                      <div class="file-upload-text">Cliquez ou glissez vos photos ici</div>
                      <div class="file-upload-hint">PNG, JPG jusqu'a 5MB chacune (max 10)</div>
                      <input type="file" accept="image/*" multiple hidden>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Description de votre entreprise</label>
                    <textarea class="form-input form-textarea" name="description" rows="5" required placeholder="Presentez votre entreprise, vos services, votre approche..."></textarea>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">Instagram</label>
                      <input type="text" class="form-input" name="instagram" placeholder="@votrecompte">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Facebook</label>
                      <input type="text" class="form-input" name="facebook" placeholder="VotrePage">
                    </div>
                  </div>
                </div>

                <!-- Step 5: Validation -->
                <div class="form-step" data-step="4">
                  <h3 class="form-step-title">Recapitulatif et validation</h3>

                  <div class="summary-section">
                    <h4>Informations du compte</h4>
                    <div class="summary-item">
                      <span class="summary-label">Email</span>
                      <span class="summary-value" id="summary-email">-</span>
                    </div>
                  </div>

                  <div class="summary-section">
                    <h4>Entreprise</h4>
                    <div class="summary-item">
                      <span class="summary-label">Nom</span>
                      <span class="summary-value" id="summary-company">-</span>
                    </div>
                    <div class="summary-item">
                      <span class="summary-label">Localisation</span>
                      <span class="summary-value" id="summary-location">-</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label required">Choisissez votre offre</label>
                    <div class="plan-selection">
                      <div class="plan-option">
                        <input type="radio" name="plan" value="free" id="plan-free">
                        <label class="plan-option-label" for="plan-free">
                          <div class="plan-option-name">Gratuit</div>
                          <div class="plan-option-price">0\u20ac/mois</div>
                        </label>
                      </div>
                      <div class="plan-option">
                        <input type="radio" name="plan" value="premium" id="plan-premium" checked>
                        <label class="plan-option-label" for="plan-premium">
                          <div class="plan-option-name">Premium</div>
                          <div class="plan-option-price">29\u20ac/mois</div>
                        </label>
                      </div>
                      <div class="plan-option">
                        <input type="radio" name="plan" value="business" id="plan-business">
                        <label class="plan-option-label" for="plan-business">
                          <div class="plan-option-name">Business</div>
                          <div class="plan-option-price">79\u20ac/mois</div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-checkbox">
                      <input type="checkbox" name="terms" required>
                      <span>J'accepte les <a href="#">conditions generales d'utilisation</a> et la <a href="#">politique de confidentialite</a></span>
                    </label>
                  </div>
                </div>

                <!-- Form Actions -->
                <div class="form-actions">
                  <button type="button" class="btn btn-ghost" id="prev-step" style="visibility: hidden;">
                    ${Components.icons.chevronLeft}
                    Precedent
                  </button>
                  <button type="button" class="btn btn-primary" id="next-step">
                    Suivant
                    ${Components.icons.chevronRight}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ -->
        <section class="faq-section">
          <div class="container">
            <div class="faq-container">
              <h2 class="section-title">Questions frequentes</h2>
              ${Components.renderAccordion(DATA.FAQ_PROVIDER, { id: 'faq' })}
            </div>
          </div>
        </section>

        <!-- Provider Testimonials -->
        <section class="provider-testimonials">
          <div class="container">
            <h2 class="section-title">Ils nous font confiance</h2>
            <div class="provider-testimonials-grid">
              ${DATA.PROVIDER_TESTIMONIALS.map(t => `
                <div class="provider-testimonial-card">
                  <p class="provider-testimonial-quote">"${t.quote}"</p>
                  <div class="provider-testimonial-author">
                    <img src="${t.avatar}" alt="${t.author}">
                    <div class="provider-testimonial-info">
                      <div class="provider-testimonial-name">${t.author}</div>
                      <div class="provider-testimonial-company">${t.company}</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </div>
    `;

    this.initRegistrationPageFeatures(steps);
  },

  initRegistrationPageFeatures(steps) {
    const form = document.getElementById('registration-form');
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');

    // Step navigation
    const updateStep = () => {
      const stepEls = form.querySelectorAll('.form-step');
      stepEls.forEach((el, i) => {
        el.classList.toggle('active', i === this.state.registrationStep);
      });

      // Update progress
      const progressContainer = document.querySelector('.registration-steps');
      progressContainer.innerHTML = Components.renderProgressSteps(steps, this.state.registrationStep);

      // Update buttons
      prevBtn.style.visibility = this.state.registrationStep === 0 ? 'hidden' : 'visible';

      if (this.state.registrationStep === steps.length - 1) {
        nextBtn.innerHTML = `Creer mon compte ${Components.icons.check}`;
      } else {
        nextBtn.innerHTML = `Suivant ${Components.icons.chevronRight}`;
      }

      // Update summary
      if (this.state.registrationStep === 4) {
        document.getElementById('summary-email').textContent =
          form.querySelector('[name="email"]').value || '-';
        document.getElementById('summary-company').textContent =
          form.querySelector('[name="company"]').value || '-';
        const city = form.querySelector('[name="city"]').value;
        const postal = form.querySelector('[name="postal"]').value;
        document.getElementById('summary-location').textContent =
          city && postal ? `${postal} ${city}` : '-';
      }
    };

    prevBtn.addEventListener('click', () => {
      if (this.state.registrationStep > 0) {
        this.state.registrationStep--;
        updateStep();
      }
    });

    nextBtn.addEventListener('click', () => {
      // Validate current step
      const currentStepEl = form.querySelector(`.form-step[data-step="${this.state.registrationStep}"]`);
      const inputs = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.checkValidity()) {
          input.reportValidity();
          isValid = false;
        }
      });

      if (!isValid) return;

      if (this.state.registrationStep < steps.length - 1) {
        this.state.registrationStep++;
        updateStep();
      } else {
        // Submit
        Components.showToast({
          type: 'success',
          title: 'Compte cree !',
          message: 'Bienvenue sur Lokashopy. Vous allez recevoir un email de confirmation.'
        });
        // Redirect to home after a delay
        setTimeout(() => this.navigate('/'), 2000);
      }
    });

    // File uploads
    this.setupFileUpload('logo-upload');
    this.setupFileUpload('photos-upload');

    // Accordion
    this.setupAccordion();

    // Plan buttons in pricing section
    document.querySelectorAll('[data-plan]').forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.dataset.plan;
        const planInput = document.getElementById(`plan-${plan}`);
        if (planInput) {
          planInput.checked = true;
        }
        // Scroll to form
        const formSection = document.querySelector('.registration-form-section');
        Utils.scrollTo(formSection, { offset: 100 });
      });
    });
  },

  setupFileUpload(id) {
    const uploadZone = document.getElementById(id);
    if (!uploadZone) return;

    const input = uploadZone.querySelector('input[type="file"]');

    uploadZone.addEventListener('click', () => input.click());

    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length) {
        input.files = files;
        this.handleFileUpload(uploadZone, files);
      }
    });

    input.addEventListener('change', () => {
      if (input.files.length) {
        this.handleFileUpload(uploadZone, input.files);
      }
    });
  },

  handleFileUpload(zone, files) {
    // Show preview
    let preview = zone.querySelector('.file-preview');
    if (!preview) {
      preview = document.createElement('div');
      preview.className = 'file-preview';
      zone.appendChild(preview);
    }

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const item = document.createElement('div');
          item.className = 'file-preview-item';
          item.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}">
            <button class="file-preview-remove" type="button">${Components.icons.x}</button>
          `;
          item.querySelector('.file-preview-remove').addEventListener('click', (ev) => {
            ev.stopPropagation();
            item.remove();
          });
          preview.appendChild(item);
        };
        reader.readAsDataURL(file);
      }
    });

    Components.showToast({
      type: 'success',
      title: 'Fichier(s) ajoute(s)',
      message: `${files.length} fichier(s) pret(s) a etre telecharge(s)`
    });
  },

  // ----------------------------------------
  // PAGE DASHBOARD
  // ----------------------------------------
  renderDashboardPage(tab = 'overview') {
    const main = document.getElementById('main-content');
    const providerData = this.state.userProvider;

    let content = '';
    switch (tab) {
      case 'profil':
        content = Components.renderDashboardProfile(providerData);
        break;
      case 'equipements':
        content = Components.renderDashboardEquipments(providerData);
        break;
      case 'tarifs':
        content = Components.renderDashboardPricing(providerData);
        break;
      case 'galerie':
        content = Components.renderDashboardGallery(providerData);
        break;
      case 'avis':
        content = Components.renderDashboardReviews(providerData);
        break;
      default:
        content = Components.renderDashboardOverview(providerData);
    }

    main.innerHTML = Components.renderDashboardLayout(content, tab);

    // Setup des fonctionnalites du dashboard
    this.initDashboardFeatures(tab);
  },

  initDashboardFeatures(tab) {
    switch (tab) {
      case 'profil':
        this.initProfileFeatures();
        break;
      case 'equipements':
        this.initEquipmentsFeatures();
        break;
      case 'tarifs':
        this.initPricingFeatures();
        break;
      case 'galerie':
        this.initGalleryFeatures();
        break;
    }
  },

  initProfileFeatures() {
    const form = document.getElementById('profile-form');
    if (!form) return;

    // Logo upload
    const logoInput = document.getElementById('logo-input');
    const changeLogoBtn = document.getElementById('change-logo-btn');
    const logoPreview = document.getElementById('logo-preview');

    changeLogoBtn?.addEventListener('click', () => logoInput.click());

    logoInput?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        changeLogoBtn.innerHTML = '<span class="loader loader-sm"></span> Upload...';
        changeLogoBtn.disabled = true;

        const result = await StorageService.uploadLogo(this.state.currentUser.id, file);
        if (result.success) {
          logoPreview.innerHTML = `<img src="${result.url}" alt="Logo">`;
          this.state.userProvider.profile.logo = result.url;
          Components.showToast({ type: 'success', message: 'Logo mis a jour' });
        } else {
          Components.showToast({ type: 'error', message: 'Erreur lors de l\'upload' });
        }

        changeLogoBtn.innerHTML = `${Components.icons.upload} Changer le logo`;
        changeLogoBtn.disabled = false;
      }
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = document.getElementById('save-profile-btn');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loader loader-sm"></span> Enregistrement...';

      const uid = this.state.currentUser.id;

      // Update profile
      await ProviderService.updateProfile(uid, {
        name: formData.get('name'),
        description: formData.get('description'),
        experience: formData.get('experience') ? parseInt(formData.get('experience')) : null,
        eventsPerYear: formData.get('eventsPerYear') ? parseInt(formData.get('eventsPerYear')) : null,
        radius: formData.get('radius') ? parseInt(formData.get('radius')) : null,
        googleReviewsUrl: formData.get('googleReviewsUrl') || null,
        googleRating: formData.get('googleRating') ? parseFloat(formData.get('googleRating')) : null,
        googleReviewCount: formData.get('googleReviewCount') ? parseInt(formData.get('googleReviewCount')) : null,
        trustpilotUrl: formData.get('trustpilotUrl') || null,
        trustpilotRating: formData.get('trustpilotRating') ? parseFloat(formData.get('trustpilotRating')) : null,
        trustpilotReviewCount: formData.get('trustpilotReviewCount') ? parseInt(formData.get('trustpilotReviewCount')) : null
      });

      // Update location
      await ProviderService.updateLocation(uid, {
        address: formData.get('address'),
        postalCode: formData.get('postalCode'),
        city: formData.get('city'),
        department: formData.get('department')
      });

      // Update contact
      await ProviderService.updateContact(uid, {
        phone: formData.get('phone'),
        website: formData.get('website'),
        email: this.state.currentUser.email,
        social: {
          instagram: formData.get('instagram'),
          facebook: formData.get('facebook')
        }
      });

      // Refresh provider data
      const result = await ProviderService.getProvider(uid);
      if (result.success) {
        this.state.userProvider = result.data;
      }

      Components.showToast({
        type: 'success',
        title: 'Profil mis a jour',
        message: 'Vos modifications ont ete enregistrees.'
      });

      submitBtn.disabled = false;
      submitBtn.innerHTML = `${Components.icons.check} Enregistrer les modifications`;
    });
  },

  // Handler global pour le formulaire profil (event delegation)
  async handleProfileFormSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = document.getElementById('save-profile-btn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loader loader-sm"></span> Enregistrement...';
    }

    const uid = this.state.currentUser?.id;
    if (!uid) {
      Components.showToast({ type: 'error', message: 'Utilisateur non connecte' });
      return;
    }

    try {
      // Update profile
      await ProviderService.updateProfile(uid, {
        name: formData.get('name'),
        description: formData.get('description'),
        experience: formData.get('experience') ? parseInt(formData.get('experience')) : null,
        eventsPerYear: formData.get('eventsPerYear') ? parseInt(formData.get('eventsPerYear')) : null,
        radius: formData.get('radius') ? parseInt(formData.get('radius')) : null,
        googleReviewsUrl: formData.get('googleReviewsUrl') || null,
        googleRating: formData.get('googleRating') ? parseFloat(formData.get('googleRating')) : null,
        googleReviewCount: formData.get('googleReviewCount') ? parseInt(formData.get('googleReviewCount')) : null,
        trustpilotUrl: formData.get('trustpilotUrl') || null,
        trustpilotRating: formData.get('trustpilotRating') ? parseFloat(formData.get('trustpilotRating')) : null,
        trustpilotReviewCount: formData.get('trustpilotReviewCount') ? parseInt(formData.get('trustpilotReviewCount')) : null
      });

      // Update location
      await ProviderService.updateLocation(uid, {
        address: formData.get('address'),
        postalCode: formData.get('postalCode'),
        city: formData.get('city'),
        department: formData.get('department')
      });

      // Update contact
      await ProviderService.updateContact(uid, {
        phone: formData.get('phone'),
        website: formData.get('website'),
        email: this.state.currentUser.email,
        social: {
          instagram: formData.get('instagram'),
          facebook: formData.get('facebook')
        }
      });

      // Refresh provider data
      const result = await ProviderService.getProvider(uid);
      if (result.success) {
        this.state.userProvider = result.data;
      }

      Components.showToast({
        type: 'success',
        title: 'Profil mis a jour',
        message: 'Vos modifications ont ete enregistrees.'
      });
    } catch (error) {
      Components.showToast({ type: 'error', message: 'Erreur lors de la sauvegarde' });
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${Components.icons.check} Enregistrer les modifications`;
    }
  },

  initEquipmentsFeatures() {
    // Add booth buttons
    const addBoothBtn = document.getElementById('add-booth-btn');
    const addFirstBoothBtn = document.getElementById('add-first-booth-btn');

    const openBoothModal = () => {
      this.openModal('booth-modal');
      this.setupBoothForm();
    };

    addBoothBtn?.addEventListener('click', openBoothModal);
    addFirstBoothBtn?.addEventListener('click', openBoothModal);

    // Edit booth buttons
    document.querySelectorAll('.edit-booth-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const boothId = btn.dataset.boothId;
        const booth = this.state.userProvider.booths.find(b => b.id === boothId);
        if (booth) {
          // Ouvrir la modal d'abord
          this.openModal('booth-modal');

          // Attendre que la modal soit visible puis remplir le formulaire
          setTimeout(() => {
            const form = document.getElementById('booth-form');
            if (form) {
              form.querySelector('[name="name"]').value = booth.name || '';
              form.querySelector('[name="type"]').value = booth.type || '';
              form.querySelector('[name="priceFrom"]').value = booth.priceFrom || '';
              form.querySelector('[name="description"]').value = booth.description || '';
              form.querySelector('[name="specs"]').value = booth.specs?.join('\n') || '';
              form.querySelector('[name="boothId"]').value = booth.id;

              // Check options
              form.querySelectorAll('[name="options"]').forEach(cb => {
                cb.checked = booth.options?.includes(cb.value) || false;
                // Afficher le champ de quantite si l'option est cochee et a une quantite
                if (cb.dataset.hasQuantity === 'true' && cb.checked) {
                  const quantityDiv = document.getElementById(`quantity-${cb.value}`);
                  if (quantityDiv) quantityDiv.classList.add('visible');
                }
              });

              // Remplir la quantite si elle existe
              if (booth.printQuantity) {
                const qtyInput = form.querySelector('[name="printQuantity"]');
                if (qtyInput) qtyInput.value = booth.printQuantity;
              }

              // Remplir l'image si elle existe
              const imagePreview = document.getElementById('booth-image-preview');
              const imageUrlInput = document.getElementById('booth-image-url');
              if (booth.images && booth.images[0]) {
                imagePreview.innerHTML = `<img src="${booth.images[0]}" alt="Preview">`;
                imageUrlInput.value = booth.images[0];
              }
            }
            this.setupBoothForm();
          }, 100);
        }
      });
    });

    // Delete booth buttons
    document.querySelectorAll('.delete-booth-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const boothId = btn.dataset.boothId;
        if (confirm('Voulez-vous vraiment supprimer ce photobooth ?')) {
          const result = await ProviderService.deleteBooth(this.state.currentUser.id, boothId);
          if (result.success) {
            Components.showToast({ type: 'success', message: 'Photobooth supprime' });
            // Refresh
            const providerResult = await ProviderService.getProvider(this.state.currentUser.id);
            if (providerResult.success) {
              this.state.userProvider = providerResult.data;
            }
            this.renderDashboardPage('equipements');
          }
        }
      });
    });
  },

  setupBoothForm() {
    const saveBtn = document.getElementById('save-booth-btn');
    const form = document.getElementById('booth-form');

    if (!saveBtn || !form) return;

    // Setup image upload
    const imageInput = document.getElementById('booth-image-input');
    const imageBtn = document.getElementById('booth-image-btn');
    const imagePreview = document.getElementById('booth-image-preview');
    const imageUrlInput = document.getElementById('booth-image-url');

    console.log('Setting up booth form - imageBtn:', !!imageBtn, 'imageInput:', !!imageInput);

    if (imageBtn && imageInput) {
      imageBtn.onclick = (e) => {
        e.preventDefault();
        console.log('Image button clicked');
        imageInput.click();
      };
    }

    if (imagePreview && imageInput) {
      imagePreview.onclick = (e) => {
        e.preventDefault();
        console.log('Preview clicked');
        imageInput.click();
      };
    }

    imageInput?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      };
      reader.readAsDataURL(file);

      // Upload to Supabase
      imageBtn.disabled = true;
      imageBtn.innerHTML = '<span class="loader loader-sm"></span> Upload...';

      const result = await StorageService.uploadBoothImage(this.state.currentUser.id, file);
      if (result.success) {
        imageUrlInput.value = result.url;
        imageBtn.innerHTML = `${Components.icons.camera} Photo ajoutee`;
      } else {
        Components.showToast({ type: 'error', message: 'Erreur upload image' });
        imageBtn.innerHTML = `${Components.icons.camera} Reessayer`;
      }
      imageBtn.disabled = false;
    });

    // Gestion du champ de quantite pour l'option Impression
    const quantityCheckboxes = form.querySelectorAll('input[data-has-quantity="true"]');
    quantityCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const quantityDiv = document.getElementById(`quantity-${checkbox.value}`);
        if (quantityDiv) {
          if (e.target.checked) {
            quantityDiv.classList.add('visible');
          } else {
            quantityDiv.classList.remove('visible');
          }
        }
      });
    });

    // Remove old listener
    const newSaveBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

    newSaveBtn.addEventListener('click', async () => {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const boothId = formData.get('boothId');
      const imageUrl = formData.get('imageUrl');

      newSaveBtn.disabled = true;
      newSaveBtn.innerHTML = '<span class="loader loader-sm"></span> Enregistrement...';

      const printQty = formData.get('printQuantity');
      const boothData = {
        name: formData.get('name'),
        type: formData.get('type'),
        priceFrom: parseInt(formData.get('priceFrom')),
        description: formData.get('description'),
        specs: formData.get('specs').split('\n').filter(s => s.trim()),
        options: formData.getAll('options'),
        printQuantity: printQty ? parseInt(printQty) : null,
        images: imageUrl ? [imageUrl] : []
      };

      let result;
      console.log('Saving booth:', boothData);
      console.log('User ID:', this.state.currentUser?.id);

      if (boothId) {
        result = await ProviderService.updateBooth(this.state.currentUser.id, boothId, boothData);
      } else {
        result = await ProviderService.addBooth(this.state.currentUser.id, boothData);
      }

      console.log('Save result:', result);

      if (result.success) {
        this.closeModal('booth-modal');
        Components.showToast({
          type: 'success',
          message: boothId ? 'Photobooth modifie' : 'Photobooth ajoute'
        });
        // Refresh
        const providerResult = await ProviderService.getProvider(this.state.currentUser.id);
        if (providerResult.success) {
          this.state.userProvider = providerResult.data;
        }
        this.renderDashboardPage('equipements');
      } else {
        Components.showToast({ type: 'error', message: 'Erreur lors de l\'enregistrement' });
        newSaveBtn.disabled = false;
        newSaveBtn.textContent = 'Enregistrer';
      }
    });
  },

  initPricingFeatures() {
    const form = document.getElementById('pricing-form');
    if (!form) return;

    let formulaCount = this.state.userProvider?.pricing?.formulas?.length || 0;
    let extraCount = this.state.userProvider?.pricing?.extras?.length || 0;

    // Add formula
    document.getElementById('add-formula-btn')?.addEventListener('click', () => {
      const list = document.getElementById('formulas-list');
      const emptyEl = list.querySelector('.empty-inline');
      if (emptyEl) emptyEl.remove();

      const div = document.createElement('div');
      div.className = 'pricing-formula-card';
      div.dataset.index = formulaCount;
      div.innerHTML = `
        <div class="pricing-formula-header">
          <input type="text" class="form-input" name="formula_name_${formulaCount}" placeholder="Nom de la formule">
          <input type="number" class="form-input" name="formula_price_${formulaCount}" placeholder="Prix" style="width: 120px;">
          <button type="button" class="btn btn-ghost btn-sm remove-formula-btn" data-index="${formulaCount}">
            ${Components.icons.x}
          </button>
        </div>
        <textarea class="form-input" name="formula_features_${formulaCount}" rows="2" placeholder="Caracteristiques (une par ligne)"></textarea>
      `;
      list.appendChild(div);

      // Add remove listener
      div.querySelector('.remove-formula-btn').addEventListener('click', () => div.remove());

      formulaCount++;
    });

    // Add extra
    document.getElementById('add-extra-btn')?.addEventListener('click', () => {
      const list = document.getElementById('extras-list');
      const emptyEl = list.querySelector('.empty-inline');
      if (emptyEl) emptyEl.remove();

      const div = document.createElement('div');
      div.className = 'pricing-extra-row';
      div.dataset.index = extraCount;
      div.innerHTML = `
        <input type="text" class="form-input" name="extra_name_${extraCount}" placeholder="Nom de l'option">
        <input type="number" class="form-input" name="extra_price_${extraCount}" placeholder="Prix" style="width: 100px;">
        <input type="text" class="form-input" name="extra_unit_${extraCount}" placeholder="/h, /pers..." style="width: 80px;">
        <button type="button" class="btn btn-ghost btn-sm remove-extra-btn" data-index="${extraCount}">
          ${Components.icons.x}
        </button>
      `;
      list.appendChild(div);

      div.querySelector('.remove-extra-btn').addEventListener('click', () => div.remove());

      extraCount++;
    });

    // Remove formula/extra listeners
    document.querySelectorAll('.remove-formula-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.pricing-formula-card').remove());
    });

    document.querySelectorAll('.remove-extra-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.pricing-extra-row').remove());
    });

    // Save pricing
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('save-pricing-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loader loader-sm"></span> Enregistrement...';

      // Collect formulas
      const formulas = [];
      document.querySelectorAll('.pricing-formula-card').forEach(card => {
        const index = card.dataset.index;
        const name = form.querySelector(`[name="formula_name_${index}"]`)?.value;
        const price = form.querySelector(`[name="formula_price_${index}"]`)?.value;
        const featuresText = form.querySelector(`[name="formula_features_${index}"]`)?.value || '';

        if (name && price) {
          formulas.push({
            name,
            price: parseInt(price),
            features: featuresText.split('\n').filter(f => f.trim())
          });
        }
      });

      // Collect extras
      const extras = [];
      document.querySelectorAll('.pricing-extra-row').forEach(row => {
        const index = row.dataset.index;
        const name = form.querySelector(`[name="extra_name_${index}"]`)?.value;
        const price = form.querySelector(`[name="extra_price_${index}"]`)?.value;
        const unit = form.querySelector(`[name="extra_unit_${index}"]`)?.value || '';

        if (name && price) {
          extras.push({ name, price: parseInt(price), unit });
        }
      });

      const result = await ProviderService.updatePricing(this.state.currentUser.id, { formulas, extras });

      if (result.success) {
        Components.showToast({ type: 'success', message: 'Tarifs enregistres' });
        const providerResult = await ProviderService.getProvider(this.state.currentUser.id);
        if (providerResult.success) {
          this.state.userProvider = providerResult.data;
        }
      } else {
        Components.showToast({ type: 'error', message: 'Erreur lors de l\'enregistrement' });
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = `${Components.icons.check} Enregistrer les tarifs`;
    });
  },

  initGalleryFeatures() {
    const galleryInput = document.getElementById('gallery-input');
    const uploadBtn = document.getElementById('upload-photos-btn');
    const uploadFirstBtn = document.getElementById('upload-first-photos-btn');

    const triggerUpload = () => galleryInput.click();

    uploadBtn?.addEventListener('click', triggerUpload);
    uploadFirstBtn?.addEventListener('click', triggerUpload);

    galleryInput?.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      const progressEl = document.getElementById('upload-progress');
      const progressFill = document.getElementById('upload-progress-fill');
      const progressText = document.getElementById('upload-progress-text');

      progressEl.style.display = 'block';

      const gallery = [...(this.state.userProvider.gallery || [])];
      let completed = 0;

      for (const file of files) {
        progressText.textContent = `Upload ${completed + 1}/${files.length}...`;
        progressFill.style.width = `${(completed / files.length) * 100}%`;

        const result = await StorageService.uploadImage(this.state.currentUser.id, file, 'gallery');
        if (result.success) {
          gallery.push(result.url);
        }
        completed++;
      }

      progressFill.style.width = '100%';
      progressText.textContent = 'Finalisation...';

      // Save gallery
      await ProviderService.updateGallery(this.state.currentUser.id, gallery);

      // Refresh
      const providerResult = await ProviderService.getProvider(this.state.currentUser.id);
      if (providerResult.success) {
        this.state.userProvider = providerResult.data;
      }

      Components.showToast({
        type: 'success',
        title: 'Photos ajoutees',
        message: `${files.length} photo(s) telechargee(s)`
      });

      this.renderDashboardPage('galerie');
    });

    // Delete photo
    document.querySelectorAll('.gallery-item-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        const url = btn.dataset.url;
        if (confirm('Supprimer cette photo ?')) {
          await StorageService.deleteImage(url);
          const gallery = this.state.userProvider.gallery.filter(u => u !== url);
          await ProviderService.updateGallery(this.state.currentUser.id, gallery);

          const providerResult = await ProviderService.getProvider(this.state.currentUser.id);
          if (providerResult.success) {
            this.state.userProvider = providerResult.data;
          }

          Components.showToast({ type: 'success', message: 'Photo supprimee' });
          this.renderDashboardPage('galerie');
        }
      });
    });
  },

  // ----------------------------------------
  // GLOBAL FEATURES
  // ----------------------------------------
  setupGlobalListeners() {
    // Global form submit handler (event delegation for dashboard forms)
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.id === 'profile-form') {
        e.preventDefault();
        this.handleProfileFormSubmit(form);
      }
      // Note: pricing-form est gere par initPricingFeatures
    });

    // User menu dropdown (event delegation)
    document.addEventListener('click', (e) => {
      const userDropdown = document.getElementById('user-dropdown');

      // Click sur le bouton du menu utilisateur
      if (e.target.closest('#user-menu-btn')) {
        e.preventDefault();
        e.stopPropagation();
        if (userDropdown) {
          userDropdown.classList.toggle('open');
          console.log('User menu toggled:', userDropdown.classList.contains('open'));
        }
        return;
      }

      // Click sur le bouton de déconnexion
      if (e.target.closest('#logout-btn') || e.target.closest('#mobile-logout-btn')) {
        e.preventDefault();
        if (userDropdown) userDropdown.classList.remove('open');
        this.handleLogout();
        return;
      }

      // Fermer le dropdown si on clique ailleurs
      if (userDropdown && userDropdown.classList.contains('open')) {
        if (!e.target.closest('#user-dropdown') && !e.target.closest('#user-menu-btn')) {
          userDropdown.classList.remove('open');
        }
      }
    });

    // Header scroll effect
    window.addEventListener('scroll', Utils.throttle(() => {
      const header = document.getElementById('header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
      }
    }, 100));

    // Close mobile menu on link click (delegate)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.mobile-nav-link')) {
        this.closeMobileMenu();
      }
    });

    // Favorites
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="favorite"]');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        this.toggleFavorite(parseInt(btn.dataset.id));
      }
    });

    // Modal close
    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('[data-close-modal]');
      if (closeBtn) {
        this.closeModal(closeBtn.dataset.closeModal);
      }
    });

    // Close modal on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop') && e.target.classList.contains('open')) {
        const modalId = e.target.id.replace('-backdrop', '');
        this.closeModal(modalId);
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close any open modal
        document.querySelectorAll('.modal.open').forEach(modal => {
          this.closeModal(modal.id);
        });
        // Close mobile menu
        this.closeMobileMenu();
        // Close lightbox
        this.closeLightbox();
      }
    });
  },

  closeMobileMenu() {
    document.getElementById('mobile-nav')?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  },

  setupSearchForm() {
    const form = document.getElementById('search-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const params = new URLSearchParams();

      const location = formData.get('location');
      const eventType = formData.get('eventType');

      if (location) params.set('location', location);
      if (eventType) params.set('eventType', eventType);

      this.navigate(`/recherche?${params.toString()}`);
    });

    // Geolocation button
    const geoBtn = document.getElementById('geolocate-btn');
    if (geoBtn) {
      geoBtn.addEventListener('click', async () => {
        try {
          geoBtn.innerHTML = `<span class="loader loader-sm"></span>`;
          const position = await Utils.getUserLocation();
          // In a real app, reverse geocode to get city name
          document.getElementById('location-input').value = 'Ma position';
          geoBtn.innerHTML = Components.icons.crosshair;
          Components.showToast({
            type: 'success',
            title: 'Position detectee',
            message: 'Recherche basee sur votre localisation'
          });
        } catch (error) {
          geoBtn.innerHTML = Components.icons.crosshair;
          Components.showToast({
            type: 'error',
            title: 'Erreur',
            message: 'Impossible de detecter votre position'
          });
        }
      });
    }
  },

  setupTabs() {
    document.querySelectorAll('.tabs').forEach(tabsContainer => {
      const buttons = tabsContainer.querySelectorAll('.tab-btn');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const tabId = btn.dataset.tab;
          const panelId = tabId + '-panel-' + tabId.split('-').pop();

          // Update buttons
          buttons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          // Update panels
          const panels = document.querySelectorAll(`[id^="${tabId.split('-')[0]}-tabs-panel"]`);
          panels.forEach(panel => panel.classList.remove('active'));

          const targetPanel = document.getElementById(btn.getAttribute('aria-controls'));
          if (targetPanel) {
            targetPanel.classList.add('active');
          }

          // Lazy load images in the newly visible tab
          Utils.lazyLoadImages();
        });
      });
    });
  },

  setupAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const isOpen = item.classList.contains('open');

        // Close all items
        item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
        });

        // Open clicked if was closed
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  },

  setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!lightbox) return;

    // Open lightbox
    document.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('[data-lightbox-index]');
      if (galleryItem) {
        const index = parseInt(galleryItem.dataset.lightboxIndex);
        this.openLightbox(index);
      }

      const boothImage = e.target.closest('[data-lightbox]');
      if (boothImage) {
        const images = boothImage.dataset.lightbox.split(',');
        this.state.lightboxImages = images;
        this.openLightbox(0);
      }
    });

    closeBtn?.addEventListener('click', () => this.closeLightbox());
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) this.closeLightbox();
    });

    prevBtn?.addEventListener('click', () => {
      this.state.lightboxIndex = (this.state.lightboxIndex - 1 + this.state.lightboxImages.length) % this.state.lightboxImages.length;
      this.updateLightboxImage('prev');
    });

    nextBtn?.addEventListener('click', () => {
      this.state.lightboxIndex = (this.state.lightboxIndex + 1) % this.state.lightboxImages.length;
      this.updateLightboxImage('next');
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;

      if (e.key === 'ArrowLeft') {
        this.state.lightboxIndex = (this.state.lightboxIndex - 1 + this.state.lightboxImages.length) % this.state.lightboxImages.length;
        this.updateLightboxImage('prev');
      } else if (e.key === 'ArrowRight') {
        this.state.lightboxIndex = (this.state.lightboxIndex + 1) % this.state.lightboxImages.length;
        this.updateLightboxImage('next');
      }
    });
  },

  openLightbox(index) {
    this.state.lightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    if (lightbox && this.state.lightboxImages.length > 0) {
      lightbox.classList.add('open');
      document.body.classList.add('no-scroll');
      this.updateLightboxImage();
    }
  },

  updateLightboxImage(direction = null) {
    const image = document.getElementById('lightbox-image');
    if (image && this.state.lightboxImages[this.state.lightboxIndex]) {
      if (direction) {
        // Animation 3D Flip
        const flipOut = direction === 'next' ? 'flip-out-left' : 'flip-out-right';
        const flipIn = direction === 'next' ? 'flip-in-right' : 'flip-in-left';

        image.classList.add(flipOut);

        setTimeout(() => {
          image.src = this.state.lightboxImages[this.state.lightboxIndex];
          image.classList.remove(flipOut);
          image.classList.add(flipIn);

          setTimeout(() => {
            image.classList.remove(flipIn);
          }, 400);
        }, 300);
      } else {
        image.src = this.state.lightboxImages[this.state.lightboxIndex];
      }
    }
  },

  closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  },

  toggleFavorite(providerId) {
    let favorites = Utils.storage.get('favorites', []);
    const index = favorites.indexOf(providerId);

    if (index > -1) {
      favorites.splice(index, 1);
      Components.showToast({
        type: 'info',
        message: 'Retire des favoris'
      });
    } else {
      favorites.push(providerId);
      Components.showToast({
        type: 'success',
        message: 'Ajoute aux favoris'
      });
    }

    Utils.storage.set('favorites', favorites);

    // Update all favorite buttons for this provider
    document.querySelectorAll(`[data-action="favorite"][data-id="${providerId}"]`).forEach(btn => {
      const isFavorite = favorites.includes(providerId);
      btn.classList.toggle('active', isFavorite);
      btn.innerHTML = isFavorite ? Components.icons.heartFilled : Components.icons.heart;
    });
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById(`${modalId}-backdrop`);

    if (modal && backdrop) {
      modal.classList.add('open');
      backdrop.classList.add('open');
      document.body.classList.add('no-scroll');

      // Focus first input
      const firstInput = modal.querySelector('input, textarea, select');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById(`${modalId}-backdrop`);

    if (modal && backdrop) {
      modal.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  }
};

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// Exporter l'application
window.App = App;
