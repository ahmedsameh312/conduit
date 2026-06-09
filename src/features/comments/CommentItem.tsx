import { Link } from "react-router-dom";
import type { Comment } from "../../types/comment";
import { useCurrentUser } from "../auth/useCurrentUser";
import { useDeleteComment } from "./useDeleteComment";

type Props = {
  comment: Comment;
  slug: string;
};

export default function CommentItem({ comment, slug }: Props) {
  const { data: currentUserData } = useCurrentUser();
  const { mutate: deleteComment } = useDeleteComment();

  const isAuthor = currentUserData?.user.username === comment.author.username;

  return (
    <div className="mb-4 overflow-hidden rounded border border-gray-300">
      <div className="p-4">
        <p className="text-gray-700">{comment.body}</p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-300 bg-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <img
            src={comment.author.image || "https://picsum.photos/200/300"}
            alt={comment.author.username}
            className="h-6 w-6 rounded-full"
          />

          <span className="text-sm text-green-500">
            <Link
              to={`/profile/${comment.author.username}`}
              className="text-sm text-green-500"
            >
              {comment.author.username}
            </Link>
          </span>
        </div>

        {isAuthor && (
          <button
            onClick={() =>
              deleteComment({
                slug,
                commentId: comment.id,
              })
            }
            className="text-sm text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
