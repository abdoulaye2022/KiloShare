import { NextResponse } from "next/server";

// Middleware pour vérifier la présence du cookie "jwt"
export function middleware(request) {
  // Récupérer le cookie nommé "jwt"
  const token = request.cookies.get("jwt")?.value;

  // Vérifier si le cookie "jwt" est présent
  if (token == undefined) {
    // Rediriger vers la page d'accueil si le cookie est absent
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Passer la requête si le cookie est présent
  //   return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    //   '/((?!api|static|favicon.ico).*)',
  ],
};
