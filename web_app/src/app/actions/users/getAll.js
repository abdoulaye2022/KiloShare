"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

const cookieStore = cookies();

// console.log("date expiration : " + cookieStore.expires)

// Get Cookie
const jwtToken = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value;

export async function getAll() {
  try {
    const response = await axios.get("/api/v1/users/getAll", {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Ajout de l'en-tête Authorization avec le JWT
      },
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