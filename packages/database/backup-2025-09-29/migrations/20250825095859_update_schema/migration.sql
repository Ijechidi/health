-- CreateEnum
CREATE TYPE "Role" AS ENUM ('patient', 'medecin', 'admin');

-- CreateEnum
CREATE TYPE "FonctionAdmin" AS ENUM ('gestionnaire', 'super_admin');

-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('Homme', 'Femme', 'Autre');

-- CreateEnum
CREATE TYPE "GroupeSanguin" AS ENUM ('A_POSITIF', 'A_NEGATIF', 'B_POSITIF', 'B_NEGATIF', 'AB_POSITIF', 'AB_NEGATIF', 'O_POSITIF', 'O_NEGATIF', 'INCONNU');

-- CreateEnum
CREATE TYPE "StatutRendezVous" AS ENUM ('CONFIRME', 'ANNULE', 'EN_ATTENTE', 'TERMINE');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motDePasse" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrateur" (
    "id" TEXT NOT NULL,
    "fonction" "FonctionAdmin" NOT NULL DEFAULT 'gestionnaire',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Administrateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "adresse" TEXT,
    "groupeSanguin" "GroupeSanguin" NOT NULL DEFAULT 'INCONNU',
    "poids" DOUBLE PRECISION,
    "taille" DOUBLE PRECISION,
    "sexe" "Sexe" NOT NULL DEFAULT 'Homme',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medecin" (
    "id" TEXT NOT NULL,
    "specialiteId" TEXT NOT NULL,
    "numLicence" TEXT NOT NULL,
    "anneeExperience" INTEGER,
    "titre" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Medecin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "heure" TEXT NOT NULL,
    "statut" "StatutRendezVous" NOT NULL DEFAULT 'EN_ATTENTE',
    "utilisateurId" TEXT NOT NULL,
    "medecinId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hopital" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "description" TEXT,
    "contact" TEXT NOT NULL,
    "localisation" TEXT,

    CONSTRAINT "Hopital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialite" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Specialite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommandation" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "medecinId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommandation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilisateurHopital" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "hopitalId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFin" TIMESTAMP(3),

    CONSTRAINT "UtilisateurHopital_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrateur_userId_key" ON "Administrateur"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_numLicence_key" ON "Medecin"("numLicence");

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_userId_key" ON "Medecin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UtilisateurHopital_utilisateurId_hopitalId_role_key" ON "UtilisateurHopital"("utilisateurId", "hopitalId", "role");

-- AddForeignKey
ALTER TABLE "Administrateur" ADD CONSTRAINT "Administrateur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medecin" ADD CONSTRAINT "Medecin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medecin" ADD CONSTRAINT "Medecin_specialiteId_fkey" FOREIGN KEY ("specialiteId") REFERENCES "Specialite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommandation" ADD CONSTRAINT "Recommandation_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilisateurHopital" ADD CONSTRAINT "UtilisateurHopital_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilisateurHopital" ADD CONSTRAINT "UtilisateurHopital_hopitalId_fkey" FOREIGN KEY ("hopitalId") REFERENCES "Hopital"("id") ON DELETE CASCADE ON UPDATE CASCADE;
