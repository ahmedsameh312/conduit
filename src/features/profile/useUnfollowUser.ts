import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowUser } from "../../services/profileApi";

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowUser,
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
