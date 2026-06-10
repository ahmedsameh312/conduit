import { useParams } from "react-router-dom";
import { useArticle } from "../features/articles/useArticle";
import { Helmet } from "react-helmet-async";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";
import { useComments } from "../features/comments/useComments";
import CommentList from "../features/comments/CommentsList";
import CommentForm from "../features/comments/CommentForm";
import ArticleMeta from "../features/articles/ArticleMeta";

export default function Article() {
  const { slug } = useParams();
  const { data, isLoading, error } = useArticle(slug || "");
  const { data: commentsData, isLoading: commentsLoading } = useComments(
    slug || "",
  );

  const article = data?.article;

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message="Failed to load article" />;

  if (!article) return <ErrorMessage message="Article not found" />;

  return (
    <div>
      <Helmet>
        <title>{article?.title + " - Conduit"}</title>
      </Helmet>
      <section className="bg-white py-12 text-black">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-6 text-5xl font-bold">{article.title}</h1>

          <ArticleMeta article={article} />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-lg leading-8 text-gray-700">
            {article.body}
          </p>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="mx-auto px-4">
          <ArticleMeta article={article} />
        </div>

        <h2 className="mb-6 text-2xl font-semibold">Comments</h2>
        <div className="mx-auto max-w-2xl">
          <CommentForm slug={article.slug} />
          {commentsLoading ? (
            <Spinner />
          ) : (
            <CommentList comments={commentsData?.comments ?? []} />
          )}
        </div>
      </div>
    </div>
  );
}
