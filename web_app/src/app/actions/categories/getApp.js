"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

export async function next_getAll_categories() {
  try {
    const cookieStore = cookies();

    const jwtToken = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value;
    
    if (!jwtToken) {
      throw new Error("JWT token is missing.");
    }

    const response = await axios.get("/api/v1/categories/getAll", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // If error.response exists, it means the server responded with an error
      return { message: error.response.data.message, status: error.response.data.status };
    } else if (error.request) {
      // If error.request exists, it means no response was received from the server
      throw new Error("No response from the server.");
    } else {
      // For any other errors (e.g., JWT token missing)
      throw new Error(error.message || "An unknown error occurred.");
    }
  }
}
