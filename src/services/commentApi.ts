import type { CommentsRespone } from "../types/comment";
import { api } from "./api";

export async function getComments(slug: string): Promise<CommentsRespone> {
  const response = await api.get(`/articles/${slug}/comments`);
  return response.data;
}

export async function createComment(slug: string, body: string) {
  const response = await api.post(`articles/${slug}/comments`, {
    comment: { body },
  });
  return response.data;
}

export async function deleteComment(slug: string, commentId: number) {
  const response = await api.delete(`/articles/${slug}/comments/${commentId}`);
  return response.data;
}
