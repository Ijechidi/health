// src/services/plant/config.ts
// Configuration des plans

export const PLANS_CONFIG = {
  FREE: {
    name: 'FREE',
    description: 'Plan de base avec fonctionnalités essentielles',
    metadata: {
      type: 'free',
      max_users: 10,
      max_storage: 50 * 1024 * 1024, // 50MB
      max_courses: 50,
      max_rooms: 20,
    },
    features: [
      '10 utilisateurs maximum',
      '50MB de stockage',
      '50 cours maximum',
      '20 salles maximum',
      'Support de base',
    ],
    prices: [
      {
        currency: 'xof',
        unit_amount: 0,
        type: 'recurring',
        interval: 'month',
        interval_count: 1,
      },
    ],
  },
  PRO: {
    name: 'PRO',
    description: 'Plan professionnel avec fonctionnalités avancées',
    metadata: {
      type: 'pro',
      max_users: 50,
      max_storage: 5 * 1024 * 1024 * 1024, // 5GB
      max_courses: 200,
      max_rooms: 100,
    },
    features: [
      '50 utilisateurs maximum',
      '5GB de stockage',
      '200 cours maximum',
      '100 salles maximum',
      'Support prioritaire',
      'Analyses avancées',
      'Intégrations personnalisées',
    ],
    prices: [
      {
        currency: 'xof',
        unit_amount: 30000, // 30 000 CFA/mois
        type: 'recurring',
        interval: 'month',
        interval_count: 1,
      },
      {
        currency: 'xof',
        unit_amount: 324000, // 10% de réduction sur l'année
        type: 'recurring',
        interval: 'year',
        interval_count: 1,
      },
    ],
  },
  PREMIUM: {
    name: 'PREMIUM',
    description: 'Plan enterprise avec toutes les fonctionnalités',
    metadata: {
      type: 'premium',
      max_users: 500,
      max_storage: 20 * 1024 * 1024 * 1024, // 20GB
      max_courses: 1000,
      max_rooms: 500,
    },
    features: [
      '500 utilisateurs maximum',
      '20GB de stockage',
      '1000 cours maximum',
      '500 salles maximum',
      'Support 24/7',
      'Analyses avancées',
      'Intégrations personnalisées',
      'Formation dédiée',
      'Personnalisation avancée',
    ],
    prices: [
      {
        currency: 'xof',
        unit_amount: 120000, // 120 000 CFA/mois
        type: 'recurring',
        interval: 'month',
        interval_count: 1,
      },
      {
        currency: 'xof',
        unit_amount: 1296000, // 10% de réduction sur l'année
        type: 'recurring',
        interval: 'year',
        interval_count: 1,
      },
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS_CONFIG;

  