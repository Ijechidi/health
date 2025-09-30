# 🛡️ Guide de Migration Sécurisée

## ⚠️ IMPORTANT : Sauvegarde Créée
- ✅ **Sauvegarde des fichiers** : `backup-2025-09-29/`
- ✅ **Schéma Prisma** sauvegardé
- ✅ **Migrations** sauvegardées
- ✅ **Fichier .env** sauvegardé

## 🎯 Objectif de la Migration
Ajouter le champ `statutApproval` au modèle `Medecin` avec valeur par défaut `EN_ATTENTE`.

## 📋 Étapes de Migration

### 1. Vérifier la Connexion
```bash
npx prisma db pull
```

### 2. Appliquer la Migration
```bash
npx prisma migrate dev --name add-medecin-approval-status
```

### 3. Vérifier les Données
```bash
npx prisma studio
```

## 🔍 Vérifications Post-Migration

### ✅ Vérifier que :
1. **Tous les médecins existants** ont `statutApproval = 'EN_ATTENTE'`
2. **Aucune donnée perdue** dans les autres tables
3. **Les relations** sont préservées
4. **Les APIs** fonctionnent correctement

## 🚨 En Cas de Problème

### Restauration :
1. Copier les fichiers depuis `backup-2025-09-29/`
2. Exécuter `npx prisma migrate reset`
3. Réappliquer les migrations

## 📊 Impact de la Migration
- ✅ **Aucune perte de données** (champ avec valeur par défaut)
- ✅ **Rétrocompatible** (anciens médecins = EN_ATTENTE)
- ✅ **Sécurisé** (pas de suppression de données)

## 🎉 Après Migration
- Tester le workflow médecin complet
- Vérifier les APIs d'approbation
- Tester l'interface admin
