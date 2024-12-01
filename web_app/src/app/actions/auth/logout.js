"use server";

import { cookies } from "next/headers";

export const logout_user = () => {

  // Supprimer les cookies associés à l'authentification
  cookies().delete("jwt"); // Nom du cookie du jeton JWT ou autre cookie d'authentification

  // Rediriger vers la page de connexion ou d'accueil après la déconnexion
  return true;
};