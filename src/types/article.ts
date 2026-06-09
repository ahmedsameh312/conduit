export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export type CreateArticleData = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export type UpdateArticleData = Partial<CreateArticleData>;

export type UpdateArticleParams = {
  slug: string;
  articleData: UpdateArticleData;
};
