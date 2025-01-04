"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

export async function getAllPaginate_ads(page, limit) {
    console.log("Mon erreur")
    console.log(page)
    console.log(limit)
  try {
    const cookieStore = cookies();

    const jwtToken = cookieStore.get(
      process.env.NEXT_PUBLIC_COOKIE_NAME
    )?.value;

    const response = await axios.get(`/api/v1/ads/getAll/${page}/${limit}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response) {
      return response.data;
    } else {
      throw new Error("No data received");
    }
  } catch (error) {
    if (error.response) {
      const status = error.status || error.response.status;
      const message =
        error.response.data.message ||
        {
          400: "Bad Request: The server could not understand the request.",
          401: "Unauthorized: Authentication is required or has failed.",
          403: "Forbidden: You do not have permission to access this resource.",
          404: "Not Found: The requested resource could not be found.",
          500: "Internal Server Error: An error occurred on the server.",
        }[status] ||
        "An error occurred with the request.";

      return { status, message };
    } else if (error.request) {
      throw {
        status: 503,
        message:
          "No response from the server. Please check the server or your internet connection.",
      };
    } else {
      return {
        status: 500,
        message: error.message || "An unexpected error occurred.",
      };
    }
  }
}
