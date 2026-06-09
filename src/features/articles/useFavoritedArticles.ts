import { useQuery } from "@tanstack/react-query";
import { getFavoritedArticles } from "../../services/articleApi";

export function useFavoritedArticles(username: string) {
  return useQuery({
    queryKey: ["articles", "favorited", username],
    queryFn: () => getFavoritedArticles(username),
    enabled: !!username,
  });
}
