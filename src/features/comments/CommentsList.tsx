import { useParams } from "react-router-dom";
import type { Comment } from "../../types/comment";
import CommentItem from "./CommentItem";

type Props = {
  comments: Comment[];
};

export default function CommentList({ comments }: Props) {
  const { slug } = useParams();
  return (
    <div>
      {!comments.length ? (
        <p className="text-center text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} slug={slug ?? ""} />
        ))
      )}
    </div>
  );
}
