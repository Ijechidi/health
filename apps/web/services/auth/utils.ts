import { getUserInfo } from "../users";

export async function getOrganization() {
  const user = await getUserInfo()


  if (!user) return null;

  return {
    orgName: user?.organization?.name || null,
    orgId: user?.organization?.id || null,
    role: user?.role || null,
  };
}



export async function getOrgId() {
  const user = await getUserInfo()

  if (!user) return null;

  return user?.organization?.id || null;
}


export async function isSuperAdmin() {
  const user = await getUserInfo()

  if (!user) return null;

  return (
    user.email === process.env.SUPER_ADMIN_EMAIL ||
    user.function === "SUPER_ADMIN"
  );
}

