"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

const cookieStore = cookies();

const jwtToken = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value;

export async function next_unsuspend_user(id) {
  try {
    const response = await axios.delete(`/api/v1/users/unsuspend/${id}`, {
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
