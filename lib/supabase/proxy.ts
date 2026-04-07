import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import {
  canAccessAdminPath,
  getAdminHomePath,
  isAdminPublicPath,
} from "@/lib/auth/roles";
import { getAdminProfileByUserId, toAdminViewer } from "@/lib/auth/viewer";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export async function updateAdminSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const { publishableKey, url } = getSupabasePublicEnv();

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, options, value }) => {
          response.cookies.set(name, value, options);
        });

        Object.entries(headers).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      },
    },
  });

  const pathname = request.nextUrl.pathname;
  const loginUrl = new URL("/admin/login", request.url);
  const forbiddenUrl = new URL("/admin/forbidden", request.url);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isAdminPublicPath(pathname)) {
      return response;
    }

    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const profile = await getAdminProfileByUserId(supabase, user.id);
  const viewer = toAdminViewer(user, profile);

  if (!viewer) {
    if (pathname === "/admin/forbidden") {
      return response;
    }

    forbiddenUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(forbiddenUrl);
  }

  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL(getAdminHomePath(viewer.role), request.url));
  }

  if (isAdminPublicPath(pathname)) {
    return response;
  }

  if (!canAccessAdminPath(viewer.role, pathname)) {
    forbiddenUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(forbiddenUrl);
  }

  return response;
}
