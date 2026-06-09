import type { Author } from "./article";

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface CommentsRespone {
  comments: Comment[];
}
