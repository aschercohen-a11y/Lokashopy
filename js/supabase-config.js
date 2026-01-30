/* ========================================
   LOKASHOPY - Configuration Supabase
   ======================================== */

// IMPORTANT: Remplacez ces valeurs par votre propre configuration Supabase
// Obtenez-les depuis https://supabase.com > Votre projet > Settings > API

const SUPABASE_URL = 'https://cagygpiweqejbiofknxl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xhEh9oudRscxqKTJ5zfgKA_4VF1RXgv';

// Client Supabase (utilise un nom different pour eviter le conflit avec le SDK)
let supabaseClient = null;

// Fonction d'initialisation
function initializeSupabase() {
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase initialized');
    return true;
  }
  console.warn('Supabase SDK not loaded');
  return false;
}

// ----------------------------------------
// SERVICE D'AUTHENTIFICATION
// ----------------------------------------
const AuthService = {
  // Inscription avec email/mot de passe
  async register(email, password, userData) {
    try {
      // Creer le compte
      const { data: authData, error: authError } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            company_name: userData.companyName,
            user_type: userData.userType || 'provider'
          }
        }
      });

      if (authError) throw authError;

      const user = authData.user;
      if (!user) throw new Error('Erreur lors de la creation du compte');

      // Creer le profil prestataire dans la table providers
      const { error: profileError } = await supabaseClient
        .from('providers')
        .insert({
          id: user.id,
          name: userData.companyName,
          slug: this.generateSlug(userData.companyName),
          description: userData.description || '',
          logo_url: '',
          verified: false,
          email: email,
          city: userData.city || '',
          department: userData.department || '',
          address: userData.address || '',
          postal_code: userData.postalCode || '',
          phone: userData.phone || '',
          website: userData.website || '',
          instagram: userData.instagram || '',
          facebook: userData.facebook || '',
          booths: [],
          pricing_formulas: [],
          pricing_extras: [],
          gallery: [],
          views: 0,
          quotes: 0,
          favorites: 0,
          plan: userData.plan || 'free'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Le compte est cree meme si le profil echoue
      }

      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: this.getErrorMessage(error.message) };
    }
  },

  // Connexion
  async login(email, password) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: this.getErrorMessage(error.message) };
    }
  },

  // Deconnexion
  async logout() {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  },

  // Reinitialisation du mot de passe
  async resetPassword(email) {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
      });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error.message) };
    }
  },

  // Ecouter les changements d'etat d'authentification
  onAuthStateChanged(callback) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });

    // Verifier l'etat initial
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      callback(session?.user || null);
    });
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
  },

  // Generer un slug
  generateSlug(name) {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  },

  // Traduire les messages d'erreur
  getErrorMessage(message) {
    const messages = {
      'Invalid login credentials': 'Email ou mot de passe incorrect.',
      'Email not confirmed': 'Veuillez confirmer votre email avant de vous connecter.',
      'User already registered': 'Cette adresse email est deja utilisee.',
      'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caracteres.',
      'Unable to validate email address: invalid format': 'Adresse email invalide.',
      'Email rate limit exceeded': 'Trop de tentatives. Veuillez reessayer plus tard.',
      'Network request failed': 'Erreur de connexion. Verifiez votre connexion internet.'
    };

    for (const [key, value] of Object.entries(messages)) {
      if (message.includes(key)) return value;
    }
    return message || 'Une erreur est survenue. Veuillez reessayer.';
  }
};

// ----------------------------------------
// SERVICE PROVIDER (DONNEES PRESTATAIRE)
// ----------------------------------------
const ProviderService = {
  // Obtenir les donnees du prestataire par ID
  async getProvider(uid) {
    try {
      const { data, error } = await supabaseClient
        .from('providers')
        .select('*')
        .eq('id', uid)
        .single();

      if (error) throw error;

      return {
        success: true,
        data: this.transformProviderData(data)
      };
    } catch (error) {
      console.error('Get provider error:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtenir un prestataire par son slug (pour la page publique)
  async getProviderBySlug(slug) {
    try {
      const { data, error } = await supabaseClient
        .from('providers')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      return {
        success: true,
        data: this.transformToPublicFormat(data)
      };
    } catch (error) {
      console.error('Get provider by slug error:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtenir tous les prestataires (pour la recherche)
  async getAllProviders() {
    try {
      const { data, error } = await supabaseClient
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data.map(p => this.transformToPublicFormat(p))
      };
    } catch (error) {
      console.error('Get all providers error:', error);
      return { success: false, error: error.message };
    }
  },

  // Transformer les donnees Supabase vers le format public (pour les cartes et pages publiques)
  transformToPublicFormat(data) {
    const booths = data.booths || [];
    const formulas = data.pricing_formulas || [];
    const gallery = data.gallery || [];

    // Extraire les types de booths
    const boothTypes = booths.map(b => b.type).filter(Boolean);

    // Calculer le prix minimum
    let priceFrom = 0;
    if (formulas.length > 0) {
      priceFrom = Math.min(...formulas.map(f => f.price || 0).filter(p => p > 0)) || 0;
    } else if (booths.length > 0) {
      priceFrom = Math.min(...booths.map(b => b.priceFrom || 0).filter(p => p > 0)) || 0;
    }

    // Image de couverture
    const cover = gallery.length > 0
      ? gallery
      : ['https://placehold.co/800x500/1a1a2e/ffffff?text=' + encodeURIComponent(data.name || 'Prestataire')];

    // Logo
    const logo = data.logo_url || 'https://placehold.co/100x100/ff2d6a/ffffff?text=' + encodeURIComponent((data.name || 'P').charAt(0));

    return {
      id: data.id,
      slug: data.slug,
      name: data.name || 'Sans nom',
      description: data.description || '',
      logo: logo,
      cover: cover,
      location: {
        city: data.city || 'France',
        department: data.department || '',
        address: data.address || ''
      },
      contact: {
        phone: data.phone || '',
        email: data.email || '',
        website: data.website || '',
        social: {
          instagram: data.instagram || '',
          facebook: data.facebook || ''
        }
      },
      booths: booths,
      boothTypes: boothTypes.length > 0 ? boothTypes : ['photobooth'],
      priceFrom: priceFrom,
      pricing: {
        formulas: formulas,
        extras: data.pricing_extras || []
      },
      gallery: gallery,
      verified: data.verified || false,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      radius: 50,
      hours: {
        'Lundi': '9h - 18h',
        'Mardi': '9h - 18h',
        'Mercredi': '9h - 18h',
        'Jeudi': '9h - 18h',
        'Vendredi': '9h - 18h',
        'Samedi': 'Sur RDV',
        'Dimanche': 'Ferme'
      },
      stats: {
        views: data.views || 0,
        quotes: data.quotes || 0,
        favorites: data.favorites || 0
      }
    };
  },

  // Transformer les donnees Supabase vers le format de l'app
  transformProviderData(data) {
    return {
      profile: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        logo: data.logo_url,
        verified: data.verified,
        email: data.email
      },
      location: {
        city: data.city,
        department: data.department,
        address: data.address,
        postalCode: data.postal_code
      },
      contact: {
        phone: data.phone,
        email: data.email,
        website: data.website,
        social: {
          instagram: data.instagram,
          facebook: data.facebook
        }
      },
      booths: data.booths || [],
      pricing: {
        formulas: data.pricing_formulas || [],
        extras: data.pricing_extras || []
      },
      gallery: data.gallery || [],
      stats: {
        views: data.views || 0,
        quotes: data.quotes || 0,
        favorites: data.favorites || 0
      },
      plan: data.plan,
      createdAt: data.created_at
    };
  },

  // Mettre a jour le profil
  async updateProfile(uid, profileData) {
    try {
      const { error } = await supabaseClient
        .from('providers')
        .update({
          name: profileData.name,
          description: profileData.description,
          slug: AuthService.generateSlug(profileData.name),
          updated_at: new Date().toISOString()
        })
        .eq('id', uid);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  },

  // Mettre a jour la localisation
  async updateLocation(uid, locationData) {
    try {
      const { error } = await supabaseClient
        .from('providers')
        .update({
          city: locationData.city,
          department: locationData.department,
          address: locationData.address,
          postal_code: locationData.postalCode,
          updated_at: new Date().toISOString()
        })
        .eq('id', uid);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Mettre a jour les contacts
  async updateContact(uid, contactData) {
    try {
      const { error } = await supabaseClient
        .from('providers')
        .update({
          phone: contactData.phone,
          website: contactData.website,
          instagram: contactData.social?.instagram || '',
          facebook: contactData.social?.facebook || '',
          updated_at: new Date().toISOString()
        })
        .eq('id', uid);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Gestion des photobooths
  async addBooth(uid, boothData) {
    try {
      console.log('addBooth called with uid:', uid);

      const { data: provider, error: fetchError } = await supabaseClient
        .from('providers')
        .select('booths')
        .eq('id', uid)
        .single();

      console.log('Current provider booths:', provider?.booths);
      if (fetchError) console.error('Fetch error:', fetchError);

      const booths = provider?.booths || [];
      const boothId = 'booth_' + Date.now();

      booths.push({
        id: boothId,
        ...boothData,
        createdAt: new Date().toISOString()
      });

      console.log('New booths array:', booths);

      const { error } = await supabaseClient
        .from('providers')
        .update({ booths, updated_at: new Date().toISOString() })
        .eq('id', uid);

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      console.log('Booth added successfully');
      return { success: true, boothId };
    } catch (error) {
      console.error('addBooth error:', error);
      return { success: false, error: error.message };
    }
  },

  async updateBooth(uid, boothId, boothData) {
    try {
      const { data: provider } = await supabaseClient
        .from('providers')
        .select('booths')
        .eq('id', uid)
        .single();

      const booths = provider?.booths || [];
      const index = booths.findIndex(b => b.id === boothId);

      if (index !== -1) {
        booths[index] = { ...booths[index], ...boothData };

        const { error } = await supabase
          .from('providers')
          .update({ booths, updated_at: new Date().toISOString() })
          .eq('id', uid);

        if (error) throw error;
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteBooth(uid, boothId) {
    try {
      const { data: provider } = await supabaseClient
        .from('providers')
        .select('booths')
        .eq('id', uid)
        .single();

      const booths = (provider?.booths || []).filter(b => b.id !== boothId);

      const { error } = await supabaseClient
        .from('providers')
        .update({ booths, updated_at: new Date().toISOString() })
        .eq('id', uid);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Gestion des tarifs
  async updatePricing(uid, pricingData) {
    try {
      const { error } = await supabaseClient
        .from('providers')
        .update({
          pricing_formulas: pricingData.formulas,
          pricing_extras: pricingData.extras,
          updated_at: new Date().toISOString()
        })
        .eq('id', uid);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Gestion de la galerie
  async updateGallery(uid, galleryUrls) {
    try {
      const { error } = await supabaseClient
        .from('providers')
        .update({
          gallery: galleryUrls,
          updated_at: new Date().toISOString()
        })
        .eq('id', uid);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Incrementer les stats
  async incrementStat(uid, statName) {
    try {
      const { data: provider } = await supabaseClient
        .from('providers')
        .select(statName)
        .eq('id', uid)
        .single();

      const currentValue = provider?.[statName] || 0;

      const { error } = await supabaseClient
        .from('providers')
        .update({ [statName]: currentValue + 1 })
        .eq('id', uid);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ----------------------------------------
// SERVICE STORAGE (IMAGES)
// ----------------------------------------
const StorageService = {
  // Upload une image
  async uploadImage(uid, file, folder = 'gallery') {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${uid}/${folder}/${fileName}`;

      const { error: uploadError } = await supabaseClient.storage
        .from('provider-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabaseClient.storage
        .from('provider-images')
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }
  },

  // Supprimer une image
  async deleteImage(url) {
    try {
      // Extraire le chemin du fichier depuis l'URL
      const urlParts = url.split('/provider-images/');
      if (urlParts.length < 2) throw new Error('Invalid URL');

      const filePath = urlParts[1];

      const { error } = await supabaseClient.storage
        .from('provider-images')
        .remove([filePath]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }
  },

  // Upload le logo
  async uploadLogo(uid, file) {
    const result = await this.uploadImage(uid, file, 'logo');

    if (result.success) {
      await supabaseClient
        .from('providers')
        .update({ logo_url: result.url })
        .eq('id', uid);
    }

    return result;
  }
};

// Exporter les services
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
window.initializeSupabase = initializeSupabase;
window.AuthService = AuthService;
window.ProviderService = ProviderService;
window.StorageService = StorageService;
