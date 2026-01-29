/* ========================================
   LOKASHOPY - Configuration Supabase
   ======================================== */

// IMPORTANT: Remplacez ces valeurs par votre propre configuration Supabase
// Obtenez-les depuis https://supabase.com > Votre projet > Settings > API

const SUPABASE_URL = 'https://cagygpiweqejbiofknxl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xhEh9oudRscxqKTJ5zfgKA_4VF1RXgv';

// Client Supabase
let supabase = null;

// Fonction d'initialisation
function initializeSupabase() {
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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
      const { data: authData, error: authError } = await supabase.auth.signUp({
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
      const { error: profileError } = await supabase
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
      const { data, error } = await supabase.auth.signInWithPassword({
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
      const { error } = await supabase.auth.signOut();
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
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
    supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });

    // Verifier l'etat initial
    supabase.auth.getSession().then(({ data: { session } }) => {
      callback(session?.user || null);
    });
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
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
  // Obtenir les donnees du prestataire
  async getProvider(uid) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('id', uid)
        .single();

      if (error) throw error;

      // Transformer les donnees pour correspondre au format attendu par l'app
      return {
        success: true,
        data: this.transformProviderData(data)
      };
    } catch (error) {
      console.error('Get provider error:', error);
      return { success: false, error: error.message };
    }
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
      const { error } = await supabase
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
      const { error } = await supabase
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
      const { error } = await supabase
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
      const { data: provider } = await supabase
        .from('providers')
        .select('booths')
        .eq('id', uid)
        .single();

      const booths = provider?.booths || [];
      const boothId = 'booth_' + Date.now();

      booths.push({
        id: boothId,
        ...boothData,
        createdAt: new Date().toISOString()
      });

      const { error } = await supabase
        .from('providers')
        .update({ booths, updated_at: new Date().toISOString() })
        .eq('id', uid);

      if (error) throw error;
      return { success: true, boothId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateBooth(uid, boothId, boothData) {
    try {
      const { data: provider } = await supabase
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
      const { data: provider } = await supabase
        .from('providers')
        .select('booths')
        .eq('id', uid)
        .single();

      const booths = (provider?.booths || []).filter(b => b.id !== boothId);

      const { error } = await supabase
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
      const { error } = await supabase
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
      const { error } = await supabase
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
      const { data: provider } = await supabase
        .from('providers')
        .select(statName)
        .eq('id', uid)
        .single();

      const currentValue = provider?.[statName] || 0;

      const { error } = await supabase
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

      const { error: uploadError } = await supabase.storage
        .from('provider-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
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

      const { error } = await supabase.storage
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
      await supabase
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
