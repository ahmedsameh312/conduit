import { api } from "./api";

export async function getCurrentUser() {
  const response = await api.get("./user");
  return response.data;
}
