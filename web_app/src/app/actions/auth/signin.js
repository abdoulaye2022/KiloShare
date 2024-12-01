"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

export async function signin_user(firstname, lastname, email, password) {
  try {
    const response = await axios.post(
      "/api/v1/signin",
      {
        firstname: firstname,
        lastname: lastname,
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
      cookies().set({
        name: process.env.NEXT_PUBLIC_COOKIE_NAME,
        value: response.data.access_token,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
      });

      return response.data;
    } else {
      throw new Error("No data received");
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            "Bad Request: The server could not understand the request."
          );
        case 401:
          throw new Error(
            "Unauthorized: Authentication is required or has failed."
          );
        case 403:
          throw new Error(
            "Forbidden: You do not have permission to access this resource."
          );
        case 404:
          throw new Error(
            "Not Found: The requested resource could not be found."
          );
        case 500:
          throw new Error(
            "Internal Server Error: An error occurred on the server."
          );
        default:
          throw new Error(
            error.response.data.message || "An error occurred with the request."
          );
      }
    } else if (error.request) {
      throw new Error(
        "No response from the server. Please check the server or your internet connection."
      );
    } else {
      throw new Error("An unexpected error occurred: " + error.message);
    }
  }
}
