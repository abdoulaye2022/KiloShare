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
            secure: true, // Assure que le cookie est envoyé uniquement via HTTPS
            sameSite: "Strict", // Protège contre les attaques CSRF
            maxAge: 60 * 60 * 24 * 365, // Durée de vie : 1 an
            expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000), // Expire dans 1 an
        });
    }
}
