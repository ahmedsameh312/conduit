import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import { useCurrentUser } from "../auth/useCurrentUser";
import FollowButton from "../profile/FollowButton";
import ArticleActions from "./ArticleActions";

type ArticleMetaProps = {
  article: Article;
};

export default function ArticleMeta({ article }: ArticleMetaProps) {
  const { data: currentUserData } = useCurrentUser();
  const isAuthor = currentUserData?.user.username === article.author.username;

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={article.author.image || "https://picsum.photos/200/300"}
          alt={article.author.username}
          className="h-8 w-8 rounded-full"
        />

        <div className="flex flex-col">
          <Link
            to={`/profile/${article.author.username}`}
            className="text-sm text-green-500"
          >
            {article.author.username}
          </Link>

          <small className="text-xs text-gray-400">
            {new Date(article.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>

      {!isAuthor ? (
        <FollowButton
          username={article.author.username}
          following={article.author.following}
        />
      ) : (
        <div className="flex items-center justify-between">
          <ArticleActions slug={article.slug} />
        </div>
      )}
    </div>
  );
}
