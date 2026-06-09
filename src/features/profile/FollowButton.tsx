import { useNavigate } from "react-router-dom";
import { useFollowUser } from "./useFollowUser";
import { useUnfollowUser } from "./useUnfollowUser";
import { useCurrentUser } from "../auth/useCurrentUser";

type FollowButtonProps = {
  username: string;
  following: boolean;
};

export default function FollowButton({
  username,
  following,
}: FollowButtonProps) {
  const { mutate: follow } = useFollowUser();
  const { mutate: unfollow } = useUnfollowUser();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();

  return (
    <button
      className={`rounded border px-3 py-1 text-sm transition ${
        following
          ? "border-gray-400 text-gray-500  bg-gray-300"
          : "border-gray-400 text-gray-500"
      }`}
      onClick={() => {
        if (!currentUser) {
          navigate("/login");
          return;
        }
        if (following) {
          unfollow(username);
        } else {
          follow(username);
        }
      }}
    >
      {following ? "Unfollow" : "Follow"}
    </button>
  );
}
