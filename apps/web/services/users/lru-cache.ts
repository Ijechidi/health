// src/services/users/lru-cache.ts
/**
 * Cache LRU pour les informations utilisateur
 * 
 * Ce module utilise le package 'lru-cache' pour stocker temporairement
 * les données utilisateur et éviter les appels répétés à Supabase.
 * 
 * Performance:
 * - Lecture O(1) - ultra-rapide
 * - Éviction automatique des utilisateurs les moins utilisés
 * - TTL de 10 minutes par défaut
 * 
 * Configuration:
 * - max: 1000 utilisateurs maximum en cache
 * - ttl: 10 minutes de durée de vie
 * 
 * @example
 * ```typescript
 * // Récupérer un utilisateur du cache
 * const user = getUser('user-123')
 * 
 * // Stocker un utilisateur
 * setUser('user-123', { name: 'John', role: 'ADMIN' })
 * 
 * // Invalider un utilisateur
 * removeUser('user-123')
 * ```
 */

import { LRUCache } from 'lru-cache'
import type { UserInfo } from '@/types/user'

/**
 * Instance du cache LRU configurée pour les utilisateurs
 * 
 * Configuration:
 * - max: 1000 - Nombre maximum d'utilisateurs en cache
 * - ttl: 600000ms (10 minutes) - Durée de vie des entrées
 */
const cache = new LRUCache<string, Partial<UserInfo>>({
  max: 1000,              // Limite: 1000 utilisateurs max
  ttl: 10 * 60 * 1000,    // TTL: 10 minutes en millisecondes
})

/**
 * Récupère les informations d'un utilisateur depuis le cache
 * 
 * @param userId - ID unique de l'utilisateur (token.sub)
 * @returns Les infos utilisateur si trouvées, null sinon
 * 
 * @example
 * ```typescript
 * const userInfo = getUser('auth0|123456')
 * if (userInfo) {
 *   console.log(`Utilisateur: ${userInfo.name}`)
 * }
 * ```
 */
export function getUser(userId: string): Partial<UserInfo> | null {
  return cache.get(userId) || null
}

/**
 * Stocke les informations d'un utilisateur en cache
 * 
 * @param userId - ID unique de l'utilisateur
 * @param userInfo - Données utilisateur à mettre en cache
 * 
 * @example
 * ```typescript
 * setUser('auth0|123456', {
 *   id: 'auth0|123456',
 *   name: 'Captain Gigi',
 *   role: 'ADMIN',
 *   organization: { slug: 'havard-corp' }
 * })
 * ```
 */
export function setUser(userId: string, userInfo: Partial<UserInfo>): void {
  cache.set(userId, userInfo)
}

/**
 * Supprime un utilisateur spécifique du cache
 * 
 * Utile après:
 * - Mise à jour des données utilisateur
 * - Changement de rôle
 * - Déconnexion
 * 
 * @param userId - ID de l'utilisateur à supprimer
 * @returns true si supprimé, false si n'existait pas
 * 
 * @example
 * ```typescript
 * // Après mise à jour utilisateur en base
 * const deleted = removeUser('auth0|123456')
 * console.log(`Utilisateur invalidé: ${deleted}`)
 * ```
 */
export function removeUser(userId: string): boolean {
  return cache.delete(userId)
}

/**
 * Vide complètement le cache
 * 
 * À utiliser avec précaution ! Supprime TOUS les utilisateurs du cache.
 * Utile pour:
 * - Maintenance
 * - Déploiements
 * - Reset complet
 * 
 * @example
 * ```typescript
 * // Nettoyage complet
 * clearCache()
 * console.log('Cache vidé complètement')
 * ```
 */
export function clearCache(): void {
  cache.clear()
}

/**
 * Supprime tous les utilisateurs d'une organisation donnée
 * 
 * Utile quand:
 * - L'organisation change de configuration
 * - Mise à jour des permissions d'organisation
 * - Changement de slug d'organisation
 * 
 * @param orgSlug - Slug de l'organisation (ex: 'acme-corp')
 * @returns Nombre d'utilisateurs supprimés du cache
 * 
 * @example
 * ```typescript
 * // Après mise à jour de l'organisation 'acme-corp'
 * const deleted = removeUsersByOrg('acme-corp')
 * console.log(`${deleted} utilisateurs invalidés pour acme-corp`)
 * ```
 */
export function removeUsersByOrg(orgSlug: string): number {
  let deleted = 0
  
  // Parcourir toutes les entrées du cache
  for (const [userId, userInfo] of cache.entries()) {
    // Si l'utilisateur appartient à cette organisation
    if (userInfo.organization?.slug === orgSlug) {
      cache.delete(userId)
      deleted++
    }
  }
  
  return deleted
}

/**
 * Retourne les statistiques actuelles du cache
 * 
 * Utile pour:
 * - Monitoring de performance
 * - Debug et développement
 * - Métriques d'utilisation
 * 
 * @returns Objet avec les statistiques du cache
 * @returns {number} size - Nombre d'utilisateurs actuellement en cache
 * @returns {number} maxSize - Limite maximum configurée
 * 
 * @example
 * ```typescript
 * const stats = getCacheStats()
 * console.log(`Cache: ${stats.size}/${stats.maxSize} utilisateurs`)
 * 
 * // Vérifier si le cache est bien utilisé
 * if (stats.size > stats.maxSize * 0.8) {
 *   console.log('Cache bien rempli, bon signe!')
 * }
 * ```
 */
export function getCacheStats() {
  return {
    size: cache.size,      // Nombre actuel d'entrées
    maxSize: cache.max     // Limite configurée (1000)
  }
}

/* 


// Dans ton middleware (aucun changement)
const userInfo = await getUserInfo()

// Dans tes API routes pour invalider
import { CacheInvalidation } from '@/lib/cache/invalidation'

// Après mise à jour utilisateur
CacheInvalidation.onUserUpdate(userId)

// Après changement d'organisation  
CacheInvalidation.onOrganizationChange('acme-corp')

// Stats pour monitoring
console.log(userCache.getStats())
// { size: 245, hits: 1520, misses: 89, hitRate: '94.47%' }



// Invalider un user après update
removeUser('user-123')

// Voir les stats si besoin
console.log(getCacheStats()) // { size: 245, maxSize: 1000 }

console.log(getCacheStats())
// Output: { size: 245, maxSize: 1000 }

const stats = getCacheStats()
if (stats.size / stats.maxSize > 0.8) {
  console.log('Cache à 80% de capacité')
}



*/