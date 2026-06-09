import { api } from "./api";

export async function getProfile(username: string) {
  const response = await api.get(`/profiles/${username}`);
  return response.data;
}

export async function followUser(username: string) {
  const response = await api.post(`/profiles/${username}/follow`);
  return response.data;
}

export async function unfollowUser(username: string) {
  const response = await api.delete(`/profiles/${username}/follow`);
  return response.data;
}
