# Pages de Connexion par Rôle

Ce dossier contient les pages de connexion spécifiques pour chaque type d'utilisateur du système de santé.

## Structure

### Page de Sélection (`/login`)
- **Fichier**: `apps/web/app/login/page.tsx`
- **Description**: Page d'accueil qui permet aux utilisateurs de choisir leur type de connexion
- **Thème**: Neutre avec design moderne
- **Options disponibles**:
  - Administrateur
  - Médecin  
  - Patient

### Page Admin (`/admin/login`)
- **Fichier**: `apps/web/app/admin/login/page.tsx`
- **Composant**: `AdminSignInForm`
- **Thème**: Violet/Purple avec effets de transparence
- **Redirection**: `/admin/dashboard`
- **Icône**: Shield (bouclier)

### Page Médecin (`/doctor/login`)
- **Fichier**: `apps/web/app/doctor/login/page.tsx`
- **Composant**: `DoctorSignInForm`
- **Thème**: Vert/Blanc avec design professionnel
- **Redirection**: `/doctor/dashboard`
- **Icône**: Stethoscope (stéthoscope)

### Page Patient (`/patient/login`)
- **Fichier**: `apps/web/app/patient/login/page.tsx`
- **Composant**: `PatientSignInForm`
- **Thème**: Vert/Émeraude avec design rassurant
- **Redirection**: `/patient/dashboard`
- **Icône**: Heart (cœur)

## Composants de Connexion

### AdminSignInForm
- Design avec effet glassmorphism
- Couleurs violet/purple
- Messages spécifiques aux administrateurs
- Validation côté client

### DoctorSignInForm
- Design professionnel et épuré
- Couleurs vert/blanc
- Placeholder spécifique aux emails professionnels
- Focus sur l'aspect médical

### PatientSignInForm
- Design rassurant et accessible
- Couleurs vert/émeraude
- Messages bienveillants
- Interface simplifiée

## Service de Connexion

Le service `login.ts` a été mis à jour pour :
- Détecter automatiquement le rôle de l'utilisateur via le token JWT
- Rediriger vers le dashboard approprié selon le rôle :
  - `ADMIN` → `/admin/dashboard`
  - `MEDECIN` → `/doctor/dashboard`
  - `PATIENT` → `/patient/dashboard`
  - Par défaut → `/hopital`

## Utilisation

1. **Accès général**: `/login` - Sélection du type de connexion
2. **Accès direct**: `/admin/login`, `/doctor/login`, `/patient/login`
3. **Redirection automatique** après connexion réussie selon le rôle

## Thèmes et Couleurs

### Admin (Violet/Purple)
- Background: `from-violet-900 via-purple-900 to-indigo-900`
- Accent: `from-violet-600 to-purple-600`
- Text: `text-white`

### Médecin (Vert/Blanc)
- Background: `from-green-50 via-white to-green-100`
- Accent: `from-green-600 to-emerald-600`
- Text: `text-green-800`

### Patient (Vert/Émeraude)
- Background: `from-green-50 via-white to-emerald-100`
- Accent: `from-emerald-600 to-green-600`
- Text: `text-green-800`

## Fonctionnalités

- ✅ Validation des champs requis
- ✅ Affichage des erreurs
- ✅ État de chargement
- ✅ Toggle pour afficher/masquer le mot de passe
- ✅ Case "Se souvenir de moi"
- ✅ Redirection automatique selon le rôle
- ✅ Design responsive
- ✅ Animations et transitions
- ✅ Accessibilité (labels, aria-labels)
