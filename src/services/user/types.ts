import { User } from "@/type/User";

export interface IUser {
    getUsers: () => Promise<User[]>;
    getUserWithoutTheseUsers: (excludeUsers: User[]) => Promise<User[]>;
}