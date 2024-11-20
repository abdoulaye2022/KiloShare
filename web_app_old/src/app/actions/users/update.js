"use server";

import axios from "../../utils/axiosConfig";
import { cookies } from "next/headers";

const cookieStore = cookies();

const jwtToken = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value;

export async function next_update_user(
  id,
  firstname,
  lastname,
  email,
  profile_id
) {
  try {
    const response = await axios.put(
      `/api/v1/users/update/${id}`,
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        profile_id: profile_id,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response from the server.");
    }
  }
}
