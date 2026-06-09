import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import { useFavoriteArticle } from "./useFavoriteArticle";
import { useUnfavoriteArticle } from "./useUnfavoriteArticle";
import ArticleMeta from "./ArticleMeta";

type Props = {
  article: Article;
};

export default function ArticleItem({ article }: Props) {
  const { mutate: favorite } = useFavoriteArticle();
  const { mutate: unfavorite } = useUnfavoriteArticle();
  return (
    <article className="border-b border-gray-200 py-8">
      <ArticleMeta article={article} />
      <h6 className="mt-4 text-3xl font-bold text-gray-800">{article.title}</h6>
      <p className="mt-2 text-gray-500">{article.description}</p>

      <div className="flex justify-end">
        <button
          className={`rounded border px-3 py-1 text-sm ${
            article.favorited
              ? "border-green-500 bg-green-500 text-white"
              : "border-green-500 text-green-500"
          }`}
          onClick={() => {
            if (article.favorited) {
              unfavorite(article.slug);
            } else {
              favorite(article.slug);
            }
          }}
        >
          ♥ {article.favoritesCount}
        </button>
      </div>

      <Link
        className="mt-4 inline-block text-sm text-gray-400 hover:text-green-500"
        to={`/article/${article.slug}`}
      >
        Read more
      </Link>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tagList.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
