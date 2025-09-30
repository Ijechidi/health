-- Restauration des données de test
-- Exécuter ces requêtes pour remplir les tables

-- 1. Insérer des spécialités
INSERT INTO "Specialite" (id, nom, description) VALUES 
('spec-1', 'Cardiologie', 'Spécialité médicale du cœur et des vaisseaux'),
('spec-2', 'Neurologie', 'Spécialité médicale du système nerveux'),
('spec-3', 'Pédiatrie', 'Spécialité médicale des enfants');

-- 2. Insérer des hôpitaux
INSERT INTO "Hopital" (id, nom, slug, adresse, description, contact, localisation) VALUES 
('hosp-1', 'CHU de Lomé', 'chu-lome', 'Boulevard du 13 Janvier, Lomé', 'Centre Hospitalier Universitaire de Lomé', '+228 22 21 20 19', 'Lomé, Togo'),
('hosp-2', 'Hôpital de Kara', 'hopital-kara', 'Avenue de la République, Kara', 'Hôpital régional de Kara', '+228 26 60 00 00', 'Kara, Togo');

-- 3. Insérer des utilisateurs
INSERT INTO "Utilisateur" (id, nom, prenom, email, telephone, "dateCreation", status) VALUES 
('user-1', 'Doe', 'John', 'john.doe@example.com', '+228 90 12 34 56', NOW(), 'ACTIF'),
('user-2', 'Smith', 'Jane', 'jane.smith@example.com', '+228 90 12 34 57', NOW(), 'ACTIF'),
('user-3', 'Admin', 'Super', 'admin@example.com', '+228 90 12 34 58', NOW(), 'ACTIF');

-- 4. Insérer des médecins
INSERT INTO "Medecin" (id, "specialiteId", "numLicence", "anneeExperience", titre, "userId", "statutApproval") VALUES 
('med-1', 'spec-1', 'MED001', 5, 'Dr', 'user-1', 'APPROUVE'),
('med-2', 'spec-2', 'MED002', 3, 'Dr', 'user-2', 'EN_ATTENTE');

-- 5. Insérer des patients
INSERT INTO "Patient" (id, "userId") VALUES 
('pat-1', 'user-3');

-- 6. Insérer des relations utilisateur-hôpital
INSERT INTO "UtilisateurHopital" (id, "utilisateurId", "hopitalId", role, "dateDebut") VALUES 
('rel-1', 'user-1', 'hosp-1', 'MEDECIN', NOW()),
('rel-2', 'user-2', 'hosp-2', 'MEDECIN', NOW());

-- Vérifier les données
SELECT 'Spécialités' as table_name, COUNT(*) as count FROM "Specialite"
UNION ALL
SELECT 'Hôpitaux', COUNT(*) FROM "Hopital"
UNION ALL
SELECT 'Utilisateurs', COUNT(*) FROM "Utilisateur"
UNION ALL
SELECT 'Médecins', COUNT(*) FROM "Medecin"
UNION ALL
SELECT 'Patients', COUNT(*) FROM "Patient"
UNION ALL
SELECT 'Relations', COUNT(*) FROM "UtilisateurHopital";
