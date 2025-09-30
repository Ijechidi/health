-- Restauration directe des données
-- Ce script restaure les données de base dans la base de données

-- 1. Spécialités
INSERT INTO "Specialite" (id, nom, description) VALUES 
('spec-1', 'Cardiologie', 'Spécialité médicale du cœur et des vaisseaux'),
('spec-2', 'Neurologie', 'Spécialité médicale du système nerveux'),
('spec-3', 'Pédiatrie', 'Spécialité médicale des enfants'),
('spec-4', 'Gynécologie', 'Spécialité médicale de la femme'),
('spec-5', 'Dermatologie', 'Spécialité médicale de la peau')
ON CONFLICT (id) DO NOTHING;

-- 2. Hôpitaux
INSERT INTO "Hopital" (id, nom, slug, adresse, description, contact, localisation) VALUES 
('hosp-1', 'CHU de Lomé', 'chu-lome', 'Boulevard du 13 Janvier, Lomé', 'Centre Hospitalier Universitaire de Lomé', '+228 22 21 20 19', 'Lomé, Togo'),
('hosp-2', 'Hôpital de Kara', 'hopital-kara', 'Avenue de la République, Kara', 'Hôpital régional de Kara', '+228 26 60 00 00', 'Kara, Togo'),
('hosp-3', 'Hôpital de Sokodé', 'hopital-sokode', 'Rue de la Paix, Sokodé', 'Hôpital régional de Sokodé', '+228 25 50 00 00', 'Sokodé, Togo')
ON CONFLICT (id) DO NOTHING;

-- 3. Utilisateurs
INSERT INTO "Utilisateur" (id, nom, prenom, email, telephone, "dateCreation", status) VALUES 
('user-1', 'Doe', 'John', 'john.doe@example.com', '+228 90 12 34 56', NOW(), 'ACTIF'),
('user-2', 'Smith', 'Jane', 'jane.smith@example.com', '+228 90 12 34 57', NOW(), 'ACTIF'),
('user-3', 'Admin', 'Super', 'admin@example.com', '+228 90 12 34 58', NOW(), 'ACTIF'),
('user-4', 'Patient', 'Test', 'patient@example.com', '+228 90 12 34 59', NOW(), 'ACTIF')
ON CONFLICT (id) DO NOTHING;

-- 4. Médecins
INSERT INTO "Medecin" (id, "specialiteId", "numLicence", "anneeExperience", titre, "userId", "statutApproval") VALUES 
('med-1', 'spec-1', 'MED001', 5, 'Dr', 'user-1', 'APPROUVE'),
('med-2', 'spec-2', 'MED002', 3, 'Dr', 'user-2', 'EN_ATTENTE'),
('med-3', 'spec-3', 'MED003', 8, 'Pr', 'user-3', 'APPROUVE')
ON CONFLICT (id) DO NOTHING;

-- 5. Patients
INSERT INTO "Patient" (id, "userId") VALUES 
('pat-1', 'user-4')
ON CONFLICT (id) DO NOTHING;

-- 6. Relations utilisateur-hôpital
INSERT INTO "UtilisateurHopital" (id, "utilisateurId", "hopitalId", role, "dateDebut") VALUES 
('rel-1', 'user-1', 'hosp-1', 'MEDECIN', NOW()),
('rel-2', 'user-2', 'hosp-2', 'MEDECIN', NOW()),
('rel-3', 'user-3', 'hosp-1', 'MEDECIN', NOW())
ON CONFLICT (id) DO NOTHING;

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
