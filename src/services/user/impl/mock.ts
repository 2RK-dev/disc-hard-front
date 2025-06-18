"use server";

import data from "@/test/user.json";
import { User } from "@/type/User";

const users = data as User[];

export async function getUsers(): Promise<User[]> {
    return users;
}

export async function getUserWithoutTheseUsers(
    excludeUsers: User[]
): Promise<User[]> {
    return users.filter(
        (user) => !excludeUsers.some((excludeUser) => excludeUser.id === user.id)
    );
}