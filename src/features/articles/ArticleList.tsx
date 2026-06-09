import type { Article } from "../../types/article";
import ArticleItem from "./ArticleItem";

type Props = {
  articles: Article[];
};

export default function ArticleList({ articles }: Props) {
  return (
    <div>
      {articles.map((article) => (
        <ArticleItem key={article.slug} article={article} />
      ))}
    </div>
  );
}
