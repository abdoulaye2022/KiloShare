import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("jwt")?.value;

  const { pathname } = request.nextUrl;

  // Pages nécessitant une authentification
  const protectedPaths = ["/post-ad", "/dashboard", "/my-profil"];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath) {
    if (!token) {
      // Si pas de token, rediriger vers la page d'accueil
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (pathname === "/") {
    // Si l'utilisateur est connecté, le rediriger vers le tableau de bord depuis la page d'accueil
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Autoriser l'accès si les conditions sont remplies
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/post-ad",
    "/dashboard/:path*",
    "/my-profil"
  ],
};
