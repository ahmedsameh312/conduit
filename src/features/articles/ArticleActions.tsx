import { Link } from "react-router-dom";
import { useDeleteArticle } from "./useDeleteArticle";

type ArticleActionsProps = {
  slug: string;
};

export default function ArticleActions({ slug }: ArticleActionsProps) {
  const { mutate } = useDeleteArticle();

  return (
    <>
      <Link
        to={`/editor/${slug}`}
        className="rounded border border-yellow-500 text-yellow-500 mx-2 px-3 py-1 text-sm"
      >
        Edit Article
      </Link>
      <button
        className="rounded border border-red-500 text-red-500 px-3 py-1 text-sm"
        onClick={() => mutate(slug)}
      >
        Delete Article
      </button>
    </>
  );
}
