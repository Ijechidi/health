# Composants du Dashboard Patient et Médecin

Ce dossier contient tous les composants réutilisables pour les tableaux de bord patient et médecin, organisés de manière modulaire pour une meilleure maintenabilité et réutilisabilité.

## Structure des composants

### 📁 `dashboard/` (Patient)
Composants spécifiques au tableau de bord patient :

- **`DashboardHeader.tsx`** - En-tête avec titre et bouton de prise de RDV
- **`StatsSection.tsx`** - Section des cartes de statistiques
- **`StatsCard.tsx`** - Carte individuelle de statistique
- **`PatientProfileCard.tsx`** - Affichage du profil patient
- **`AppointmentsList.tsx`** - Liste des rendez-vous avec filtres
- **`DocumentsList.tsx`** - Liste des documents médicaux

### 📁 `doctor/` (Médecin)
Composants spécifiques au tableau de bord médecin :

- **`DoctorDashboardHeader.tsx`** - En-tête avec actions spécifiques au médecin
- **`DoctorStatsSection.tsx`** - Section des statistiques médicales
- **`index.ts`** - Export des composants

### 📁 `appointment/`
Composants pour la gestion des rendez-vous :

- **`AppointmentModal.tsx`** - Modal élégant pour la prise de RDV

## Avantages de cette architecture

### 🎨 **Amélioration du visuel**
- Utilisation d'un modal classique centré avec overlay
- Icônes Lucide pour une meilleure cohérence visuelle
- Animations et transitions fluides
- Design system cohérent avec shadcn/ui

### 🔧 **Modularité**
- Chaque composant a une responsabilité unique
- Props typées avec TypeScript
- Réutilisables dans d'autres parties de l'application
- Tests unitaires facilités

### 📱 **Responsive Design**
- Adaptation automatique aux différentes tailles d'écran
- Grilles flexibles et adaptatives
- Composants qui s'ajustent au contenu

### ♿ **Accessibilité**
- Utilisation des composants Radix UI (Select, etc.)
- Navigation au clavier
- Labels et descriptions appropriés
- Support des lecteurs d'écran

## Utilisation

### Composants Patient
```tsx
import { 
  DashboardHeader,
  StatsSection,
  PatientProfileCard,
  AppointmentsList,
  DocumentsList 
} from "../components/dashboard";

// Dans votre composant
<DashboardHeader 
  onNewAppointment={() => setModalOpen(true)}
  patientName="John Doe"
/>

<StatsSection 
  appointments={appointments}
  documents={documents}
  doctorsCount={3}
/>
```

### Composants Médecin
```tsx
import { 
  DoctorDashboardHeader,
  DoctorStatsSection
} from "../components/doctor";

// Dans votre composant
<DoctorDashboardHeader 
  doctorName="Dr. Martin"
  specialty="Cardiologie"
  onNewPatient={() => setModalOpen(true)}
  onViewSchedule={() => navigateToSchedule()}
/>
```

## Personnalisation

Chaque composant accepte des props pour la personnalisation :
- Couleurs et thèmes via les classes CSS
- Contenu dynamique via les props
- Callbacks pour les interactions
- Variantes de style (outline, ghost, etc.)

## Maintenance

- **Ajout de fonctionnalités** : Créez de nouveaux composants ou étendez les existants
- **Modifications de style** : Utilisez les classes Tailwind CSS
- **Tests** : Chaque composant peut être testé indépendamment
- **Documentation** : Mettez à jour ce README lors des modifications
