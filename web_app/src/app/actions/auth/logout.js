"use server";

import { cookies } from "next/headers";

export async function logout_user () {
  cookies().delete("jwt");
  cookies().delete("role");
  return true;
};