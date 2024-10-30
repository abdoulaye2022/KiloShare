import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setLanguage } from "./app/actions/others/setLanguage";

// Middleware pour vérifier la présence du cookie "jwt"
export function middleware(request) {
  // Récupérer le cookie nommé "jwt"
  const token = request.cookies.get("jwt")?.value

  if (request.nextUrl.pathname.startsWith('/login')) {
    if(token != undefined){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  // Vérifier si le cookie "jwt" est présent
  if (token == undefined) {
    // Rediriger vers la page d'accueil si le cookie est absent
    return NextResponse.redirect(new URL("/login", request.url));
  } 

  // Passer la requête si le cookie est présent
  //   return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    //   '/((?!api|static|favicon.ico).*)',
  ],
};
