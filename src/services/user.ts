"use server";

import data from "@/test/user.json";
import { User } from "@/type/User";

const users = data as User[];

export async function getUserById(id: number): Promise<User> {
	const user = users.find((user) => user.id === id);
	if (!user) {
		throw new Error(`User with id ${id} not found`);
	}
	return user;
}
