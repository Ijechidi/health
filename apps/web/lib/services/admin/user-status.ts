import { prisma } from "@/lib/database/prisma";

export interface ToggleUserStatusData {
  userId: string;
  status: 'actif' | 'inactif';
}

/**
 * Active ou désactive un utilisateur
 */
export async function toggleUserStatus(data: ToggleUserStatusData): Promise<{ success: boolean; message: string }> {
  try {
    const { userId, status } = data;

    // Vérifier que l'utilisateur existe
    const user = await prisma.utilisateur.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { success: false, message: "Utilisateur non trouvé" };
    }

    // Mettre à jour le statut de l'utilisateur
    await prisma.utilisateur.update({
      where: { id: userId },
      data: { status: status.toUpperCase() as 'ACTIF' | 'INACTIF' }
    });

    console.log(`User ${user.email} status changed to: ${status}`);

    return { 
      success: true, 
      message: `Utilisateur ${status === 'actif' ? 'activé' : 'désactivé'} avec succès` 
    };
  } catch (error) {
    console.error('Error toggling user status:', error);
    return { success: false, message: "Erreur lors de la modification du statut" };
  }
}

/**
 * Récupère le statut d'un utilisateur
 */
export async function getUserStatus(userId: string): Promise<'actif' | 'inactif'> {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { id: userId },
      select: { status: true }
    });

    if (!user) {
      return 'actif';
    }

    return user.status === 'ACTIF' ? 'actif' : 'inactif';
  } catch (error) {
    console.error('Error getting user status:', error);
    return 'actif';
  }
}

/**
 * Active un utilisateur
 */
export async function activateUser(userId: string): Promise<{ success: boolean; message: string }> {
  return toggleUserStatus({ userId, status: 'actif' });
}

/**
 * Désactive un utilisateur
 */
export async function deactivateUser(userId: string): Promise<{ success: boolean; message: string }> {
  return toggleUserStatus({ userId, status: 'inactif' });
}
