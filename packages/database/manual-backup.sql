-- Sauvegarde manuelle des données importantes
-- Exécuter ces requêtes avant la migration

-- 1. Sauvegarder les utilisateurs
COPY (SELECT * FROM "Utilisateur") TO 'C:\Users\DELL\Desktop\health\packages\database\backup-2025-09-29\utilisateurs.csv' WITH CSV HEADER;

-- 2. Sauvegarder les hôpitaux
COPY (SELECT * FROM "Hopital") TO 'C:\Users\DELL\Desktop\health\packages\database\backup-2025-09-29\hopitaux.csv' WITH CSV HEADER;

-- 3. Sauvegarder les spécialités
COPY (SELECT * FROM "Specialite") TO 'C:\Users\DELL\Desktop\health\packages\database\backup-2025-09-29\specialites.csv' WITH CSV HEADER;

-- 4. Sauvegarder les médecins
COPY (SELECT * FROM "Medecin") TO 'C:\Users\DELL\Desktop\health\packages\database\backup-2025-09-29\medecins.csv' WITH CSV HEADER;

-- 5. Sauvegarder les patients
COPY (SELECT * FROM "Patient") TO 'C:\Users\DELL\Desktop\health\packages\database\backup-2025-09-29\patients.csv' WITH CSV HEADER;

-- 6. Sauvegarder les relations utilisateur-hôpital
COPY (SELECT * FROM "UtilisateurHopital") TO 'C:\Users\DELL\Desktop\health\packages\database\backup-2025-09-29\utilisateur_hopitals.csv' WITH CSV HEADER;

-- 7. Sauvegarder les rendez-vous
COPY (SELECT * FROM "RendezVous") TO 'C:\Users\DELL\Desktop\health\packages\database\backup-2025-09-29\rendez_vous.csv' WITH CSV HEADER;
