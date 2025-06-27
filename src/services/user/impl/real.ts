import { User } from "@/type/User";
import { unwrapResult } from "@/services/util";
import { fetchUserList } from "@/api/http/user";
import { login as apiLogin, register as apiRegister } from "@/api/http/auth";

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

export async function login(
    email: string,
    password: string
): Promise<User | null> {
    const auth = unwrapResult(await apiLogin({email, password}));
    localStorage.setItem("access_token", auth?.accessToken || "");
    return auth?.user || null;
}

export async function register(
    email: string,
    name: string,
    password: string,
    dob: Date
): Promise<User> {
    const result = await apiRegister({
        email: email,
        name: name,
        password: password,
        passwordConfirm: password
    });
    if (result.success) {
        const user = await login(email, password);
        if (user) return user;
        else throw new Error("Login failed");
    }
    if (result.error == "EMAIL_TAKEN") {
        throw new Error("Email already exists");
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
    throw new Error("Registration failed");
}
