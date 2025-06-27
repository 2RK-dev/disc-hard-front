import { User } from "@/type/User";
import { unwrapResult } from "@/services/util";
import { fetchUserList } from "@/api/http/user";

export async function getUsers(): Promise<User[]> {
    const users = unwrapResult(await fetchUserList());
    return users || [];
}

export async function getUserWithoutTheseUsers(
    excludeUsers: User[]
): Promise<User[]> {
    const users = await getUsers();
    return users.filter(
        (user) => !excludeUsers.some((excludeUser) => excludeUser.id === user.id)
    );
}