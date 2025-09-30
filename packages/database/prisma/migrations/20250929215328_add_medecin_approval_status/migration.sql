-- CreateEnum
CREATE TYPE "StatusUtilisateur" AS ENUM ('ACTIF', 'INACTIF');

-- CreateEnum
CREATE TYPE "StatutApproval" AS ENUM ('EN_ATTENTE', 'APPROUVE', 'REJETE');

-- AlterTable
ALTER TABLE "Medecin" ADD COLUMN     "statutApproval" "StatutApproval" NOT NULL DEFAULT 'EN_ATTENTE';

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "status" "StatusUtilisateur" NOT NULL DEFAULT 'ACTIF';
