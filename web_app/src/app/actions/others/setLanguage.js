"use server";

import { cookies } from "next/headers";

export async function setLanguage(value) {

    const langue = cookies().get("langue")?.value;

    if(value != langue) {
        cookies().delete("langue");
        cookies().set({
            path: '/',
            httpOnly: true,
            name: "langue",
            value: value,
            secure: true,
            sameSite: "Strict",
            maxAge: 60 * 60 * 24 * 365,
            expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000)
        });

        return value;
    }

    return langue;
}
