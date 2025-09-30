import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { getUserInfo } from "@/services/users";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const requestUrl = new URL(request.url);
  const redirectTo = request.nextUrl.clone();

  redirectTo.searchParams.delete("code");
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  const supabase = await createClient();
  let session = null;
  let error = null;

  if (code) {
    ({ data: { session }, error } = await supabase.auth.exchangeCodeForSession(code));
  } else if (token_hash && type) {
    ({ data: { session }, error } = await supabase.auth.verifyOtp({ type, token_hash }));
  }

  if (error) {
    console.error("Erreur d'authentification:", error.message);
    return NextResponse.redirect(new URL("/login", requestUrl.origin));
  }

  if (session) {
    await supabase.auth.refreshSession({ refresh_token: session.refresh_token });
  }

    const user = await getUserInfo()

    // if (user ) {
    //     return NextResponse.redirect(new URL("/login", requestUrl.origin));
    // }

    return NextResponse.redirect(new URL("/login", requestUrl.origin));

//   if (user) {
//     const userFunction = user.user_metadata?.function;
//     const userRole = user.user_metadata?.role;
//     const orgSlug = user.user_metadata?.orgSlug;
//     const newUser = user.user_metadata?.status === "PENDING";
//     const hasOrg = Boolean(user.user_metadata?.orgId);
//     const invitationToken = user.user_metadata?.invitationToken;

//     // Check for invitation token and redirect to welcome/token page
//     if (invitationToken) {
//       return NextResponse.redirect(new URL(`/welcome/token?token=${invitationToken}`, requestUrl.origin));
//     }

//     if (userFunction === "SUPER_ADMIN" && !hasOrg) {
//       return NextResponse.redirect(new URL("/auth/org-setup", requestUrl.origin));
//     }

//     if (userRole === "ADMIN") {
//       return NextResponse.redirect(new URL(hasOrg ? "/admin" : "/auth/org-setup", requestUrl.origin));
//     }

//     if (userRole === "TEACHER" && newUser && orgSlug) {
//       return NextResponse.redirect(new URL(`/setting/welcome?org=${orgSlug}`, requestUrl.origin));
//     }

//     return NextResponse.redirect(new URL("/auth/setup-role", requestUrl.origin));
//   }


}