"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

export async function next_getAll_ads() {
  try {
    const cookieStore = cookies();

    const jwtToken = cookieStore.get(
      process.env.NEXT_PUBLIC_COOKIE_NAME
    )?.value;
    const response = await axios.get("/api/v1/announcements/getAll", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    console.log("Je suis dans le bon getAll action next");

    return response.data;
  } catch (error) {
    if (error.response) {
      return {status: error.response.data.status, message: error.response.data.message};
    } else if (error.request) {
      throw new Error("No response from the server.");
    }
  }
}
