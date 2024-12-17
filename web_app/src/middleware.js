import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("jwt")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  // Pages nécessitant une authentification
  const protectedPaths = ["/post-ad", "/dashboard", "/my-profil", "/my-ads"];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath) {
    if (!token) {
      // Si pas de token, rediriger vers la page d'accueil
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/dashboard")) {
      // Vérifier si l'utilisateur a le rôle 1 pour accéder au dashboard
      if (role !== "1") {
        // Si le rôle n'est pas 1, rediriger vers la page d'accès interdit
        return NextResponse.redirect(new URL("/not-found", request.url));
      }
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
    "/my-profil",
    "/my-ads"
  ],
};
