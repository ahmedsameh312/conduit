import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../../services/profileApi";

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", data.profile.username], data);
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["article"],
      });
      queryClient.invalidateQueries({
        queryKey: ["feedArticles"],
      });
    },
  });
}
