import { User } from "@/type/User";

export interface IUser {
    getUsers: () => Promise<User[]>;
    getUserWithoutTheseUsers: (excludeUsers: User[]) => Promise<User[]>;
    login: (username: string, password: string) => Promise<User | null>;
    register: (email: string, name: string, password: string, dob: Date) => Promise<User>;
}