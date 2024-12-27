import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("jwt")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  const protectedPaths = ["/post-ad", "/dashboard", "/my-profil", "/my-ads", "/ads/[id]/[slug]/edit"];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/dashboard")) {
      if (role !== "1") {
        return NextResponse.redirect(new URL("/not-found", request.url));
      }
    }
  } else if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/post-ad",
    "/dashboard/:path*",
    "/my-profil",
    "/my-ads",
    "/ads/[id]/[slug]/edit",
  ],
};
