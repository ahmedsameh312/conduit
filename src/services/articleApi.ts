import type {
  Article,
  ArticlesResponse,
  CreateArticleData,
  UpdateArticleData,
} from "../types/article";
import { api } from "./api";

export interface ArticleResponse {
  article: Article;
}

export async function getArticles(
  tag?: string,
  page = 1,
): Promise<ArticlesResponse> {
  const limit = 10;
  const offset = (page - 1) * limit;
  const params = new URLSearchParams();

  params.append("limit", String(limit));
  params.append("offset", String(offset));
  if (tag) {
    params.append("tag", tag);
  }
  // const url = tag ? `/articles?tag=${tag}` : `/articles`;
  // const response = await api.get(url);
  const response = await api.get(`/articles?${params.toString()}`);
  return response.data;
}

export async function getArticle(slug: string): Promise<ArticleResponse> {
  const response = await api.get(`/articles/${slug}`);
  return response.data;
}

export async function getFeedArticles(): Promise<ArticlesResponse> {
  const response = await api.get(`/articles/feed`);
  return response.data;
}

export async function createArticle(articleData: CreateArticleData) {
  const response = await api.post("/articles", { article: articleData });
  return response.data;
}

export async function updateArticle(
  slug: string,
  articleData: UpdateArticleData,
) {
  const response = await api.put(`/articles/${slug}`, { article: articleData });
  return response.data;
}

export async function deleteArticle(slug: string) {
  const response = await api.delete(`/articles/${slug}`);
  return response.data;
}

export async function getArticlesByAuthor(username: string) {
  const response = await api.get(`/articles?author=${username}`);
  return response.data;
}

export async function getFavoritedArticles(username: string) {
  const response = await api.get(`/articles?favorited=${username}`);
  return response.data;
}

export async function favoriteArticle(slug: string) {
  const response = await api.post(`/articles/${slug}/favorite`);
  return response.data;
}

export async function unfavoriteArticle(slug: string) {
  const response = await api.delete(`/articles/${slug}/favorite`);
  return response.data;
}
