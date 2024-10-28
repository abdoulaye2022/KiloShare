"use server";

import { cookies } from "next/headers";

export async function getLanguage() {

    const langue = cookies().get("langue")?.value;

    if(langue != undefined) {
        return langue;
    }

    return "en";
}
