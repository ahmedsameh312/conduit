import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfavoriteArticle } from "../../services/articleApi";
import toast from "react-hot-toast";

export function useUnfavoriteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfavoriteArticle,

    onSuccess: (data) => {
      queryClient.setQueryData(["article", data.article.slug], data);
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["article"],
      });
      queryClient.invalidateQueries({
        queryKey: ["feedArticles"],
      });
      toast.error("Removed from Favorites");
    },
  });
}
