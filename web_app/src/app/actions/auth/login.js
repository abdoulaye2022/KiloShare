"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

export async function login_user(email, password) {
  try {
    const response = await axios.post(
      "/api/v1/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response) {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(Date.now() + offset * 60 * 1000 + 60 * 60 * 1000);
      
      cookies().set({
        name: process.env.NEXT_PUBLIC_COOKIE_NAME,
        value: response.data.access_token,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60
      });

      cookies().set({
        name: process.env.NEXT_PUBLIC_ROLE,
        value: response.data.data.profile_id,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60,
      });

      return response.data;
    } else {
      throw new Error(
        JSON.stringify({ status: 400, message: "No data received" })
      );
    }
  } catch (error) {
    if (error.response) {
      const status = error.status || error.response.status;
      const message =
        error.response.data.message ||
        {
          400: "Invalid email or password. Please check your credentials and try again.",
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
