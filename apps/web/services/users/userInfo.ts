// src/services/users/getUserInfo.ts 
"use server"
import { createClient } from "@/utils/supabase/server"
import type { UserInfo } from "@/types/user"
import { jwtDecode } from "jwt-decode"
import { getUser, setUser } from "./lru-cache"


export async function getUserInfo(): Promise<Partial<UserInfo> | null> {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) return null

  const token: any = jwtDecode(session.access_token)
  const userId = token.sub

  // Check cache
  const cached = getUser(userId)
  if (cached) return cached

  // Build user info (ton code existant)
  const userMetadata = token.user_metadata || {}
  const userInfo: Partial<UserInfo> = {
    id: userId,
    email: token.email || null,
    role: userMetadata.role || "GUEST",
    name: userMetadata.name || token.email?.split("@")[0] || "",
    avatar_url: userMetadata.avatar_url || "/avatar.png",
    function: userMetadata.function || "GUEST",
    organization: userMetadata.organization || null,
    organizations: userMetadata.organizations || [],
    invited_by: userMetadata.invited_by || null,
    status: userMetadata.status || null,
    invitationToken: userMetadata.invitationToken || null,
    invitationType: userMetadata.invitationType || null,
  }

  // Store in cache
  setUser(userId, userInfo)
  return userInfo
}

// Usage simple dans tes API:
/*
import { removeUser, removeUsersByOrg } from '@/lib/userCache'

// Invalider un user
removeUser('user-123')

// Invalider une org complète
removeUsersByOrg('acme-corp')
*/