/* ========================================
   BOOTHFINDER - Donnees de demonstration
   ======================================== */

// Types de photobooths
const BOOTH_TYPES = [
  { id: 'mirror', name: 'Miroir', icon: 'mirror' },
  { id: 'classic', name: 'Borne classique', icon: 'camera' },
  { id: '360', name: '360\u00b0', icon: 'rotate' },
  { id: 'vintage', name: 'Vintage', icon: 'film' },
  { id: 'flower', name: 'Mur de fleurs', icon: 'flower' },
  { id: 'halo', name: 'Halo ring', icon: 'circle' }
];

// Types d'evenements
const EVENT_TYPES = [
  { id: 'wedding', name: 'Mariage' },
  { id: 'birthday', name: 'Anniversaire' },
  { id: 'corporate', name: 'Entreprise' },
  { id: 'private', name: 'Soiree privee' },
  { id: 'fair', name: 'Salon/Foire' }
];

// Options incluses
const OPTIONS = [
  { id: 'unlimited-prints', name: 'Impressions illimitees', icon: 'printer' },
  { id: 'props', name: 'Props/accessoires', icon: 'party' },
  { id: 'custom-bg', name: 'Fond personnalise', icon: 'image' },
  { id: 'online-gallery', name: 'Galerie en ligne', icon: 'gallery' },
  { id: 'gifs', name: 'GIFs/Boomerangs', icon: 'video' },
  { id: 'social-share', name: 'Partage reseaux sociaux', icon: 'share' }
];

// Donnees des prestataires
const PROVIDERS = [
  {
    id: 1,
    name: 'Flash Party',
    slug: 'flash-party',
    verified: true,
    logo: 'https://placehold.co/100x100/FF2D6A/white?text=FP',
    cover: [
      'https://placehold.co/800x600/1A1A2E/FFD93D?text=Flash+Party',
      'https://placehold.co/800x600/FF2D6A/white?text=Photobooth',
      'https://placehold.co/800x600/1A1A2E/FF2D6A?text=Events'
    ],
    location: {
      city: 'Paris',
      department: '75',
      region: 'Ile-de-France',
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    radius: 100,
    rating: 4.9,
    reviewCount: 127,
    priceFrom: 450,
    boothTypes: ['mirror', 'classic', '360'],
    description: 'Flash Party, c\'est l\'animation photo qui fait briller vos evenements depuis 2015. Notre equipe passionnee met tout en oeuvre pour capturer les plus beaux moments de vos celebrations. Avec nos equipements haut de gamme et notre sens du service, nous garantissons des souvenirs inoubliables.',
    experience: 9,
    eventsPerYear: 180,
    phone: '01 23 45 67 89',
    website: 'https://flash-party.fr',
    social: {
      instagram: '@flashparty',
      facebook: 'FlashPartyFR'
    },
    booths: [
      {
        id: 'fp-mirror',
        name: 'Magic Mirror Pro',
        type: 'mirror',
        description: 'Notre miroir magique derniere generation offre une experience interactive unique. Ecran tactile 55 pouces, animations personnalisables et impression instantanee.',
        images: [
          'https://placehold.co/fpm1/600/400',
          'https://placehold.co/fpm2/600/400',
          'https://placehold.co/fpm3/600/400'
        ],
        specs: ['Ecran 55"', '4K Ultra HD', 'Tactile', 'Ring light integre'],
        options: ['unlimited-prints', 'props', 'custom-bg', 'online-gallery', 'gifs', 'social-share'],
        priceFrom: 650
      },
      {
        id: 'fp-360',
        name: 'Spin 360',
        type: '360',
        description: 'La plateforme 360 pour des videos spectaculaires. Vos invites montent sur le plateau et notre camera capture leur meilleur moment sous tous les angles.',
        images: [
          'https://placehold.co/fp360a/600/400',
          'https://placehold.co/fp360b/600/400'
        ],
        specs: ['Plateforme 1m', 'Camera 4K', 'Slow motion', 'Eclairage LED'],
        options: ['props', 'custom-bg', 'online-gallery', 'gifs', 'social-share'],
        priceFrom: 890
      }
    ],
    gallery: [
      'https://placehold.co/fpg1/400/400',
      'https://placehold.co/fpg2/400/600',
      'https://placehold.co/fpg3/400/400',
      'https://placehold.co/fpg4/600/400',
      'https://placehold.co/fpg5/400/400',
      'https://placehold.co/fpg6/400/400',
      'https://placehold.co/fpg7/400/600',
      'https://placehold.co/fpg8/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Essentiel - 3h', price: 450, features: ['1 photobooth', 'Operateur', 'Props basiques'] },
        { name: 'Premium - 4h', price: 650, features: ['1 photobooth', 'Operateur', 'Props premium', 'Fond personnalise'] },
        { name: 'VIP - 5h', price: 890, features: ['2 photobooths', 'Operateur', 'Props premium', 'Fond personnalise', 'Livre d\'or'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 120 },
        { name: 'Album photo', price: 80 },
        { name: 'Cle USB personnalisee', price: 25 }
      ]
    },
    hours: {
      monday: '9h-18h',
      tuesday: '9h-18h',
      wednesday: '9h-18h',
      thursday: '9h-18h',
      friday: '9h-18h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Marie L.',
        avatar: 'https://placehold.co/u1/100/100',
        date: '2024-11-15',
        eventType: 'Mariage',
        rating: 5,
        text: 'Absolument parfait pour notre mariage ! L\'equipe etait super professionnelle et nos invites ont adore le miroir magique. Les photos sont magnifiques, merci !',
        reply: {
          author: 'Flash Party',
          date: '2024-11-16',
          text: 'Merci infiniment Marie pour ce retour chaleureux ! C\'etait un plaisir de participer a votre beau mariage. Tous nos voeux de bonheur !'
        }
      },
      {
        id: 'r2',
        author: 'Thomas D.',
        avatar: 'https://placehold.co/u2/100/100',
        date: '2024-10-28',
        eventType: 'Entreprise',
        rating: 5,
        text: 'Prestation impeccable pour notre soiree d\'entreprise. Le booth 360 a fait sensation aupres de nos collaborateurs. Je recommande vivement !',
        reply: null
      },
      {
        id: 'r3',
        author: 'Sophie M.',
        avatar: 'https://placehold.co/u3/100/100',
        date: '2024-10-12',
        eventType: 'Anniversaire',
        rating: 4,
        text: 'Tres bonne prestation dans l\'ensemble. Juste un petit delai au demarrage mais le reste etait parfait. Les photos sont superbes !',
        reply: null
      }
    ]
  },
  {
    id: 2,
    name: 'Smile Box Events',
    slug: 'smile-box-events',
    verified: true,
    logo: 'https://placehold.co/100x100/FFD93D/1A1A2E?text=SB',
    cover: [
      'https://placehold.co/800x600/FFD93D/1A1A2E?text=Smile+Box',
      'https://placehold.co/800x600/FF2D6A/white?text=Events'
    ],
    location: {
      city: 'Lyon',
      department: '69',
      region: 'Auvergne-Rhone-Alpes',
      coordinates: { lat: 45.7640, lng: 4.8357 }
    },
    radius: 80,
    rating: 4.8,
    reviewCount: 89,
    priceFrom: 380,
    boothTypes: ['classic', 'vintage', 'flower'],
    description: 'Smile Box Events vous accompagne depuis 2017 pour immortaliser vos plus beaux moments. Specialistes des mariages et evenements prives, nous proposons des photobooths au design soigne et une qualite d\'image exceptionnelle.',
    experience: 7,
    eventsPerYear: 120,
    phone: '04 56 78 90 12',
    website: 'https://smilebox-events.fr',
    social: {
      instagram: '@smileboxevents',
      facebook: 'SmileBoxEvents'
    },
    booths: [
      {
        id: 'sb-vintage',
        name: 'Retro Booth',
        type: 'vintage',
        description: 'Un photobooth au charme retro avec son look annees 50. Parfait pour un mariage champetre ou une soiree a theme.',
        images: [
          'https://placehold.co/sbv1/600/400',
          'https://placehold.co/sbv2/600/400'
        ],
        specs: ['Design bois', 'Eclairage chaud', 'Filtres vintage', 'Impression sepia'],
        options: ['unlimited-prints', 'props', 'online-gallery'],
        priceFrom: 380
      },
      {
        id: 'sb-flower',
        name: 'Flower Wall',
        type: 'flower',
        description: 'Notre mur de fleurs artificielles premium cree un decor feerique pour vos photos. Combine avec notre borne photo discrete.',
        images: [
          'https://placehold.co/sbf1/600/400',
          'https://placehold.co/sbf2/600/400'
        ],
        specs: ['Mur 2.5m x 2.5m', 'Fleurs premium', 'Borne tactile', 'Eclairage integre'],
        options: ['unlimited-prints', 'props', 'custom-bg', 'online-gallery', 'social-share'],
        priceFrom: 590
      }
    ],
    gallery: [
      'https://placehold.co/sbg1/400/400',
      'https://placehold.co/sbg2/400/600',
      'https://placehold.co/sbg3/400/400',
      'https://placehold.co/sbg4/400/400',
      'https://placehold.co/sbg5/600/400',
      'https://placehold.co/sbg6/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Decouverte - 3h', price: 380, features: ['1 photobooth', 'Operateur', 'Props'] },
        { name: 'Serenite - 4h', price: 520, features: ['1 photobooth', 'Operateur', 'Props', 'Fond personnalise'] },
        { name: 'Excellence - 5h', price: 720, features: ['Mur de fleurs + borne', 'Operateur', 'Props premium'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 100 },
        { name: 'Livre d\'or', price: 60 }
      ]
    },
    hours: {
      monday: '10h-17h',
      tuesday: '10h-17h',
      wednesday: '10h-17h',
      thursday: '10h-17h',
      friday: '10h-17h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Julie R.',
        avatar: 'https://placehold.co/u4/100/100',
        date: '2024-11-01',
        eventType: 'Mariage',
        rating: 5,
        text: 'Le mur de fleurs etait juste MAGNIFIQUE ! Toutes nos photos sont sublimes. L\'equipe Smile Box est adorable et tres pro. Merci pour ces souvenirs !',
        reply: {
          author: 'Smile Box Events',
          date: '2024-11-02',
          text: 'Merci Julie, c\'etait un honneur de faire partie de votre journee ! Felicitations aux maries !'
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Le Photobooth Francais',
    slug: 'le-photobooth-francais',
    verified: true,
    logo: 'https://placehold.co/100x100/1A1A2E/FF2D6A?text=PF',
    cover: [
      'https://placehold.co/800x600/1A1A2E/white?text=Le+Photobooth',
      'https://placehold.co/800x600/FF2D6A/white?text=Francais'
    ],
    location: {
      city: 'Bordeaux',
      department: '33',
      region: 'Nouvelle-Aquitaine',
      coordinates: { lat: 44.8378, lng: -0.5792 }
    },
    radius: 120,
    rating: 4.7,
    reviewCount: 156,
    priceFrom: 320,
    boothTypes: ['classic', 'mirror', 'halo'],
    description: 'Le Photobooth Francais, c\'est l\'expertise made in France depuis 2012. Pionniers du photobooth en Aquitaine, nous avons anime plus de 2000 evenements avec passion et professionnalisme.',
    experience: 12,
    eventsPerYear: 200,
    phone: '05 12 34 56 78',
    website: 'https://lephotoboothfrancais.fr',
    social: {
      instagram: '@lephotoboothfrancais',
      facebook: 'LePhotoboothFrancais'
    },
    booths: [
      {
        id: 'lpf-classic',
        name: 'Borne Elegance',
        type: 'classic',
        description: 'Notre borne classique au design epure et elegant. Simple d\'utilisation, elle convient a tous types d\'evenements.',
        images: [
          'https://placehold.co/lpfc1/600/400',
          'https://placehold.co/lpfc2/600/400'
        ],
        specs: ['Design epure', 'Ecran tactile', 'Flash studio', 'Impression rapide'],
        options: ['unlimited-prints', 'props', 'online-gallery', 'social-share'],
        priceFrom: 320
      },
      {
        id: 'lpf-halo',
        name: 'Halo Light',
        type: 'halo',
        description: 'L\'effet ring light pour des portraits parfaits. Ce photobooth moderne sublime chaque prise de vue avec son eclairage circulaire.',
        images: [
          'https://placehold.co/lpfh1/600/400',
          'https://placehold.co/lpfh2/600/400'
        ],
        specs: ['Ring light LED', 'iPad Pro', 'Effet portrait', 'Rendu beaute'],
        options: ['unlimited-prints', 'props', 'custom-bg', 'online-gallery', 'gifs', 'social-share'],
        priceFrom: 480
      }
    ],
    gallery: [
      'https://placehold.co/lpfg1/400/400',
      'https://placehold.co/lpfg2/400/400',
      'https://placehold.co/lpfg3/600/400',
      'https://placehold.co/lpfg4/400/600',
      'https://placehold.co/lpfg5/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Basic - 3h', price: 320, features: ['1 borne', 'Props basiques', 'Galerie en ligne'] },
        { name: 'Standard - 4h', price: 450, features: ['1 borne', 'Operateur', 'Props', 'Fond personnalise'] },
        { name: 'Premium - 5h', price: 620, features: ['Borne Halo', 'Operateur', 'Props premium', 'Tout inclus'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 90 },
        { name: 'Props theme', price: 50 },
        { name: 'Fond sur mesure', price: 80 }
      ]
    },
    hours: {
      monday: '9h-19h',
      tuesday: '9h-19h',
      wednesday: '9h-19h',
      thursday: '9h-19h',
      friday: '9h-19h',
      saturday: '10h-16h',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Pierre G.',
        avatar: 'https://placehold.co/u5/100/100',
        date: '2024-10-20',
        eventType: 'Entreprise',
        rating: 5,
        text: 'Service au top pour notre seminaire. L\'equipe s\'est adaptee a nos contraintes et le resultat est excellent. A refaire !',
        reply: null
      }
    ]
  },
  {
    id: 4,
    name: 'Studio Booth',
    slug: 'studio-booth',
    verified: true,
    logo: 'https://placehold.co/100x100/FF2D6A/white?text=SB',
    cover: [
      'https://placehold.co/800x600/FF2D6A/1A1A2E?text=Studio+Booth',
      'https://placehold.co/800x600/FFD93D/1A1A2E?text=Marseille'
    ],
    location: {
      city: 'Marseille',
      department: '13',
      region: 'Provence-Alpes-Cote d\'Azur',
      coordinates: { lat: 43.2965, lng: 5.3698 }
    },
    radius: 90,
    rating: 4.6,
    reviewCount: 73,
    priceFrom: 400,
    boothTypes: ['mirror', '360', 'classic'],
    description: 'Studio Booth apporte la magie de la photographie professionnelle a vos evenements mediterraneens. Une equipe dynamique et creative pour des souvenirs ensoleilles !',
    experience: 5,
    eventsPerYear: 100,
    phone: '04 91 23 45 67',
    website: 'https://studio-booth.fr',
    social: {
      instagram: '@studiobooth13',
      facebook: 'StudioBooth13'
    },
    booths: [
      {
        id: 'stb-mirror',
        name: 'Miroir Mediterranee',
        type: 'mirror',
        description: 'Notre miroir au design moderne et lumineux. Ideal pour les evenements en interieur comme en exterieur.',
        images: [
          'https://placehold.co/stbm1/600/400',
          'https://placehold.co/stbm2/600/400'
        ],
        specs: ['Ecran 50"', 'Design blanc', 'LED RGB', 'Batterie autonome'],
        options: ['unlimited-prints', 'props', 'custom-bg', 'online-gallery', 'social-share'],
        priceFrom: 550
      }
    ],
    gallery: [
      'https://placehold.co/stbg1/400/400',
      'https://placehold.co/stbg2/400/400',
      'https://placehold.co/stbg3/400/600',
      'https://placehold.co/stbg4/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Soleil - 3h', price: 400, features: ['1 photobooth', 'Props', 'Galerie'] },
        { name: 'Plage - 4h', price: 550, features: ['Miroir', 'Operateur', 'Props', 'Fond personnalise'] },
        { name: 'Riviera - 6h', price: 850, features: ['2 photobooths', 'Equipe complete', 'Tout inclus'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 110 },
        { name: 'Deplacement hors zone', price: 0.80, unit: '/km' }
      ]
    },
    hours: {
      monday: '9h-18h',
      tuesday: '9h-18h',
      wednesday: '9h-18h',
      thursday: '9h-18h',
      friday: '9h-18h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Laura B.',
        avatar: 'https://placehold.co/u6/100/100',
        date: '2024-09-15',
        eventType: 'Mariage',
        rating: 5,
        text: 'Super prestation pour notre mariage en Provence. L\'equipe etait geniale et les photos sont canon !',
        reply: null
      }
    ]
  },
  {
    id: 5,
    name: 'Click & Fun',
    slug: 'click-and-fun',
    verified: true,
    logo: 'https://placehold.co/100x100/FFD93D/1A1A2E?text=CF',
    cover: [
      'https://placehold.co/800x600/FFD93D/1A1A2E?text=Click+Fun'
    ],
    location: {
      city: 'Toulouse',
      department: '31',
      region: 'Occitanie',
      coordinates: { lat: 43.6047, lng: 1.4442 }
    },
    radius: 70,
    rating: 4.4,
    reviewCount: 42,
    priceFrom: 290,
    boothTypes: ['classic', 'vintage'],
    description: 'Click & Fun propose des animations photo accessibles et de qualite pour tous vos evenements en Occitanie. Tarifs competitifs et service souriant garanti !',
    experience: 3,
    eventsPerYear: 60,
    phone: '05 62 34 56 78',
    website: 'https://clickandfun.fr',
    social: {
      instagram: '@clickandfun31',
      facebook: 'ClickAndFun31'
    },
    booths: [
      {
        id: 'cf-classic',
        name: 'Fun Box',
        type: 'classic',
        description: 'Notre borne fun et coloree pour une ambiance festive. Parfaite pour les anniversaires et soirees.',
        images: [
          'https://placehold.co/cfc1/600/400'
        ],
        specs: ['Design colore', 'Ecran tactile', 'GIFs animes', 'Envoi SMS/Mail'],
        options: ['unlimited-prints', 'props', 'gifs', 'social-share'],
        priceFrom: 290
      }
    ],
    gallery: [
      'https://placehold.co/cfg1/400/400',
      'https://placehold.co/cfg2/400/400',
      'https://placehold.co/cfg3/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Fun - 2h', price: 290, features: ['1 borne', 'Props', 'Galerie'] },
        { name: 'Super Fun - 3h', price: 380, features: ['1 borne', 'Props premium', 'Galerie', 'Impressions'] },
        { name: 'Mega Fun - 4h', price: 480, features: ['1 borne', 'Operateur', 'Tout inclus'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 80 }
      ]
    },
    hours: {
      monday: '10h-18h',
      tuesday: '10h-18h',
      wednesday: '10h-18h',
      thursday: '10h-18h',
      friday: '10h-18h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Marc T.',
        avatar: 'https://placehold.co/u7/100/100',
        date: '2024-08-20',
        eventType: 'Anniversaire',
        rating: 4,
        text: 'Bon rapport qualite-prix pour l\'anniversaire de ma fille. Les enfants ont adore !',
        reply: null
      }
    ]
  },
  {
    id: 6,
    name: 'Instant Magic',
    slug: 'instant-magic',
    verified: true,
    logo: 'https://placehold.co/100x100/1A1A2E/FFD93D?text=IM',
    cover: [
      'https://placehold.co/800x600/1A1A2E/FFD93D?text=Instant+Magic',
      'https://placehold.co/800x600/FF2D6A/white?text=Nantes',
      'https://placehold.co/800x600/FFD93D/1A1A2E?text=Events'
    ],
    location: {
      city: 'Nantes',
      department: '44',
      region: 'Pays de la Loire',
      coordinates: { lat: 47.2184, lng: -1.5536 }
    },
    radius: 100,
    rating: 4.9,
    reviewCount: 98,
    priceFrom: 420,
    boothTypes: ['mirror', 'classic', '360', 'halo'],
    description: 'Instant Magic cree des moments magiques depuis 2016. Notre passion pour l\'innovation et notre sens du detail font de chaque evenement une experience unique et memorable.',
    experience: 8,
    eventsPerYear: 150,
    phone: '02 40 12 34 56',
    website: 'https://instant-magic.fr',
    social: {
      instagram: '@instantmagic44',
      facebook: 'InstantMagic44'
    },
    booths: [
      {
        id: 'im-360',
        name: 'Magic Spin',
        type: '360',
        description: 'Notre plateforme 360 dernier cri avec effets speciaux integres. Slow motion, confettis virtuels, tout est possible !',
        images: [
          'https://placehold.co/im360a/600/400',
          'https://placehold.co/im360b/600/400'
        ],
        specs: ['Plateforme XXL', 'Effets speciaux', 'Montage auto', 'Musique sync'],
        options: ['props', 'custom-bg', 'online-gallery', 'gifs', 'social-share'],
        priceFrom: 780
      },
      {
        id: 'im-mirror',
        name: 'Crystal Mirror',
        type: 'mirror',
        description: 'Le miroir enchante pour des photos dignes des magazines. Retouches automatiques et filtres professionnels.',
        images: [
          'https://placehold.co/imm1/600/400',
          'https://placehold.co/imm2/600/400'
        ],
        specs: ['Miroir 60"', 'IA retouche', 'Filtres pro', 'Impression glossy'],
        options: ['unlimited-prints', 'props', 'custom-bg', 'online-gallery', 'gifs', 'social-share'],
        priceFrom: 620
      }
    ],
    gallery: [
      'https://placehold.co/img1/400/400',
      'https://placehold.co/img2/400/600',
      'https://placehold.co/img3/600/400',
      'https://placehold.co/img4/400/400',
      'https://placehold.co/img5/400/400',
      'https://placehold.co/img6/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Magie - 3h', price: 420, features: ['1 photobooth', 'Operateur', 'Props'] },
        { name: 'Enchantement - 4h', price: 620, features: ['Miroir Crystal', 'Operateur', 'Tout inclus'] },
        { name: 'Feerie - 5h', price: 950, features: ['360 + Miroir', 'Equipe complete', 'Experience VIP'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 130 },
        { name: 'Album cuir', price: 120 },
        { name: 'Drone photo', price: 250 }
      ]
    },
    hours: {
      monday: '9h-18h',
      tuesday: '9h-18h',
      wednesday: '9h-18h',
      thursday: '9h-18h',
      friday: '9h-18h',
      saturday: '9h-14h',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Emma C.',
        avatar: 'https://placehold.co/u8/100/100',
        date: '2024-11-10',
        eventType: 'Mariage',
        rating: 5,
        text: 'Le 360 a vraiment fait sensation ! Tous nos invites en parlent encore. Equipe au top, je recommande a 1000% !',
        reply: {
          author: 'Instant Magic',
          date: '2024-11-11',
          text: 'Merci Emma ! Votre mariage etait vraiment feerique, c\'etait un plaisir d\'y participer !'
        }
      }
    ]
  },
  {
    id: 7,
    name: 'PhotoBox Pro',
    slug: 'photobox-pro',
    verified: true,
    logo: 'https://placehold.co/100x100/FF2D6A/white?text=PB',
    cover: [
      'https://placehold.co/800x600/FF2D6A/white?text=PhotoBox+Pro',
      'https://placehold.co/800x600/1A1A2E/FF2D6A?text=Lille'
    ],
    location: {
      city: 'Lille',
      department: '59',
      region: 'Hauts-de-France',
      coordinates: { lat: 50.6292, lng: 3.0573 }
    },
    radius: 80,
    rating: 4.5,
    reviewCount: 67,
    priceFrom: 350,
    boothTypes: ['classic', 'mirror', 'vintage'],
    description: 'PhotoBox Pro, le specialiste du photobooth dans les Hauts-de-France. Une equipe jeune et dynamique pour animer vos evenements avec creativite et bonne humeur !',
    experience: 6,
    eventsPerYear: 110,
    phone: '03 20 12 34 56',
    website: 'https://photobox-pro.fr',
    social: {
      instagram: '@photoboxpro',
      facebook: 'PhotoBoxProLille'
    },
    booths: [
      {
        id: 'pbp-classic',
        name: 'Box Classic',
        type: 'classic',
        description: 'Notre borne classique revisitee avec un design moderne et epure. Parfaite pour tous types d\'evenements.',
        images: [
          'https://placehold.co/pbpc1/600/400'
        ],
        specs: ['Design moderne', 'Ecran 24"', 'Flash pro', 'Impression thermique'],
        options: ['unlimited-prints', 'props', 'online-gallery', 'social-share'],
        priceFrom: 350
      }
    ],
    gallery: [
      'https://placehold.co/pbpg1/400/400',
      'https://placehold.co/pbpg2/400/400',
      'https://placehold.co/pbpg3/400/600',
      'https://placehold.co/pbpg4/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Starter - 2h', price: 350, features: ['1 borne', 'Props', 'Galerie'] },
        { name: 'Classic - 3h', price: 450, features: ['1 borne', 'Operateur', 'Props', 'Impressions'] },
        { name: 'Premium - 4h', price: 580, features: ['Miroir', 'Operateur', 'Tout inclus'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 95 }
      ]
    },
    hours: {
      monday: '10h-18h',
      tuesday: '10h-18h',
      wednesday: '10h-18h',
      thursday: '10h-18h',
      friday: '10h-18h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: []
  },
  {
    id: 8,
    name: 'Snap Emotion',
    slug: 'snap-emotion',
    verified: true,
    logo: 'https://placehold.co/100x100/FFD93D/1A1A2E?text=SE',
    cover: [
      'https://placehold.co/800x600/FFD93D/1A1A2E?text=Snap+Emotion',
      'https://placehold.co/800x600/FF2D6A/white?text=Strasbourg'
    ],
    location: {
      city: 'Strasbourg',
      department: '67',
      region: 'Grand Est',
      coordinates: { lat: 48.5734, lng: 7.7521 }
    },
    radius: 100,
    rating: 4.8,
    reviewCount: 84,
    priceFrom: 390,
    boothTypes: ['mirror', 'classic', 'flower'],
    description: 'Snap Emotion capture l\'essence de vos moments de joie depuis 2018. Notre approche artistique et notre materiel haut de gamme garantissent des souvenirs d\'exception.',
    experience: 6,
    eventsPerYear: 130,
    phone: '03 88 12 34 56',
    website: 'https://snap-emotion.fr',
    social: {
      instagram: '@snapemotion',
      facebook: 'SnapEmotionFR'
    },
    booths: [
      {
        id: 'se-flower',
        name: 'Rose Garden',
        type: 'flower',
        description: 'Un mur floral romantique compose de roses et pivoines artificielles de haute qualite. L\'ecrin parfait pour vos photos.',
        images: [
          'https://placehold.co/sef1/600/400',
          'https://placehold.co/sef2/600/400'
        ],
        specs: ['Mur 3m x 2.5m', 'Fleurs premium', 'Eclairage doux', 'Borne discrete'],
        options: ['unlimited-prints', 'props', 'online-gallery', 'social-share'],
        priceFrom: 650
      }
    ],
    gallery: [
      'https://placehold.co/seg1/400/400',
      'https://placehold.co/seg2/400/600',
      'https://placehold.co/seg3/400/400',
      'https://placehold.co/seg4/400/400',
      'https://placehold.co/seg5/600/400'
    ],
    pricing: {
      formulas: [
        { name: 'Emotion - 3h', price: 390, features: ['1 borne', 'Props', 'Galerie'] },
        { name: 'Passion - 4h', price: 550, features: ['Miroir', 'Operateur', 'Tout inclus'] },
        { name: 'Romance - 5h', price: 780, features: ['Mur Rose Garden', 'Operateur', 'Experience complete'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 105 },
        { name: 'Couronne de fleurs', price: 40 }
      ]
    },
    hours: {
      monday: '9h-18h',
      tuesday: '9h-18h',
      wednesday: '9h-18h',
      thursday: '9h-18h',
      friday: '9h-18h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Celine V.',
        avatar: 'https://placehold.co/u9/100/100',
        date: '2024-10-05',
        eventType: 'Mariage',
        rating: 5,
        text: 'Le mur de roses etait a couper le souffle ! Les photos sont d\'une qualite incroyable. Merci Snap Emotion !',
        reply: null
      }
    ]
  },
  {
    id: 9,
    name: 'Booth Avenue',
    slug: 'booth-avenue',
    verified: false,
    logo: 'https://placehold.co/100x100/1A1A2E/white?text=BA',
    cover: [
      'https://placehold.co/800x600/1A1A2E/FFD93D?text=Booth+Avenue'
    ],
    location: {
      city: 'Nice',
      department: '06',
      region: 'Provence-Alpes-Cote d\'Azur',
      coordinates: { lat: 43.7102, lng: 7.2620 }
    },
    radius: 60,
    rating: 4.3,
    reviewCount: 38,
    priceFrom: 350,
    boothTypes: ['classic', 'halo'],
    description: 'Booth Avenue anime vos evenements sur la Cote d\'Azur avec style et elegance. Profitez du soleil azureen en creant des souvenirs colores !',
    experience: 4,
    eventsPerYear: 70,
    phone: '04 93 12 34 56',
    website: 'https://booth-avenue.fr',
    social: {
      instagram: '@boothavenue',
      facebook: 'BoothAvenueNice'
    },
    booths: [
      {
        id: 'ba-halo',
        name: 'Azure Ring',
        type: 'halo',
        description: 'Notre ring light au design californien pour des selfies parfaits sous le soleil de la Riviera.',
        images: [
          'https://placehold.co/bah1/600/400'
        ],
        specs: ['Ring LED variable', 'iPad derniere gen', 'Trepied ajustable', 'Filtres beaute'],
        options: ['unlimited-prints', 'props', 'online-gallery', 'gifs', 'social-share'],
        priceFrom: 420
      }
    ],
    gallery: [
      'https://placehold.co/bag1/400/400',
      'https://placehold.co/bag2/400/400',
      'https://placehold.co/bag3/400/600'
    ],
    pricing: {
      formulas: [
        { name: 'Azur - 2h', price: 350, features: ['1 borne', 'Props', 'Galerie'] },
        { name: 'Riviera - 3h', price: 420, features: ['Ring light', 'Props', 'Impressions'] },
        { name: 'Cote d\'Azur - 4h', price: 550, features: ['Ring light', 'Operateur', 'Tout inclus'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 100 }
      ]
    },
    hours: {
      monday: '10h-18h',
      tuesday: '10h-18h',
      wednesday: '10h-18h',
      thursday: '10h-18h',
      friday: '10h-18h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: []
  },
  {
    id: 10,
    name: 'Event Shot',
    slug: 'event-shot',
    verified: true,
    logo: 'https://placehold.co/100x100/FF2D6A/1A1A2E?text=ES',
    cover: [
      'https://placehold.co/800x600/FF2D6A/white?text=Event+Shot',
      'https://placehold.co/800x600/1A1A2E/FFD93D?text=Rennes'
    ],
    location: {
      city: 'Rennes',
      department: '35',
      region: 'Bretagne',
      coordinates: { lat: 48.1173, lng: -1.6778 }
    },
    radius: 90,
    rating: 4.7,
    reviewCount: 92,
    priceFrom: 380,
    boothTypes: ['mirror', 'classic', '360'],
    description: 'Event Shot, votre partenaire photo en Bretagne depuis 2015. Une equipe passionnee qui met tout son coeur pour immortaliser vos plus beaux moments festifs.',
    experience: 9,
    eventsPerYear: 140,
    phone: '02 99 12 34 56',
    website: 'https://event-shot.fr',
    social: {
      instagram: '@eventshotbzh',
      facebook: 'EventShotBretagne'
    },
    booths: [
      {
        id: 'es-360',
        name: 'Breizh Spin',
        type: '360',
        description: 'La video 360 avec une touche bretonne ! Parfait pour mettre l\'ambiance dans vos fest-noz et mariages.',
        images: [
          'https://placehold.co/es360a/600/400',
          'https://placehold.co/es360b/600/400'
        ],
        specs: ['Plateforme renforcee', 'Camera 4K', 'Effets dynamiques', 'Musique personnalisable'],
        options: ['props', 'custom-bg', 'online-gallery', 'gifs', 'social-share'],
        priceFrom: 720
      }
    ],
    gallery: [
      'https://placehold.co/esg1/400/400',
      'https://placehold.co/esg2/400/600',
      'https://placehold.co/esg3/400/400',
      'https://placehold.co/esg4/600/400'
    ],
    pricing: {
      formulas: [
        { name: 'Breizh - 3h', price: 380, features: ['1 borne', 'Props', 'Galerie'] },
        { name: 'Armor - 4h', price: 520, features: ['Miroir', 'Operateur', 'Tout inclus'] },
        { name: 'Argoat - 5h', price: 850, features: ['360 Breizh Spin', 'Equipe', 'Experience VIP'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 100 },
        { name: 'Props bretons', price: 30 }
      ]
    },
    hours: {
      monday: '9h-18h',
      tuesday: '9h-18h',
      wednesday: '9h-18h',
      thursday: '9h-18h',
      friday: '9h-18h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Yann L.',
        avatar: 'https://placehold.co/u10/100/100',
        date: '2024-09-28',
        eventType: 'Mariage',
        rating: 5,
        text: 'Le Breizh Spin a fait un carton a notre mariage ! Tout le monde s\'est eclate. Kenavo et merci !',
        reply: {
          author: 'Event Shot',
          date: '2024-09-29',
          text: 'Trugarez Yann ! C\'etait un super mariage, on a adore l\'ambiance. Kenavo deoc\'h !'
        }
      }
    ]
  },
  {
    id: 11,
    name: 'Selfie Factory',
    slug: 'selfie-factory',
    verified: true,
    logo: 'https://placehold.co/100x100/FFD93D/1A1A2E?text=SF',
    cover: [
      'https://placehold.co/800x600/FFD93D/1A1A2E?text=Selfie+Factory',
      'https://placehold.co/800x600/FF2D6A/white?text=Montpellier'
    ],
    location: {
      city: 'Montpellier',
      department: '34',
      region: 'Occitanie',
      coordinates: { lat: 43.6108, lng: 3.8767 }
    },
    radius: 80,
    rating: 4.6,
    reviewCount: 76,
    priceFrom: 360,
    boothTypes: ['classic', 'halo', 'mirror'],
    description: 'Selfie Factory revolutionne l\'animation photo dans le Sud avec des concepts innovants et un service premium. Creez des contenus viraux pour vos evenements !',
    experience: 5,
    eventsPerYear: 120,
    phone: '04 67 12 34 56',
    website: 'https://selfie-factory.fr',
    social: {
      instagram: '@selfiefactory34',
      facebook: 'SelfieFactoryMTP'
    },
    booths: [
      {
        id: 'sf-halo',
        name: 'Insta Ring',
        type: 'halo',
        description: 'Le photobooth pense pour Instagram ! Filtres tendance, formats Stories et Reels, partage instantane.',
        images: [
          'https://placehold.co/sfh1/600/400',
          'https://placehold.co/sfh2/600/400'
        ],
        specs: ['Format vertical', 'Filtres AR', 'Stories ready', 'QR partage'],
        options: ['unlimited-prints', 'props', 'custom-bg', 'online-gallery', 'gifs', 'social-share'],
        priceFrom: 450
      }
    ],
    gallery: [
      'https://placehold.co/sfg1/400/400',
      'https://placehold.co/sfg2/400/600',
      'https://placehold.co/sfg3/400/400',
      'https://placehold.co/sfg4/400/400',
      'https://placehold.co/sfg5/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Viral - 2h', price: 360, features: ['1 borne', 'Filtres AR', 'Partage social'] },
        { name: 'Trending - 3h', price: 450, features: ['Insta Ring', 'Props', 'Tout inclus'] },
        { name: 'Influencer - 4h', price: 620, features: ['Setup complet', 'Operateur', 'Statistiques'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 110 },
        { name: 'Filtre AR personnalise', price: 150 }
      ]
    },
    hours: {
      monday: '10h-19h',
      tuesday: '10h-19h',
      wednesday: '10h-19h',
      thursday: '10h-19h',
      friday: '10h-19h',
      saturday: 'Sur RDV',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Lea M.',
        avatar: 'https://placehold.co/u11/100/100',
        date: '2024-10-15',
        eventType: 'Soiree privee',
        rating: 5,
        text: 'Concept genial ! Toutes mes amies ont adore le format Stories. Le filtre personnalise etait top !',
        reply: null
      }
    ]
  },
  {
    id: 12,
    name: 'Memory Lane',
    slug: 'memory-lane',
    verified: true,
    logo: 'https://placehold.co/100x100/1A1A2E/FF2D6A?text=ML',
    cover: [
      'https://placehold.co/800x600/1A1A2E/FF2D6A?text=Memory+Lane',
      'https://placehold.co/800x600/FFD93D/1A1A2E?text=Grenoble',
      'https://placehold.co/800x600/FF2D6A/white?text=Vintage'
    ],
    location: {
      city: 'Grenoble',
      department: '38',
      region: 'Auvergne-Rhone-Alpes',
      coordinates: { lat: 45.1885, lng: 5.7245 }
    },
    radius: 100,
    rating: 4.9,
    reviewCount: 104,
    priceFrom: 400,
    boothTypes: ['vintage', 'mirror', 'classic', 'flower'],
    description: 'Memory Lane vous transporte dans un univers retro-chic depuis 2014. Nos photobooths au style intemporel creent des souvenirs empreints de nostalgie et d\'elegance.',
    experience: 10,
    eventsPerYear: 160,
    phone: '04 76 12 34 56',
    website: 'https://memory-lane.fr',
    social: {
      instagram: '@memorylanefr',
      facebook: 'MemoryLaneFrance'
    },
    booths: [
      {
        id: 'ml-vintage',
        name: 'Cabine Parisienne',
        type: 'vintage',
        description: 'Recreez l\'ambiance des cabines photo d\'antan avec notre photobooth style annees 20. Charme et elegance garantis.',
        images: [
          'https://placehold.co/mlv1/600/400',
          'https://placehold.co/mlv2/600/400',
          'https://placehold.co/mlv3/600/400'
        ],
        specs: ['Bois et laiton', 'Rideau velours', 'Eclairage doux', 'Impression sepia/N&B'],
        options: ['unlimited-prints', 'props', 'online-gallery'],
        priceFrom: 520
      },
      {
        id: 'ml-flower',
        name: 'Jardin Secret',
        type: 'flower',
        description: 'Un decor floral romantique et poetique. Pivoines, roses et verdure composent un ecrin naturel pour vos photos.',
        images: [
          'https://placehold.co/mlf1/600/400',
          'https://placehold.co/mlf2/600/400'
        ],
        specs: ['Arche fleurie', 'Fleurs soie', 'Guirlandes lumineuses', 'Borne assortie'],
        options: ['unlimited-prints', 'props', 'custom-bg', 'online-gallery', 'social-share'],
        priceFrom: 680
      }
    ],
    gallery: [
      'https://placehold.co/mlg1/400/400',
      'https://placehold.co/mlg2/400/600',
      'https://placehold.co/mlg3/400/400',
      'https://placehold.co/mlg4/600/400',
      'https://placehold.co/mlg5/400/400',
      'https://placehold.co/mlg6/400/600',
      'https://placehold.co/mlg7/400/400'
    ],
    pricing: {
      formulas: [
        { name: 'Souvenir - 3h', price: 400, features: ['1 borne classique', 'Props vintage', 'Album'] },
        { name: 'Nostalgie - 4h', price: 580, features: ['Cabine Parisienne', 'Operateur', 'Tout inclus'] },
        { name: 'Eternite - 5h', price: 850, features: ['Decor complet', '2 photobooths', 'Livre d\'or'] }
      ],
      extras: [
        { name: 'Heure supplementaire', price: 115 },
        { name: 'Livre d\'or cuir', price: 90 },
        { name: 'Cadres photo vintage', price: 45 }
      ]
    },
    hours: {
      monday: '9h-18h',
      tuesday: '9h-18h',
      wednesday: '9h-18h',
      thursday: '9h-18h',
      friday: '9h-18h',
      saturday: '10h-14h',
      sunday: 'Ferme'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Isabelle F.',
        avatar: 'https://placehold.co/u12/100/100',
        date: '2024-11-05',
        eventType: 'Mariage',
        rating: 5,
        text: 'La Cabine Parisienne etait juste PARFAITE pour notre mariage annees folles ! Les photos sont sublimes, on se croirait dans un film d\'epoque. Merci Memory Lane !',
        reply: {
          author: 'Memory Lane',
          date: '2024-11-06',
          text: 'Merci infiniment Isabelle ! Votre mariage Gatsby etait absolument magique. Nous sommes ravis d\'avoir pu y contribuer. Tous nos voeux de bonheur !'
        }
      },
      {
        id: 'r2',
        author: 'Antoine R.',
        avatar: 'https://placehold.co/u13/100/100',
        date: '2024-10-22',
        eventType: 'Anniversaire',
        rating: 5,
        text: 'Le Jardin Secret a transforme la salle ! Ma femme a adore son cadeau d\'anniversaire. Service impeccable.',
        reply: null
      }
    ]
  }
];

// Villes francaises pour l'autocompletion
const CITIES = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
  'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Etienne',
  'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nimes', 'Villeurbanne', 'Le Mans',
  'Aix-en-Provence', 'Clermont-Ferrand', 'Brest', 'Limoges', 'Tours', 'Amiens',
  'Perpignan', 'Metz', 'Besancon', 'Orleans', 'Rouen', 'Mulhouse', 'Caen'
];

// FAQ Prestataires
const FAQ_PROVIDER = [
  {
    question: 'Comment fonctionne l\'inscription ?',
    answer: 'L\'inscription est simple et rapide. Remplissez le formulaire en 5 etapes, choisissez votre offre et validez. Votre profil sera visible immediatement apres verification de vos informations.'
  },
  {
    question: 'Quels sont les frais de commission ?',
    answer: 'Lokashopy ne prend aucune commission sur vos prestations. Vous payez uniquement l\'abonnement mensuel correspondant a votre offre. Tous les paiements de vos clients vous reviennent directement.'
  },
  {
    question: 'Puis-je modifier mon offre en cours de route ?',
    answer: 'Oui, vous pouvez upgrader ou downgrader votre offre a tout moment depuis votre espace prestataire. Le changement prendra effet a la prochaine periode de facturation.'
  },
  {
    question: 'Comment sont generes les contacts ?',
    answer: 'Les clients vous contactent directement via notre formulaire de devis. Vous recevez leurs coordonnees et leur demande par email et dans votre tableau de bord.'
  },
  {
    question: 'Le badge "Verifie" est-il important ?',
    answer: 'Le badge "Verifie" augmente significativement votre taux de conversion. Il atteste que votre entreprise a ete verifiee (SIRET, assurance, portfolio) et inspire confiance aux clients.'
  },
  {
    question: 'Puis-je annuler mon abonnement ?',
    answer: 'Vous pouvez annuler votre abonnement a tout moment. L\'annulation prendra effet a la fin de la periode en cours et vous conserverez l\'acces jusqu\'a cette date.'
  }
];

// Temoignages clients (page d'accueil)
const TESTIMONIALS = [
  {
    id: 1,
    author: 'Camille & Thomas',
    avatar: 'https://placehold.co/t1/100/100',
    rating: 5,
    text: 'Grace a Lokashopy, nous avons trouve le prestataire parfait pour notre mariage en moins d\'une heure ! Le photobooth miroir a fait un carton aupres de nos invites.',
    eventType: 'Mariage'
  },
  {
    id: 2,
    author: 'Marie D.',
    avatar: 'https://placehold.co/t2/100/100',
    rating: 5,
    text: 'Site super pratique pour comparer les offres. J\'ai pu filtrer par budget et lire les avis. Notre soiree d\'entreprise etait un succes !',
    eventType: 'Entreprise'
  },
  {
    id: 3,
    author: 'Lucas M.',
    avatar: 'https://placehold.co/t3/100/100',
    rating: 5,
    text: 'Le 360 booth pour l\'anniversaire de ma femme etait genial ! Tous les invites en parlent encore. Merci Lokashopy !',
    eventType: 'Anniversaire'
  }
];

// Temoignages prestataires (page inscription)
const PROVIDER_TESTIMONIALS = [
  {
    id: 1,
    author: 'Jean-Marc',
    company: 'Flash Party',
    avatar: 'https://placehold.co/pt1/100/100',
    quote: 'Depuis notre inscription sur Lokashopy, nous avons double notre nombre de demandes. La plateforme nous amene des clients qualifies qui savent ce qu\'ils veulent.'
  },
  {
    id: 2,
    author: 'Sophie',
    company: 'Smile Box Events',
    avatar: 'https://placehold.co/pt2/100/100',
    quote: 'Le tableau de bord est tres pratique pour gerer nos demandes. Et le badge verifie nous a vraiment aide a gagner en credibilite.'
  }
];

// Exporter les donnees
window.DATA = {
  BOOTH_TYPES,
  EVENT_TYPES,
  OPTIONS,
  PROVIDERS,
  CITIES,
  FAQ_PROVIDER,
  TESTIMONIALS,
  PROVIDER_TESTIMONIALS
};
