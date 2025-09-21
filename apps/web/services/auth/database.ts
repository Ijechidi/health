// src/services/auth/database.ts
import { prisma } from "@/lib/prisma";

export async function createOrgResponsableDB({
  id,
  firstName,
  lastName,
  email,
}: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}) {
  const responsable = await prisma.user.create({
    data: {
      id,
      firstName,
      lastName,
      email,
      status: "PENDING",
    },
  });

  return responsable;
}
