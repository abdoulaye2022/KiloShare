"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

export async function getAllProfile() {
  try {
    const cookieStore = cookies();

    const jwtToken = cookieStore.get(
      process.env.NEXT_PUBLIC_COOKIE_NAME
    )?.value;
    const response = await axios.get("/api/v1/profiles/getAll", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
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
