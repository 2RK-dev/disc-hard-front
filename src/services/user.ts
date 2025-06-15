"use server";

import data from "@/test/user.json";
import { User } from "@/type/User";

const users = data as User[];

export async function getUsers(): Promise<User[]> {
	const users = data as User[];
	return users;
}

export async function getUserWithoutTheseUsers(
	excludeUsers: User[]
): Promise<User[]> {
	const users = data as User[];
	const filteredUsers = users.filter(
		(user) => !excludeUsers.some((excludeUser) => excludeUser.id === user.id)
	);
	return filteredUsers;
}

export async function getUserById(id: number): Promise<User> {
	const user = users.find((user) => user.id === id);
	if (!user) {
		throw new Error(`User with id ${id} not found`);
	}
	return user;
}

export async function getLastUserId(): Promise<number> {
	const lastUser = users[users.length - 1];
	if (!lastUser) {
		throw new Error("No users found");
	}
	return lastUser.id;
}

export async function login(
	email: string,
	password: string
): Promise<User | null> {
	const user = users.find(
		(user) => user.email === email && password === password
	);
	if (!user) {
		return null;
	}
	return user;
}
