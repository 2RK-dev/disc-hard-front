"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
	const cookie = cookies();
	(await cookie).set(name, value);
}

export async function getCookie(name: string) {
	const cookie = cookies();
	return (await cookie).get(name)?.value;
}

export async function deleteCookie(name: string) {
	const cookie = cookies();
	(await cookie).delete(name);
}
