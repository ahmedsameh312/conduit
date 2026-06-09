import type { TagsResponse } from "../types/tag";
import { api } from "./api";

export async function getTags(): Promise<TagsResponse> {
  const response = await api.get("/tags");
  return response.data;
}
