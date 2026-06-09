import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteArticle } from "../../services/articleApi";

export function useFavoriteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoriteArticle,

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
    },
  });
}
