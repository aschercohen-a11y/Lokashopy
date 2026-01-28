/* ========================================
   BOOTHFINDER - Fonctions Utilitaires
   ======================================== */

const Utils = {
  // ----------------------------------------
  // DOM Utilities
  // ----------------------------------------

  /**
   * Selectionne un element du DOM
   */
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  /**
   * Selectionne tous les elements correspondants
   */
  $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  },

  /**
   * Cree un element avec des attributs et du contenu
   */
  createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });

    if (typeof content === 'string') {
      element.innerHTML = content;
    } else if (content instanceof Element) {
      element.appendChild(content);
    } else if (Array.isArray(content)) {
      content.forEach(child => {
        if (child instanceof Element) {
          element.appendChild(child);
        }
      });
    }

    return element;
  },

  /**
   * Ajoute une classe a un element
   */
  addClass(element, ...classes) {
    if (element) element.classList.add(...classes);
  },

  /**
   * Retire une classe d'un element
   */
  removeClass(element, ...classes) {
    if (element) element.classList.remove(...classes);
  },

  /**
   * Toggle une classe sur un element
   */
  toggleClass(element, className, force) {
    if (element) return element.classList.toggle(className, force);
  },

  /**
   * Verifie si un element a une classe
   */
  hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
  },

  // ----------------------------------------
  // Event Utilities
  // ----------------------------------------

  /**
   * Ajoute un event listener avec delegation
   */
  delegate(element, eventType, selector, handler) {
    element.addEventListener(eventType, (e) => {
      const target = e.target.closest(selector);
      if (target && element.contains(target)) {
        handler.call(target, e, target);
      }
    });
  },

  /**
   * Debounce une fonction
   */
  debounce(func, wait = 250) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle une fonction
   */
  throttle(func, limit = 250) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // ----------------------------------------
  // Storage Utilities
  // ----------------------------------------

  /**
   * Sauvegarde dans localStorage
   */
  storage: {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn('LocalStorage unavailable:', e);
        return false;
      }
    },

    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn('LocalStorage unavailable:', e);
        return defaultValue;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    },

    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (e) {
        return false;
      }
    }
  },

  // ----------------------------------------
  // Format Utilities
  // ----------------------------------------

  /**
   * Formate un prix en euros
   */
  formatPrice(amount, options = {}) {
    const { decimals = 0, currency = '\u20ac' } = options;
    return `${amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}${currency}`;
  },

  /**
   * Formate une date
   */
  formatDate(date, options = {}) {
    const d = new Date(date);
    const defaultOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return d.toLocaleDateString('fr-FR', { ...defaultOptions, ...options });
  },

  /**
   * Formate une date relative (il y a X jours)
   */
  formatRelativeDate(date) {
    const now = new Date();
    const d = new Date(date);
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));

    if (diff === 0) return 'Aujourd\'hui';
    if (diff === 1) return 'Hier';
    if (diff < 7) return `Il y a ${diff} jours`;
    if (diff < 30) return `Il y a ${Math.floor(diff / 7)} semaine${Math.floor(diff / 7) > 1 ? 's' : ''}`;
    if (diff < 365) return `Il y a ${Math.floor(diff / 30)} mois`;
    return `Il y a ${Math.floor(diff / 365)} an${Math.floor(diff / 365) > 1 ? 's' : ''}`;
  },

  /**
   * Tronque un texte
   */
  truncate(text, length = 100, suffix = '...') {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + suffix;
  },

  /**
   * Genere un slug a partir d'une chaine
   */
  slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  },

  // ----------------------------------------
  // Validation Utilities
  // ----------------------------------------

  /**
   * Valide une adresse email
   */
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  /**
   * Valide un numero de telephone francais
   */
  isValidPhone(phone) {
    const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(phone);
  },

  /**
   * Valide un numero SIRET
   */
  isValidSiret(siret) {
    const cleaned = siret.replace(/\s/g, '');
    if (!/^\d{14}$/.test(cleaned)) return false;

    // Algorithme de Luhn
    let sum = 0;
    for (let i = 0; i < 14; i++) {
      let digit = parseInt(cleaned[i], 10);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  },

  /**
   * Valide un code postal francais
   */
  isValidPostalCode(code) {
    return /^\d{5}$/.test(code);
  },

  // ----------------------------------------
  // Animation Utilities
  // ----------------------------------------

  /**
   * Anime un compteur de nombre
   */
  animateCounter(element, end, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOut);

      element.textContent = current.toLocaleString('fr-FR');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  },

  /**
   * Scroll vers un element
   */
  scrollTo(element, options = {}) {
    const { offset = 0, behavior = 'smooth' } = options;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior
    });
  },

  /**
   * Initialise l'observation pour les animations au scroll
   */
  initScrollReveal(selector = '.reveal', options = {}) {
    const { threshold = 0.1, rootMargin = '0px' } = options;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  },

  // ----------------------------------------
  // Rating Utilities
  // ----------------------------------------

  /**
   * Genere le HTML pour les etoiles de notation
   */
  generateStars(rating, options = {}) {
    const { max = 5, size = '' } = options;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

    const starIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

    let html = `<span class="stars ${size ? 'stars-' + size : ''}">`;

    for (let i = 0; i < fullStars; i++) {
      html += `<span class="star-filled">${starIcon}</span>`;
    }

    if (hasHalfStar) {
      html += `<span class="star-half">${starIcon}</span>`;
    }

    for (let i = 0; i < emptyStars; i++) {
      html += `<span class="star-empty">${starIcon}</span>`;
    }

    html += '</span>';
    return html;
  },

  // ----------------------------------------
  // Image Utilities
  // ----------------------------------------

  /**
   * Lazy load des images
   */
  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
      // Browser supporte le lazy loading natif
      images.forEach(img => {
        img.addEventListener('load', () => img.classList.add('loaded'));
        if (img.complete) img.classList.add('loaded');
      });
    } else {
      // Fallback avec IntersectionObserver
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => observer.observe(img));
    }
  },

  /**
   * Precharge une image
   */
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  // ----------------------------------------
  // Geolocation Utilities
  // ----------------------------------------

  /**
   * Obtient la position de l'utilisateur
   */
  getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // Cache pendant 5 minutes
        }
      );
    });
  },

  /**
   * Calcule la distance entre deux points (formule de Haversine)
   */
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  toRad(deg) {
    return deg * (Math.PI / 180);
  },

  // ----------------------------------------
  // Filter/Search Utilities
  // ----------------------------------------

  /**
   * Filtre les prestataires selon les criteres
   */
  filterProviders(providers, filters) {
    return providers.filter(provider => {
      // Filtre par type de booth
      if (filters.boothTypes && filters.boothTypes.length > 0) {
        const hasMatchingBooth = filters.boothTypes.some(type =>
          provider.boothTypes.includes(type)
        );
        if (!hasMatchingBooth) return false;
      }

      // Filtre par prix
      if (filters.priceMin && provider.priceFrom < filters.priceMin) return false;
      if (filters.priceMax && provider.priceFrom > filters.priceMax) return false;

      // Filtre par note minimum
      if (filters.minRating && provider.rating < filters.minRating) return false;

      // Filtre par options
      if (filters.options && filters.options.length > 0) {
        const providerOptions = provider.booths.flatMap(b => b.options);
        const hasAllOptions = filters.options.every(opt =>
          providerOptions.includes(opt)
        );
        if (!hasAllOptions) return false;
      }

      // Filtre par localisation/rayon (si coordonnees disponibles)
      if (filters.location && filters.radius) {
        const distance = this.calculateDistance(
          filters.location.lat,
          filters.location.lng,
          provider.location.coordinates.lat,
          provider.location.coordinates.lng
        );
        if (distance > filters.radius) return false;
      }

      return true;
    });
  },

  /**
   * Trie les prestataires
   */
  sortProviders(providers, sortBy) {
    const sorted = [...providers];

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'relevance':
      default:
        // Pertinence = note * log(nb avis + 1)
        sorted.sort((a, b) => {
          const scoreA = a.rating * Math.log(a.reviewCount + 1);
          const scoreB = b.rating * Math.log(b.reviewCount + 1);
          return scoreB - scoreA;
        });
    }

    return sorted;
  },

  // ----------------------------------------
  // ID Generator
  // ----------------------------------------

  /**
   * Genere un ID unique
   */
  generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // ----------------------------------------
  // URL Utilities
  // ----------------------------------------

  /**
   * Parse les parametres de l'URL
   */
  getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },

  /**
   * Met a jour les parametres de l'URL sans recharger
   */
  updateUrlParams(params, replace = false) {
    const url = new URL(window.location.href);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });

    const method = replace ? 'replaceState' : 'pushState';
    window.history[method]({}, '', url.toString());
  }
};

// Exporter les utilitaires
window.Utils = Utils;
