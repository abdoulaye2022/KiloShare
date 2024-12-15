"use server";

import { cookies } from "next/headers";

export async function getJwt_user() {
  const cookieStore = cookies();

  const jwtToken = cookieStore.get(
    process.env.NEXT_PUBLIC_COOKIE_NAME
  )?.value;

  return jwtToken || null;
}