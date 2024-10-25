"use server";

import { cookies } from "next/headers";

async function logout(formData) {
  cookies().delete("jwt");
}
