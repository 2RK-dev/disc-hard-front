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

async function getLastUserId(): Promise<number> {
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

export async function register(
    email: string,
    name: string,
    password: string,
    dob: Date
): Promise<User> {
    const lastUserId = await getLastUserId();
    //simulate user registration
    if (users.some((user) => user.email === email)) {
        throw new Error("Email already exists");
    }
    if (users.some((user) => user.name === name)) {
        throw new Error("Name already exists");
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    if (!email.includes("@")) {
        throw new Error("Invalid email format");
    }
    if (dob > new Date()) {
        throw new Error("Date of birth cannot be in the future");
    }
    const newUser: User = {
        id: lastUserId + 1,
        email,
        name,
        status: "offline",
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${name}&backgroundColor=transparent&fontFamily=Arial&fontSize=50&color=white`,
    };
    users.push(newUser);
    return newUser;
}

export async function changeName(
    user: number,
    newName: string
): Promise<User> {
    if (!newName || newName.trim() === "") {
        throw new Error("Username cannot be empty");
    }
    const existingUser = users.find((u) => u.id === user);
    if (!existingUser) {
        throw new Error("User not found");
    }
    existingUser.name = newName;
    return existingUser;
}
