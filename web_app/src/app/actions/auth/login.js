"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

export async function login(phone, password) {
  try {
    const response = await axios.post(
      "/api/v1/login",
      {
        phone: phone,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    cookies().set({
        name: "jwt",
        value: response.data.access_token,
        httpOnly: true, // Protège contre XSS
        secure: true, // Assure que le cookie est envoyé uniquement via HTTPS
        sameSite: "Strict", // Protège contre les attaques CSRF
        path: "/", // Le cookie est disponible pour l'ensemble de l'application
        maxAge: 60 * 60 * 24 * 365, // Durée de vie : 1 an
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000), // Expire dans 1 an
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response from the server.");
    }
  }
}
