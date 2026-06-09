import type { LoginData, RegisterData, UpdateUserData } from "../types/auth";
import type { UserResponse } from "../types/user";
import { api } from "./api";

export async function login(userData: LoginData): Promise<UserResponse> {
  const response = await api.post("/users/login", {
    user: userData,
  });
  return response.data;
}

export async function register(userData: RegisterData): Promise<UserResponse> {
  const response = await api.post("/users", {
    user: userData,
  });
  return response.data;
}

export async function getCurrentUser(): Promise<UserResponse> {
  const response = await api.get("/user");
  return response.data;
}

export async function updateUser(
  userData: UpdateUserData,
): Promise<UserResponse> {
  const response = await api.put("/user", { user: userData });
  return response.data;
}
