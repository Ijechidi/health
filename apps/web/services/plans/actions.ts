// src/services/plans/actions.ts
'use server';


import  {prisma}  from '@/lib/prisma'; 

import { stripe } from '@/lib/stripe';
import { PLANS_CONFIG, PlanType } from './config';

/**
 * Crée un produit et ses prix sur Stripe et les enregistre en base de données
 * @param planType Le type de plan à créer (FREE, PRO, PREMIUM)
 * @returns Le plan créé avec ses prix
 */
export async function createStripePlan(planType: PlanType) {
  try {
    const planConfig = PLANS_CONFIG[planType];
    
    // 1. Créer le produit sur Stripe
    const stripeProduct = await stripe.products.create({
      name: planConfig.name,
      description: planConfig.description,
      metadata: planConfig.metadata,
    });

    // 2. Créer les prix associés sur Stripe
    const stripePrices = [];
    
    for (const priceConfig of planConfig.prices) {
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        currency: priceConfig.currency,
        unit_amount: priceConfig.unit_amount,
        recurring: priceConfig.type === 'recurring' ? {
          interval: priceConfig.interval as 'month' | 'year',
          interval_count: priceConfig.interval_count,
        } : undefined,
        metadata: planConfig.metadata,
      });
      
      stripePrices.push(stripePrice);
    }

    // 3. Enregistrer en base de données (schéma billing)
    const plan = await prisma.plan.create({
      data: {
        stripe_product_id: stripeProduct.id,
        name: planConfig.name,
        description: planConfig.description,
        status: 'active',
        metadata: planConfig.metadata,
        features: [...planConfig.features] ,
        max_users:planConfig.metadata.max_users ,
        max_storage: planConfig.metadata.max_storage ,
        max_courses: planConfig.metadata.max_courses ,
        max_rooms: planConfig.metadata.max_rooms ,
        prices: {
          create: stripePrices.map((stripePrice, index) => ({
            stripe_price_id: stripePrice.id,
            type: planConfig.prices[index].type,
            currency: planConfig.prices[index].currency,
            unit_amount: planConfig.prices[index].unit_amount,
            interval: planConfig.prices[index].interval || null,
            interval_count: planConfig.prices[index].interval_count || null,
            is_active: true,
            metadata: planConfig.metadata,
          })),
        },
      },
      include: {
        prices: true,
      },
    });

    return {
      success: true,
      message: `Plan ${planType} créé avec succès`,
      data: plan,
    };
  } catch (error) {
    console.error(`Erreur lors de la création du plan ${planType}:`, error);
    
    return {
      success: false,
      message: `Erreur lors de la création du plan ${planType}`,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

/**
 * Crée tous les plans (FREE, PRO, PREMIUM) sur Stripe et en base de données
 * @returns Résultat de la création de tous les plans
 */
export async function createAllStripePlans() {
  const results = [];
  
  for (const planType of Object.keys(PLANS_CONFIG) as PlanType[]) {
    const result = await createStripePlan(planType);
    results.push({
      plan: planType,
      ...result,
    });
  }
  
  return results;
}

/**
 * Vérifie si un plan existe déjà en base de données
 * @param planType Le type de plan à vérifier
 * @returns True si le plan existe, false sinon
 */
export async function checkPlanExists(planType: PlanType) {
  try {
    const planConfig = PLANS_CONFIG[planType];
    const existingPlan = await prisma.plan.findFirst({
      where: {
        name: planConfig.name,
      },
    });
    
    return !!existingPlan;
  } catch (error) {
    console.error('Erreur lors de la vérification du plan:', error);
    return false;
  }
}